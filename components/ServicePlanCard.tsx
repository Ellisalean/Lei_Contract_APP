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
        className: `bg-transparent hover:bg-slate-100 focus:bg-white focus:ring-1 ring-slate-400 rounded-md w-full p-1 transition-colors ${className}`
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
            className={`cursor-pointer border-2 rounded-lg p-6 flex flex-col h-full transition-all duration-300 ${isSelected ? 'border-slate-500 bg-slate-50 shadow-lg' : 'border-gray-300 bg-white hover:border-slate-400 hover:bg-gray-50'}`}
        >
            <EditableField 
                value={plan.name}
                onChange={(e) => onPlanChange(plan.id, 'name', e.target.value)}
                className={`text-xl font-bold ${isSelected ? 'text-slate-800' : 'text-gray-900'}`}
            />
            <EditableField 
                value={plan.description}
                onChange={(e) => onPlanChange(plan.id, 'description', e.target.value)}
                className="text-gray-500 text-sm mb-4"
            />
            <EditableField 
                value={plan.price}
                onChange={(e) => onPlanChange(plan.id, 'price', e.target.value)}
                className={`text-2xl font-semibold mb-4 ${isSelected ? 'text-slate-900' : 'text-gray-800'}`}
            />
            
            <ul className="space-y-2 text-sm text-gray-600 flex-grow">
                {plan.details.map((detail, index) => (
                    <li key={index} className="flex items-start group">
                        <svg className={`w-4 h-4 mr-2 mt-2 ${isSelected ? 'text-slate-600' : 'text-slate-500'} flex-shrink-0`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
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
                className="text-sm text-slate-600 hover:text-slate-800 font-semibold mt-3 py-1 px-2 rounded-md bg-slate-200 hover:bg-slate-300 transition-colors w-full"
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