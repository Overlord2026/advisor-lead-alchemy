
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Users, BarChart, Mail, LineChart, ArrowUp, TrendingUp } from "lucide-react";

const StatsCards = () => {
  return (
    <div className="grid gap-6 md:grid-cols-4 animate-fade-in">
      <Card className="overflow-hidden border-border/30 shadow-card hover:border-gold/20 transition-colors">
        <CardContent className="p-6">
          <div className="flex flex-col">
            <div className="bg-gold/10 p-2 rounded-lg w-fit mb-4">
              <LineChart className="h-5 w-5 text-gold" />
            </div>
            <p className="text-sm font-medium text-muted-foreground">Conversion Rate</p>
            <div className="flex items-baseline justify-between mt-2">
              <p className="text-2xl font-semibold">18.7%</p>
              <div className="flex items-center text-emerald-500 text-xs font-medium">
                <ArrowUp className="h-3 w-3 mr-1" /> 
                <span>3.2%</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">vs. last quarter</p>
          </div>
        </CardContent>
      </Card>
      
      <Card className="overflow-hidden border-border/30 shadow-card hover:border-gold/20 transition-colors">
        <CardContent className="p-6">
          <div className="flex flex-col">
            <div className="bg-gold/10 p-2 rounded-lg w-fit mb-4">
              <Users className="h-5 w-5 text-gold" />
            </div>
            <p className="text-sm font-medium text-muted-foreground">New Clients</p>
            <div className="flex items-baseline justify-between mt-2">
              <p className="text-2xl font-semibold">24</p>
              <div className="flex items-center text-emerald-500 text-xs font-medium">
                <ArrowUp className="h-3 w-3 mr-1" /> 
                <span>6</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">vs. last quarter</p>
          </div>
        </CardContent>
      </Card>
      
      <Card className="overflow-hidden border-border/30 shadow-card hover:border-gold/20 transition-colors">
        <CardContent className="p-6">
          <div className="flex flex-col">
            <div className="bg-gold/10 p-2 rounded-lg w-fit mb-4">
              <BarChart className="h-5 w-5 text-gold" />
            </div>
            <p className="text-sm font-medium text-muted-foreground">AUM Growth</p>
            <div className="flex items-baseline justify-between mt-2">
              <p className="text-2xl font-semibold">$42.5M</p>
              <div className="flex items-center text-emerald-500 text-xs font-medium">
                <TrendingUp className="h-3 w-3 mr-1" /> 
                <span>$12.3M</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">vs. last quarter</p>
          </div>
        </CardContent>
      </Card>
      
      <Card className="overflow-hidden border-border/30 shadow-card hover:border-gold/20 transition-colors">
        <CardContent className="p-6">
          <div className="flex flex-col">
            <div className="bg-gold/10 p-2 rounded-lg w-fit mb-4">
              <Mail className="h-5 w-5 text-gold" />
            </div>
            <p className="text-sm font-medium text-muted-foreground">Email Open Rate</p>
            <div className="flex items-baseline justify-between mt-2">
              <p className="text-2xl font-semibold">68.9%</p>
              <div className="flex items-center text-emerald-500 text-xs font-medium">
                <ArrowUp className="h-3 w-3 mr-1" /> 
                <span>12.4%</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">vs. industry avg.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsCards;
