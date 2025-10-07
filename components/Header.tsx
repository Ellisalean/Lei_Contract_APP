import React from 'react';
import { LOGO_URL } from '../assets/logo';

export const Header: React.FC = () => {
    return (
        <header className="bg-gradient-to-br from-slate-800 to-slate-900 text-white -m-6 sm:-m-8 p-6 sm:p-8 rounded-t-2xl flex items-center space-x-4 sm:space-x-6 shadow-lg">
            <img src={LOGO_URL} alt="Dj Lei Logo" className="h-24 w-24 sm:h-28 sm:w-28 object-contain flex-shrink-0" />
            <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">CONTRATO DE SERVICIO</h1>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-300 tracking-tight">EVENTOS LEI</h1>
                <p className="text-slate-400 mt-1 text-sm sm:text-base">Una experiencia a otro nivel</p>
            </div>
        </header>
    );
};