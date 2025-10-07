
import React, { useState, useRef } from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

import { Header } from './components/Header';
import { Section } from './components/Section';
import { Input } from './components/Input';
import { ServicePlanCard } from './components/ServicePlanCard';
import { SignaturePad } from './components/SignaturePad';
import { ContractPreview } from './components/ContractPreview';
import { SignaturePadRef, ServicePlan as ServicePlanType } from './types';
import { SERVICE_PLANS, TERMS_AND_CONDITIONS } from './constants';

const App: React.FC = () => {
    const [contractData, setContractData] = useState({
        contractNumber: '',
        locationDate: '',
        providerName: 'Leixester Parra Castillo',
        providerDni: '002771952',
        providerAddress: 'Pasaje Acarpay 129 Salamanca',
        providerPhone: '+51 972 779 032',
        providerEmail: 'leixesterparra@gmail.com',
        clientName: '',
        clientDni: '',
        clientAddress: '',
        clientPhone: '',
        clientEmail: '',
        eventName: '',
        eventDate: '',
        eventLocation: '',
        setupTime: '',
        serviceTime: '',
        teardownTime: '',
    });
    
    const [servicePlans, setServicePlans] = useState<ServicePlanType[]>(SERVICE_PLANS);
    const [selectedPlanId, setSelectedPlanId] = useState<string | null>(SERVICE_PLANS[0].id);
    const [baseHours, setBaseHours] = useState('6');
    const [soundDuplicationCost, setSoundDuplicationCost] = useState('600');
    const [terms, setTerms] = useState<string[]>(TERMS_AND_CONDITIONS);
    
    const [signatureUrl, setSignatureUrl] = useState<string | null>(null);
    const signaturePadRef = useRef<SignaturePadRef>(null);
    const contractPreviewRef = useRef<HTMLDivElement>(null);
    const [isSaving, setIsSaving] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setContractData(prevData => ({ ...prevData, [id]: value }));
    };

    const handlePlanDataChange = (planId: string, field: keyof ServicePlanType, value: string | string[]) => {
        setServicePlans(prevPlans =>
            prevPlans.map(plan =>
                plan.id === planId ? { ...plan, [field]: value } : plan
            )
        );
    };

    const handlePlanDetailChange = (planId: string, detailIndex: number, value: string) => {
        setServicePlans(prevPlans =>
            prevPlans.map(plan => {
                if (plan.id === planId) {
                    const newDetails = [...plan.details];
                    newDetails[detailIndex] = value;
                    return { ...plan, details: newDetails };
                }
                return plan;
            })
        );
    };

    const addPlanDetail = (planId: string) => {
        setServicePlans(prevPlans =>
            prevPlans.map(plan =>
                plan.id === planId ? { ...plan, details: [...plan.details, 'Nuevo detalle...'] } : plan
            )
        );
    };

    const removePlanDetail = (planId: string, detailIndex: number) => {
        setServicePlans(prevPlans =>
            prevPlans.map(plan => {
                if (plan.id === planId) {
                    const newDetails = plan.details.filter((_, index) => index !== detailIndex);
                    return { ...plan, details: newDetails };
                }
                return plan;
            })
        );
    };

    const handleTermChange = (index: number, value: string) => {
        setTerms(prevTerms => {
            const newTerms = [...prevTerms];
            newTerms[index] = value;
            return newTerms;
        });
    };

    const addTerm = () => {
        setTerms(prevTerms => [...prevTerms, 'Nuevo término...']);
    };

    const removeTerm = (indexToRemove: number) => {
        setTerms(prevTerms => prevTerms.filter((_, index) => index !== indexToRemove));
    };


    const selectedPlan = servicePlans.find(p => p.id === selectedPlanId);

    const getGeneratedTerms = () => {
        const originalTermForHours = TERMS_AND_CONDITIONS[9];
        const originalTermForCost = TERMS_AND_CONDITIONS[11];

        return terms.map((term) => {
            if (term.includes('6 horas') && term.includes('Contrato base por')) {
                 return term.replace(originalTermForHours, originalTermForHours.replace('6 horas', `${baseHours} horas`));
            }
            if (term.includes('600 soles') && term.includes('duplicar el sonido')) {
                return term.replace(originalTermForCost, originalTermForCost.replace('600 soles', `${soundDuplicationCost} soles`));
            }
            return term;
        });
    };


    const handleSaveAsPdf = async () => {
        const contractElement = contractPreviewRef.current;
        if (!contractElement) return;

        setIsSaving(true);

        contractElement.style.visibility = 'visible';

        await new Promise(resolve => setTimeout(resolve, 50));

        try {
            const canvas = await html2canvas(contractElement, {
                scale: 2,
                useCORS: true,
                backgroundColor: '#ffffff',
            });
            const imgData = canvas.toDataURL('image/png');
            
            const pdfWidth = 210;
            const pdfHeight = 297;
            
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4'
            });

            const imgProps = pdf.getImageProperties(imgData);
            const imgWidth = pdfWidth;
            const imgHeight = (imgProps.height * imgWidth) / imgProps.width;
            
            let heightLeft = imgHeight;
            let position = 0;

            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
            heightLeft -= pdfHeight;

            while (heightLeft > 0) {
                position = heightLeft - imgHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
                heightLeft -= pdfHeight;
            }

            pdf.save(`Contrato_${contractData.clientName.replace(/\s/g, '_') || 'Servicio_DJ_Lei'}.pdf`);
        } catch (error) {
            console.error("Error generating PDF:", error);
            alert("Hubo un error al generar el PDF. Por favor, intente de nuevo.");
        } finally {
            contractElement.style.visibility = 'hidden';
            setIsSaving(false);
        }
    };

    const clearSignature = () => {
        signaturePadRef.current?.clear();
        setSignatureUrl(null);
    };

    return (
        <div className="bg-gray-100 min-h-screen text-gray-800 font-sans">
             <main className="max-w-screen-lg mx-auto p-4 sm:p-8">
                
                <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg border border-gray-200 space-y-10">
                    <Header />

                    <Section title="Detalles del Contrato">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Input label="Nº de Contrato" id="contractNumber" placeholder="Ej: 001-2024" value={contractData.contractNumber} onChange={handleInputChange} />
                            <Input label="Lugar y Fecha" id="locationDate" placeholder="Ej: Lima, 25 de Diciembre de 2024" value={contractData.locationDate} onChange={handleInputChange} />
                        </div>
                    </Section>

                    <Section title="Entre las Partes">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-slate-700 border-b border-gray-300 pb-2">EL PRESTADOR</h3>
                                <Input label="Nombre y Apellido" id="providerName" value={contractData.providerName} onChange={handleInputChange} />
                                <Input label="DNI / Carnet de Extranjería" id="providerDni" placeholder="Ingrese DNI o Carnet de Extranjería" value={contractData.providerDni} onChange={handleInputChange} />
                                <Input label="Domicilio" id="providerAddress" placeholder="Ingrese Domicilio" value={contractData.providerAddress} onChange={handleInputChange}/>
                                <Input label="Teléfono" id="providerPhone" placeholder="Ingrese Teléfono" value={contractData.providerPhone} onChange={handleInputChange}/>
                                <Input label="Correo" id="providerEmail" placeholder="Ingrese Correo" value={contractData.providerEmail} onChange={handleInputChange}/>
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-slate-700 border-b border-gray-300 pb-2">EL CLIENTE</h3>
                                <Input label="Nombre y Apellido" id="clientName" placeholder="Ingrese Nombre y Apellido" value={contractData.clientName} onChange={handleInputChange} />
                                <Input label="DNI / Carnet de Extranjería" id="clientDni" placeholder="Ingrese DNI o Carnet de Extranjería" value={contractData.clientDni} onChange={handleInputChange} />
                                <Input label="Domicilio" id="clientAddress" placeholder="Ingrese Domicilio" value={contractData.clientAddress} onChange={handleInputChange} />
                                <Input label="Teléfono" id="clientPhone" placeholder="Ingrese Teléfono" value={contractData.clientPhone} onChange={handleInputChange} />
                                <Input label="Correo" id="clientEmail" placeholder="Ingrese Correo" value={contractData.clientEmail} onChange={handleInputChange} />
                            </div>
                        </div>
                         <p className="text-sm text-gray-500 mt-6 italic">Ambas partes se reconocen mutuamente la capacidad legal necesaria para suscribir el presente contrato y, a tal efecto, exponen.</p>
                    </Section>
                    
                    <Section title="Evento y Ubicación">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Input label="Nombre del Evento" id="eventName" placeholder="Ej: Boda de Ana y Juan" value={contractData.eventName} onChange={handleInputChange} />
                            <Input type="date" label="Fecha del Evento" id="eventDate" value={contractData.eventDate} onChange={handleInputChange}/>
                            <Input label="Ubicación Exacta" id="eventLocation" placeholder="Ej: Av. Principal 123, Miraflores" value={contractData.eventLocation} onChange={handleInputChange}/>
                            <Input type="time" label="Horario de Montaje" id="setupTime" value={contractData.setupTime} onChange={handleInputChange}/>
                            <Input type="time" label="Horario del Servicio" id="serviceTime" value={contractData.serviceTime} onChange={handleInputChange}/>
                            <Input type="time" label="Horario de Desmontaje" id="teardownTime" value={contractData.teardownTime} onChange={handleInputChange}/>
                        </div>
                    </Section>

                    <Section title="Plan Contratado, Costos y Forma de Pago">
                        <p className="text-gray-500 mb-6">Seleccione y personalice el plan de servicios deseado:</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {servicePlans.map((plan: ServicePlanType) => (
                                <ServicePlanCard 
                                    key={plan.id}
                                    plan={plan}
                                    isSelected={selectedPlanId === plan.id}
                                    onSelect={() => setSelectedPlanId(plan.id)}
                                    onPlanChange={handlePlanDataChange}
                                    onDetailChange={handlePlanDetailChange}
                                    onAddDetail={addPlanDetail}
                                    onRemoveDetail={removePlanDetail}
                                />
                            ))}
                        </div>
                    </Section>

                    <Section title="Términos y Condiciones">
                        <div className="prose prose-sm max-w-none text-gray-600 bg-gray-50 p-4 rounded-md border">
                            <ol className="list-decimal list-inside space-y-3">
                                {terms.map((term, index) => {
                                    const isHoursTerm = term.includes('6 horas') && term.includes('Contrato base por');
                                    const isCostTerm = term.includes('600 soles') && term.includes('duplicar el sonido');

                                    if (isHoursTerm) {
                                        const parts = term.split('6 horas');
                                        return (
                                            <li key={index} className="flex items-start group">
                                                <div className="flex-grow">
                                                {parts[0]}
                                                <input 
                                                    type="number" 
                                                    value={baseHours}
                                                    onChange={(e) => setBaseHours(e.target.value)}
                                                    className="inline-block w-16 mx-1 text-center bg-gray-100 border border-gray-300 rounded-md shadow-sm py-1 px-2 focus:outline-none focus:ring-slate-500 focus:border-slate-500"
                                                />
                                                horas{parts[1]}
                                                </div>
                                            </li>
                                        );
                                    }
                                    if (isCostTerm) {
                                        const parts = term.split('600 soles');
                                        return (
                                            <li key={index} className="flex items-start group">
                                                <div className="flex-grow">
                                                {parts[0]}
                                                <input 
                                                    type="number" 
                                                    value={soundDuplicationCost}
                                                    onChange={(e) => setSoundDuplicationCost(e.target.value)}
                                                    className="inline-block w-24 mx-1 text-center bg-gray-100 border border-gray-300 rounded-md shadow-sm py-1 px-2 focus:outline-none focus:ring-slate-500 focus:border-slate-500"
                                                />
                                                soles{parts[1]}
                                                </div>
                                            </li>
                                        );
                                    }
                                    return (
                                        <li key={index} className="flex items-start group">
                                            <div className="flex-grow">
                                                <textarea
                                                    value={term}
                                                    onChange={(e) => handleTermChange(index, e.target.value)}
                                                    rows={Math.max(1, Math.ceil(term.length / 80))}
                                                    className="w-full bg-transparent focus:bg-white focus:ring-1 ring-slate-400 rounded-md p-1 transition-colors resize-none"
                                                />
                                            </div>
                                            <button
                                                onClick={() => removeTerm(index)}
                                                className="ml-2 text-red-500 opacity-0 group-hover:opacity-100 hover:text-red-700 transition-opacity text-lg flex-shrink-0"
                                                aria-label="Eliminar término"
                                            >
                                                &times;
                                            </button>
                                        </li>
                                    );
                                })}
                            </ol>
                        </div>
                         <button 
                            onClick={addTerm}
                            className="text-sm text-slate-600 hover:text-slate-800 font-semibold mt-4 py-2 px-3 rounded-md bg-slate-200 hover:bg-slate-300 transition-colors w-full"
                        >
                            + Añadir Término
                        </button>
                    </Section>

                    <Section title="Firma del Cliente">
                         <p className="text-sm text-gray-500 mb-4">Acepto los términos y condiciones de este contrato. Por favor, firme en el recuadro de abajo.</p>
                        <div className="bg-gray-50 rounded-lg overflow-hidden border-2 border-dashed border-gray-400">
                           <SignaturePad ref={signaturePadRef} onEnd={setSignatureUrl} />
                        </div>
                        <div className="mt-4 flex justify-end">
                            <button 
                                onClick={clearSignature} 
                                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-md transition-colors duration-200 text-sm">
                                Limpiar Firma
                            </button>
                        </div>
                    </Section>
                    
                    <div className="mt-6 pt-8 border-t border-gray-200 flex justify-center">
                        <button 
                            onClick={handleSaveAsPdf}
                            disabled={isSaving}
                            className="w-full max-w-lg px-8 py-4 bg-slate-700 hover:bg-slate-800 text-white font-bold rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed">
                            {isSaving ? 'Guardando...' : 'Guardar Documento como PDF'}
                        </button>
                    </div>
                </div>

             </main>

            {/* Hidden component for PDF generation */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '210mm',
                zIndex: -1,
                visibility: 'hidden',
             }}>
                 <ContractPreview 
                    key={`${selectedPlanId}-${terms.length}`}
                    ref={contractPreviewRef}
                    data={contractData}
                    selectedPlan={selectedPlan}
                    signatureUrl={signatureUrl}
                    terms={getGeneratedTerms()}
                />
            </div>
        </div>
    );
}

export default App;
