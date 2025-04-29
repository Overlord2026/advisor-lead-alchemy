
import React from 'react';

const DashboardHeader = ({ title, subtitle }: { title: string; subtitle?: string }) => {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold text-foreground">{title}</h1>
      {subtitle && (
        <p className="text-muted-foreground mt-1">{subtitle}</p>
      )}
    </div>
  );
};

export default DashboardHeader;
