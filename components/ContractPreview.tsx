import React from 'react';
import { LOGO_URL } from '../assets/logo';
import { ServicePlan } from '../types';

interface ContractPreviewProps {
    data: { [key: string]: string };
    selectedPlan?: ServicePlan;
    signatureUrl: string | null;
    terms: string[];
}

const PreviewField: React.FC<{ label: string; value: string }> = ({ label, value }) => (
    <p><strong className="font-semibold text-gray-800">{label}:</strong> {value || '...'}</p>
);

export const ContractPreview = React.forwardRef<HTMLDivElement, ContractPreviewProps>(
    ({ data, selectedPlan, signatureUrl, terms }, ref) => {
        return (
            <div ref={ref} className="bg-white p-8 lg:p-12 rounded-lg shadow-lg border border-gray-200 font-sans text-sm text-gray-700 leading-relaxed" id="contract-preview">
                {/* Header */}
                <div className="bg-slate-800 text-white -m-8 lg:-m-12 mb-6 p-8 lg:p-12 rounded-t-lg flex items-center justify-center relative min-h-[144px]">
                     <div className="absolute left-8 lg:left-12 top-1/2 -translate-y-1/2">
                        <img src={LOGO_URL} alt="Logo" className="h-32 w-32 object-contain"/>
                     </div>
                     <div className="text-center">
                        <h1 className="text-2xl font-extrabold text-white tracking-tight">CONTRATO DE SERVICIO</h1>
                        <h1 className="text-2xl font-extrabold text-slate-300 tracking-tight">EVENTOS LEI</h1>
                        <p className="text-slate-400 mt-1 text-sm">Una experiencia a otro nivel</p>
                     </div>
                </div>

                {/* Contract Details */}
                <div className="flex justify-between text-xs mb-8">
                    <span><strong>Nº Contrato:</strong> {data.contractNumber || '...'}</span>
                    <span><strong>Lugar y Fecha:</strong> {data.locationDate || '...'}</span>
                </div>
                
                {/* Parties */}
                <h2 className="text-xl font-bold text-slate-800 mt-6 mb-4 border-b pb-2">Partes Involucradas</h2>
                <div className="grid grid-cols-2 gap-8">
                    <div>
                        <h3 className="font-bold text-slate-700 mb-2">EL PRESTADOR</h3>
                        <PreviewField label="Nombre y Apellido" value={data.providerName} />
                        <PreviewField label="DNI / Carnet de Extranjería" value={data.providerDni} />
                        <PreviewField label="Domicilio" value={data.providerAddress} />
                        <PreviewField label="Teléfono" value={data.providerPhone} />
                        <PreviewField label="Correo" value={data.providerEmail} />
                    </div>
                     <div>
                        <h3 className="font-bold text-slate-700 mb-2">EL CLIENTE</h3>
                        <PreviewField label="Nombre y Apellido" value={data.clientName} />
                        <PreviewField label="DNI / Carnet de Extranjería" value={data.clientDni} />
                        <PreviewField label="Domicilio" value={data.clientAddress} />
                        <PreviewField label="Teléfono" value={data.clientPhone} />
                        <PreviewField label="Correo" value={data.clientEmail} />
                    </div>
                </div>

                {/* Event Details */}
                <h2 className="text-xl font-bold text-slate-800 mt-6 mb-4 border-b pb-2">Detalles del Evento</h2>
                <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                    <PreviewField label="Nombre del Evento" value={data.eventName} />
                    <PreviewField label="Fecha" value={data.eventDate} />
                    <PreviewField label="Ubicación" value={data.eventLocation} />
                    <PreviewField label="Horario Montaje" value={data.setupTime} />
                    <PreviewField label="Horario Servicio" value={data.serviceTime} />
                    <PreviewField label="Horario Desmontaje" value={data.teardownTime} />
                </div>
                
                {/* Service Details */}
                {selectedPlan && (
                    <>
                        <h2 className="text-xl font-bold text-slate-800 mt-6 mb-4 border-b pb-2">Servicio Contratado</h2>
                        <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                             <h3 className="font-bold text-lg text-slate-700">{selectedPlan.name} - {selectedPlan.description}</h3>
                             <p className="font-semibold text-base mt-1 mb-3">Costo: {selectedPlan.price}</p>
                             <ul className="list-disc list-inside space-y-1 text-xs">
                                {selectedPlan.details.map((item, i) => <li key={i}>{item}</li>)}
                             </ul>
                             <p className="text-xs italic mt-3 text-gray-500">{selectedPlan.rider}</p>
                        </div>
                    </>
                )}
                
                {/* Terms */}
                <h2 className="text-xl font-bold text-slate-800 mt-6 mb-4 border-b pb-2">Términos y Condiciones</h2>
                <ul className="space-y-2 text-xs text-gray-600 list-decimal list-inside">
                    {terms.map((term, index) => (
                        <li key={index}>{term}</li>
                    ))}
                </ul>

                {/* Signature */}
                <div className="mt-16 pt-8 grid grid-cols-2 gap-16">
                    <div>
                        <div className="h-24 border-b-2 border-gray-500"></div>
                        <p className="border-t-0 pt-2 mt-1 text-center">
                            <strong>{data.providerName}</strong><br/>
                            EL PRESTADOR
                        </p>
                    </div>
                    <div>
                        <div className="h-24 border-b-2 border-gray-500 flex items-end justify-center">
                         {signatureUrl ? (
                            <img src={signatureUrl} alt="Firma del Cliente" className="max-h-24" style={{ imageRendering: 'pixelated' }}/>
                         ) : (
                            null
                         )}
                        </div>
                        <p className="border-t-0 pt-2 mt-1 text-center">
                            <strong>{data.clientName || 'Nombre del Cliente'}</strong><br/>
                            EL CLIENTE
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <footer className="text-center text-xs text-gray-500 mt-12 pt-6 border-t border-gray-200">
                    <p className="font-semibold mb-2 text-slate-700">Visítanos y síguenos en nuestras redes</p>
                    <p className="mb-4">
                        <a href="https://djlei.netlify.app/" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-slate-800 underline">
                            https://djlei.netlify.app/
                        </a>
                    </p>
                    <div className="flex justify-center items-center space-x-6 flex-wrap">
                        <a href="https://www.facebook.com/share/1CvkRXYWdj/" target="_blank" rel="noopener noreferrer" className="flex items-center text-slate-600 hover:text-slate-800 transition-colors">
                           <svg className="w-5 h-5 mr-2 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.35C0 23.407.593 24 1.325 24H12.82v-9.29h-3.128v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.732 0 1.325-.593 1.325-1.325V1.325C24 .593 23.407 0 22.675 0z"/></svg>
                           <span>@djlei castillo</span>
                        </a>
                         <a href="https://www.instagram.com/djleicastillo" target="_blank" rel="noopener noreferrer" className="flex items-center text-slate-600 hover:text-slate-800 transition-colors">
                           <svg className="w-5 h-5 mr-2 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.012 3.584-.07 4.85c-.148 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.85s.012-3.584.07-4.85c.148-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.85-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.947s-.014-3.667-.072-4.947c-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.689-.073-4.948-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                           <span>@djleicastillo</span>
                        </a>
                         <a href="https://www.tiktok.com/@djleicastillo" target="_blank" rel="noopener noreferrer" className="flex items-center text-slate-600 hover:text-slate-800 transition-colors">
                            <svg className="w-5 h-5 mr-2 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M16.6 5.82s.51.5 0 0A4.278 4.278 0 0 1 15.54 3h-3.09v12.4a2.592 2.592 0 0 1-2.59 2.59c-1.43 0-2.6-1.16-2.6-2.6s1.17-2.6 2.6-2.6c.2 0 .6.05.6.05v-3.36s-.46 0-.67.05c-3.23 0-5.86 2.64-5.86 5.86s2.63 5.86 5.86 5.86 5.86-2.64 5.86-5.86V7.18a4.278 4.278 0 0 1 4.09-4.09c.5 0 .5.51 0 0Z"/></svg>
                            <span>@djleicastillo</span>
                        </a>
                    </div>
                    <p className="text-gray-400 mt-6">
                        Generado el {new Date().toLocaleString('es-ES')}
                    </p>
                </footer>
            </div>
        );
    }
);