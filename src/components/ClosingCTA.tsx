
import React from 'react';
import { Button } from "@/components/ui/button";

const ClosingCTA = () => {
  return (
    <section className="py-16 bg-primary/5 rounded-lg border border-border mb-8">
      <div className="container px-4 mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Ready to cut your meeting workload by 90%?
        </h2>
        
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Start your free 14-day trial—no credit card required.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="font-medium px-8">
            Try Lovable Free
          </Button>
          
          <Button size="lg" variant="outline" className="font-medium px-8">
            Schedule a Live Demo
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ClosingCTA;
