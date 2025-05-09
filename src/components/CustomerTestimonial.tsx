
import React from 'react';
import { QuoteIcon } from 'lucide-react';

const CustomerTestimonial = () => {
  // Array of advisor firm logos to display
  const advisorLogos = [
    { name: "LPL Financial", alt: "LPL Financial logo" },
    { name: "Sanctuary", alt: "Sanctuary logo" },
    { name: "Mission Wealth", alt: "Mission Wealth logo" },
    { name: "Elevation", alt: "Elevation logo" },
    { name: "Cambridge", alt: "Cambridge logo" },
    { name: "Solidarity Wealth", alt: "Solidarity Wealth logo" }
  ];

  return (
    <section className="py-16 bg-card rounded-lg border border-border mb-8">
      <div className="container px-4 mx-auto">
        {/* Testimonial Quote */}
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <QuoteIcon className="h-12 w-12 text-primary opacity-70" />
          </div>
          <blockquote className="text-2xl md:text-3xl font-medium mb-8 px-6">
            "With Advisor Lead Alchemy, what used to be hours of prospect management now takes just minutes. Our conversion rates have increased by 40%."
          </blockquote>
          <div className="mb-12">
            <p className="text-lg font-medium">Jack Csenge, CFP</p>
            <p className="text-muted-foreground">Csenge Advisory Group</p>
          </div>
        </div>

        {/* Advisor Logos */}
        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-center text-sm text-muted-foreground mb-6">Trusted by leading advisory firms</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {advisorLogos.map((logo, index) => (
              <div 
                key={index} 
                className="flex items-center justify-center h-6 md:h-8"
              >
                {/* Using company name as placeholder, in real app would use actual logos */}
                <span className="text-sm md:text-base font-medium text-muted-foreground">{logo.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomerTestimonial;
