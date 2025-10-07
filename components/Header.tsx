import React from 'react';
import { LOGO_URL } from '../assets/logo';

export const Header: React.FC = () => {
    return (
        <header className="bg-slate-800 text-white -m-6 sm:-m-8 p-6 sm:p-8 rounded-t-lg flex items-center justify-center relative shadow-lg min-h-[160px]">
            <div className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2">
                 <img src={LOGO_URL} alt="Dj Lei Logo" className="h-24 w-24 sm:h-36 sm:w-36 object-contain" />
            </div>
            <div className="text-center">
                <h1 className="text-3xl font-extrabold text-white tracking-tight">CONTRATO DE SERVICIO</h1>
                <h1 className="text-3xl font-extrabold text-slate-300 tracking-tight">EVENTOS LEI</h1>
                <p className="text-slate-400 mt-1 text-base">Una experiencia a otro nivel</p>
            </div>
        </header>
    );
};