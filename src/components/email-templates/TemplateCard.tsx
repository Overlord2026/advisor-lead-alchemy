
import React from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, MoreVertical } from "lucide-react";

interface Template {
  id: string;
  name: string;
  category: string;
  description: string;
  usageCount: number;
  lastUsed: string;
  categoryLabel: string;
  isAIEnhanced?: boolean;
}

interface TemplateCardProps {
  template: Template;
  onClick: () => void;
  onStar?: () => void;
  onOptions?: () => void;
}

const TemplateCard: React.FC<TemplateCardProps> = ({ template, onClick, onStar, onOptions }) => {
  return (
    <Card className="overflow-hidden relative">
      <div className="absolute top-2 right-2 flex space-x-1">
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8 rounded-full hover:bg-background/80"
          onClick={(e) => { 
            e.stopPropagation(); 
            onStar?.();
          }}
        >
          <Star className="h-4 w-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8 rounded-full hover:bg-background/80"
          onClick={(e) => { 
            e.stopPropagation(); 
            onOptions?.();
          }}
        >
          <MoreVertical className="h-4 w-4" />
        </Button>
      </div>

      <div className="p-6 cursor-pointer" onClick={onClick}>
        <div className="mb-4">
          {/* Category-specific icon could go here */}
          <div className="flex items-center">
            {template.category === 'meeting-followup' && <div className="text-blue-600 mr-2">💬</div>}
            {template.category === 'questionnaires' && <div className="text-blue-600 mr-2">📝</div>}
            {template.category === 'initial-contact' && <div className="text-blue-600 mr-2">🤝</div>}
            {template.category === 'proposals' && <div className="text-blue-600 mr-2">📄</div>}
            {template.category === 'onboarding' && <div className="text-blue-600 mr-2">👋</div>}
            <span className="text-xs text-muted-foreground">{template.categoryLabel}</span>
          </div>
        </div>
        
        <h3 className="text-lg font-medium mb-1">{template.name}</h3>
        <p className="text-sm text-muted-foreground mb-4">{template.description}</p>
        
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <p className="text-muted-foreground text-xs">Used</p>
            <p className="font-medium">{template.usageCount} times</p>
          </div>
          <div>
            <p className="text-muted-foreground text-xs">Last used</p>
            <p className="font-medium">{template.lastUsed}</p>
          </div>
        </div>
      </div>

      <CardFooter className="bg-muted/30 px-6 py-3 flex justify-between">
        {template.isAIEnhanced && (
          <div className="flex items-center text-purple-600 text-xs font-medium">
            <div className="w-2 h-2 bg-purple-600 rounded-full mr-1.5"></div>
            AI Enhanced
          </div>
        )}
        <Button variant="secondary" size="sm" className="ml-auto" onClick={onClick}>
          Use
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TemplateCard;
