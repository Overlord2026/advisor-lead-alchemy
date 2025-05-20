
import React from 'react';
import { Link } from "react-router-dom";
import { ChevronRight, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/shared/ui";
import { LucideIcon } from "lucide-react";

export interface FeatureCardProps {
  title: string;
  description: string;
  Icon: LucideIcon;
  linkTo: string;
  linkText: string;
  features: string[];
  className: string;
  aiEnhanced?: boolean;
  onClick?: () => void;
}

const FeatureCard = ({
  title,
  description,
  Icon,
  linkTo,
  linkText,
  features,
  className,
  aiEnhanced = true,
  onClick
}: FeatureCardProps) => {
  return (
    <Card className={`overflow-hidden border-border/30 shadow-card hover:border-gold/20 transition-all feature-card ${className}`}>
      <CardContent className="p-6">
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-start mb-5">
            <div className="p-3 bg-gold/10 rounded-lg backdrop-blur-sm">
              <Icon className="h-8 w-8 text-gold" />
            </div>
            {aiEnhanced && (
              <div className="ai-badge">
                <Sparkles className="h-3 w-3" />
                AI Enhanced
              </div>
            )}
          </div>
          
          <h3 className="text-xl font-medium mb-2 text-foreground">{title}</h3>
          
          <p className="text-sm text-muted-foreground mb-4">
            {description}
          </p>
          
          <ul className="text-sm text-muted-foreground mb-6 space-y-2">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center">
                <div className="h-1.5 w-1.5 bg-gold/60 rounded-full mr-2"></div>
                {feature}
              </li>
            ))}
          </ul>
          
          <div className="mt-auto">
            <Button 
              asChild={!onClick} 
              variant="secondary" 
              className="w-full hover:bg-gold hover:text-navy-dark transition-colors"
              onClick={onClick}
            >
              {onClick ? (
                <>
                  {linkText}
                  <ChevronRight className="h-4 w-4 ml-1" />
                </>
              ) : (
                <Link to={linkTo} className="w-full flex items-center justify-center">
                  {linkText}
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;
