
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

interface TemplateCategoryProps {
  id: string;
  name: string;
  icon: React.ReactNode;
  count: number;
  isSelected: boolean;
  onClick: (id: string) => void;
}

const TemplateCategory: React.FC<TemplateCategoryProps> = ({
  id,
  name,
  icon,
  count,
  isSelected,
  onClick
}) => {
  return (
    <Card 
      className={`cursor-pointer hover:border-blue-300 transition-colors ${
        isSelected ? 'border-blue-500 bg-blue-50' : ''
      }`}
      onClick={() => onClick(id)}
    >
      <CardContent className="flex flex-col items-center justify-center p-4">
        <div className="mb-2 mt-2 h-10 w-10 rounded-full bg-white flex items-center justify-center shadow-sm">
          {icon}
        </div>
        <div className="text-center">
          <p className="font-medium text-sm">{name}</p>
          <p className="text-xs text-muted-foreground">{count} templates</p>
        </div>
      </CardContent>
    </Card>
  );
};

interface EmailTemplateCategoriesProps {
  categories: Array<{
    id: string;
    name: string;
    icon: React.ReactNode;
    count: number;
  }>;
  selectedCategory: string;
  onSelectCategory: (id: string) => void;
}

const EmailTemplateCategories: React.FC<EmailTemplateCategoriesProps> = ({
  categories,
  selectedCategory,
  onSelectCategory
}) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-4">
      {categories.map((category) => (
        <TemplateCategory
          key={category.id}
          id={category.id}
          name={category.name}
          icon={category.icon}
          count={category.count}
          isSelected={selectedCategory === category.id}
          onClick={onSelectCategory}
        />
      ))}
    </div>
  );
};

export default EmailTemplateCategories;
