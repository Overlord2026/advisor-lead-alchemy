
import React from 'react';

const DashboardHeader = ({ title, subtitle }: { title: string; subtitle?: string }) => {
  return (
    <div className="bg-gradient-to-r from-navy-dark via-navy-light to-navy-dark border-b border-gold/20 p-8 mb-8 -mx-6 mt-[-24px]">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-foreground mb-2 tracking-tight">{title}</h1>
            {subtitle && (
              <p className="text-muted-foreground text-lg leading-relaxed max-w-4xl">{subtitle}</p>
            )}
          </div>
          <div className="hidden md:flex items-center">
            <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center border border-gold/20">
              <div className="w-8 h-8 bg-gold rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
