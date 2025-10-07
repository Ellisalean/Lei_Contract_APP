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
    <div className="break-inside-avoid">
        <p className="text-xs text-gray-500">{label}</p>
        <p className="font-medium text-gray-800">{value || '...'}</p>
    </div>
);

const SectionTitle: React.FC<{ title: string }> = ({ title }) => (
    <h2 className="text-lg font-bold text-slate-800 mt-6 mb-3 break-after-avoid">
        {title}
    </h2>
);

export const ContractPreview = React.forwardRef<HTMLDivElement, ContractPreviewProps>(
    ({ data, selectedPlan, signatureUrl, terms }, ref) => {
        return (
            <div ref={ref} className="bg-white p-12 font-sans text-sm text-gray-700 leading-relaxed" id="contract-preview">
                {/* Header */}
                <header className="bg-slate-800 text-white -m-12 mb-8 p-10 flex items-center space-x-8 rounded-t-lg">
                     <img src={LOGO_URL} alt="Logo" className="h-28 w-28 object-contain flex-shrink-0"/>
                     <div>
                        <h1 className="text-3xl font-extrabold text-white tracking-tight">CONTRATO DE SERVICIO</h1>
                        <h1 className="text-3xl font-extrabold text-slate-300 tracking-tight">EVENTOS LEI</h1>
                        <p className="text-slate-400 mt-1 text-base">Una experiencia a otro nivel</p>
                     </div>
                </header>

                {/* Contract Details */}
                <div className="flex justify-between text-xs mb-6">
                    <div><strong>Nº Contrato:</strong> {data.contractNumber || '...'}</div>
                    <div><strong>Lugar y Fecha:</strong> {data.locationDate || '...'}</div>
                </div>
                
                {/* Parties */}
                <SectionTitle title="Partes Involucradas" />
                <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-3">
                        <h3 className="font-bold text-base text-slate-700 mb-2">EL PRESTADOR</h3>
                        <PreviewField label="Nombre y Apellido" value={data.providerName} />
                        <PreviewField label="DNI / C.E." value={data.providerDni} />
                        <PreviewField label="Domicilio" value={data.providerAddress} />
                        <PreviewField label="Teléfono" value={data.providerPhone} />
                        <PreviewField label="Correo" value={data.providerEmail} />
                    </div>
                     <div className="space-y-3">
                        <h3 className="font-bold text-base text-slate-700 mb-2">EL CLIENTE</h3>
                        <PreviewField label="Nombre y Apellido" value={data.clientName} />
                        <PreviewField label="DNI / C.E." value={data.clientDni} />
                        <PreviewField label="Domicilio" value={data.clientAddress} />
                        <PreviewField label="Teléfono" value={data.clientPhone} />
                        <PreviewField label="Correo" value={data.clientEmail} />
                    </div>
                </div>

                {/* Event Details */}
                <SectionTitle title="Detalles del Evento" />
                <div className="grid grid-cols-2 gap-x-8 gap-y-3">
                    <PreviewField label="Nombre del Evento" value={data.eventName} />
                    <PreviewField label="Fecha" value={data.eventDate} />
                    <PreviewField label="Ubicación" value={data.eventLocation} />
                    <PreviewField label="Horario Montaje" value={data.setupTime} />
                    <PreviewField label="Horario Servicio" value={data.serviceTime} />
                    <PreviewField label="Horario Desmontaje" value={data.teardownTime} />
                </div>
                
                {/* Service Details */}
                {selectedPlan && (
                    <div className="break-inside-avoid">
                        <SectionTitle title="Servicio Contratado" />
                        <div className="bg-slate-50 p-4 rounded-md border border-gray-200">
                             <h3 className="font-bold text-base text-slate-700">{selectedPlan.name}</h3>
                             <p className="text-xs text-gray-500 mb-2">{selectedPlan.description}</p>
                             <p className="font-semibold text-sm mb-3">Costo: {selectedPlan.price}</p>
                             <ul className="list-disc list-inside space-y-1 text-xs">
                                {selectedPlan.details.map((item, i) => <li key={i}>{item}</li>)}
                             </ul>
                             <p className="text-xs italic mt-3 text-gray-500">{selectedPlan.rider}</p>
                        </div>
                    </div>
                )}
                
                {/* Terms */}
                <div className="break-inside-avoid">
                    <SectionTitle title="Términos y Condiciones" />
                    <ul className="space-y-1.5 text-xs text-gray-600 list-decimal list-inside">
                        {terms.map((term, index) => (
                            <li key={index}>{term}</li>
                        ))}
                    </ul>
                </div>

                {/* Signature */}
                <div className="mt-12 pt-8 grid grid-cols-2 gap-16 break-before-page">
                    <div>
                        <div className="h-20 border-b-2 border-gray-400"></div>
                        <p className="pt-2 mt-1 text-center text-xs">
                            <strong>{data.providerName}</strong><br/>
                            EL PRESTADOR
                        </p>
                    </div>
                    <div>
                        <div className="h-20 border-b-2 border-gray-400 flex items-center justify-center">
                         {signatureUrl ? (
                            <img src={signatureUrl} alt="Firma del Cliente" className="max-h-20" style={{ imageRendering: 'pixelated' }}/>
                         ) : (
                            null
                         )}
                        </div>
                        <p className="pt-2 mt-1 text-center text-xs">
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
                        <span className="flex items-center text-slate-600">
                           <svg className="w-4 h-4 mr-1.5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.35C0 23.407.593 24 1.325 24H12.82v-9.29h-3.128v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.732 0 1.325-.593 1.325-1.325V1.325C24 .593 23.407 0 22.675 0z"/></svg>
                           <span>@djlei castillo</span>
                        </span>
                         <span className="flex items-center text-slate-600">
                           <svg className="w-4 h-4 mr-1.5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.012 3.584-.07 4.85c-.148 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.85s.012-3.584.07-4.85c.148-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.85-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.947s-.014-3.667-.072-4.947c-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.689-.073-4.948-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                           <span>@djleicastillo</span>
                        </span>
                         <span className="flex items-center text-slate-600">
                            <svg className="w-4 h-4 mr-1.5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M16.6 5.82s.51.5 0 0A4.278 4.278 0 0 1 15.54 3h-3.09v12.4a2.592 2.592 0 0 1-2.59 2.59c-1.43 0-2.6-1.16-2.6-2.6s1.17-2.6 2.6-2.6c.2 0 .6.05.6.05v-3.36s-.46 0-.67.05c-3.23 0-5.86 2.64-5.86 5.86s2.63 5.86 5.86 5.86 5.86-2.64 5.86-5.86V7.18a4.278 4.278 0 0 1 4.09-4.09c.5 0 .5.51 0 0Z"/></svg>
                            <span>@djleicastillo</span>
                        </span>
                    </div>
                    <p className="text-gray-400 mt-6 text-xs">
                        Generado el {new Date().toLocaleString('es-ES', { dateStyle: 'long', timeStyle: 'short' })}
                    </p>
                </footer>
            </div>
        );
    }
);