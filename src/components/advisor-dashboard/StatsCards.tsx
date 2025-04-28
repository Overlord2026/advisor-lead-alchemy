
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Users, BarChart, Mail, LineChart } from "lucide-react";

const StatsCards = () => {
  return (
    <div className="grid gap-6 md:grid-cols-4 mt-10">
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col">
            <div className="bg-primary/10 p-2 rounded-full w-fit mb-4">
              <LineChart className="h-5 w-5 text-primary" />
            </div>
            <p className="text-sm font-medium text-muted-foreground">Conversion Rate</p>
            <p className="mt-2 text-3xl font-bold">18.7%</p>
            <p className="text-sm text-green-600 mt-2">+3.2% vs. last quarter</p>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col">
            <div className="bg-primary/10 p-2 rounded-full w-fit mb-4">
              <Users className="h-5 w-5 text-primary" />
            </div>
            <p className="text-sm font-medium text-muted-foreground">New Clients</p>
            <p className="mt-2 text-3xl font-bold">24</p>
            <p className="text-sm text-green-600 mt-2">+6 vs. last quarter</p>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col">
            <div className="bg-primary/10 p-2 rounded-full w-fit mb-4">
              <BarChart className="h-5 w-5 text-primary" />
            </div>
            <p className="text-sm font-medium text-muted-foreground">AUM Growth</p>
            <p className="mt-2 text-3xl font-bold">$42.5M</p>
            <p className="text-sm text-green-600 mt-2">+$12.3M vs. last quarter</p>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col">
            <div className="bg-primary/10 p-2 rounded-full w-fit mb-4">
              <Mail className="h-5 w-5 text-primary" />
            </div>
            <p className="text-sm font-medium text-muted-foreground">Email Open Rate</p>
            <p className="mt-2 text-3xl font-bold">68.9%</p>
            <p className="text-sm text-green-600 mt-2">+12.4% vs. industry avg.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsCards;
