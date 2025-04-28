
import React from 'react';
import { Link } from "react-router-dom";
import { ChevronRight, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
    <Card className={`overflow-hidden border-none ${className}`}>
      <CardContent className="p-6">
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-white/10 rounded-lg">
              <Icon className="h-8 w-8 text-white" />
            </div>
            {aiEnhanced && (
              <div className="ai-badge">
                <Sparkles className="h-3 w-3" />
                AI Enhanced
              </div>
            )}
          </div>
          
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          
          <p className="text-sm text-white/80 mb-4">
            {description}
          </p>
          
          <ul className="text-sm text-white/80 mb-6 space-y-1">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center">
                <div className="h-1.5 w-1.5 bg-white/80 rounded-full mr-2"></div>
                {feature}
              </li>
            ))}
          </ul>
          
          <div className="mt-auto">
            <Button 
              asChild={!onClick} 
              variant="secondary" 
              className="w-full"
              onClick={onClick}
            >
              {onClick ? (
                <>
                  {linkText}
                  <ChevronRight className="h-4 w-4 ml-1" />
                </>
              ) : (
                <Link to={linkTo}>
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
