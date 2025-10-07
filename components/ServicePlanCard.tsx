import React from 'react';
import { ServicePlan } from '../types';

interface EditableFieldProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    placeholder?: string;
    className?: string;
    isTextarea?: boolean;
}

const EditableField: React.FC<EditableFieldProps> = ({ value, onChange, placeholder, className, isTextarea = false }) => {
    const commonProps = {
        value,
        onChange,
        onClick: (e: React.MouseEvent) => e.stopPropagation(),
        placeholder,
        className: `bg-transparent hover:bg-slate-100/50 focus:bg-white focus:ring-1 ring-indigo-400 rounded-md w-full p-1 transition-colors ${className}`
    };
    if (isTextarea) {
        return <textarea {...commonProps} rows={2} />;
    }
    return <input {...commonProps} />;
};

interface ServicePlanCardProps {
    plan: ServicePlan;
    isSelected: boolean;
    onSelect: () => void;
    onPlanChange: (planId: string, field: keyof ServicePlan, value: string) => void;
    onDetailChange: (planId: string, detailIndex: number, value: string) => void;
    onAddDetail: (planId: string) => void;
    onRemoveDetail: (planId: string, detailIndex: number) => void;
}

export const ServicePlanCard: React.FC<ServicePlanCardProps> = ({ plan, isSelected, onSelect, onPlanChange, onDetailChange, onAddDetail, onRemoveDetail }) => {
    return (
        <div 
            onClick={onSelect}
            className={`relative cursor-pointer border rounded-2xl p-6 flex flex-col h-full transition-all duration-300 ${isSelected ? 'border-indigo-500 bg-white/90 shadow-2xl scale-[1.03] ring-2 ring-indigo-500' : 'border-gray-200/80 bg-white/70 backdrop-blur-sm hover:border-indigo-400/50 hover:shadow-lg hover:scale-[1.01]'}`}
        >
            {isSelected && (
                 <div className="absolute top-4 right-4 bg-indigo-600 text-white rounded-full p-1 shadow">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
            )}
            <EditableField 
                value={plan.name}
                onChange={(e) => onPlanChange(plan.id, 'name', e.target.value)}
                className={`text-xl font-bold ${isSelected ? 'text-indigo-900' : 'text-gray-900'}`}
            />
            <EditableField 
                value={plan.description}
                onChange={(e) => onPlanChange(plan.id, 'description', e.target.value)}
                className="text-gray-500 text-sm mb-4"
            />
            <EditableField 
                value={plan.price}
                onChange={(e) => onPlanChange(plan.id, 'price', e.target.value)}
                className={`text-2xl font-semibold mb-4 ${isSelected ? 'text-indigo-900' : 'text-gray-800'}`}
            />
            
            <ul className="space-y-2 text-sm text-gray-600 flex-grow">
                {plan.details.map((detail, index) => (
                    <li key={index} className="flex items-start group">
                        <svg className={`w-4 h-4 mr-2 mt-1 ${isSelected ? 'text-indigo-700' : 'text-slate-500'} flex-shrink-0`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                        <div className="flex-grow">
                             <EditableField 
                                value={detail}
                                onChange={(e) => onDetailChange(plan.id, index, e.target.value)}
                                className="text-sm"
                            />
                        </div>
                        <button 
                            onClick={(e) => { e.stopPropagation(); onRemoveDetail(plan.id, index); }} 
                            className="ml-2 text-red-500 opacity-0 group-hover:opacity-100 hover:text-red-700 transition-opacity text-lg"
                            aria-label="Eliminar detalle"
                        >
                            &times;
                        </button>
                    </li>
                ))}
            </ul>
            <button 
                onClick={(e) => { e.stopPropagation(); onAddDetail(plan.id); }}
                className="text-sm text-indigo-600 hover:text-indigo-800 font-semibold mt-4 py-1 px-2 rounded-md bg-indigo-100 hover:bg-indigo-200 transition-colors w-full"
            >
                + Añadir Detalle
            </button>


            <EditableField 
                value={plan.rider}
                onChange={(e) => onPlanChange(plan.id, 'rider', e.target.value)}
                isTextarea
                className="text-xs text-gray-500 mt-4 italic"
            />
        </div>
    );
};