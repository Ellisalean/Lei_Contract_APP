
import React from 'react';

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

export const Section: React.FC<SectionProps> = ({ title, children }) => {
  return (
    <section>
      <h2 className="text-2xl font-bold text-slate-800 mb-6 pb-3 border-b border-gray-300">{title}</h2>
      <div>{children}</div>
    </section>
  );
};
