
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, ArrowRight, UserPlus } from "lucide-react";
import { formatCurrency } from "@/utils/format";
import { Link } from "react-router-dom";
import { toast } from "sonner";

interface ClientData {
  id: string;
  name: string;
  totalAssets: number;
  lastActivity: string;
  portfolioChange: {
    value: number;
    isPositive: boolean;
  };
}

// Mock data for demonstration - this would be fetched from the client portal API in a real implementation
const mockClients: ClientData[] = [
  { 
    id: "c1", 
    name: "Johnson Family", 
    totalAssets: 2450000, 
    lastActivity: "2025-04-28", 
    portfolioChange: { value: 4.2, isPositive: true } 
  },
  { 
    id: "c2", 
    name: "Smith Household", 
    totalAssets: 1850000, 
    lastActivity: "2025-04-26", 
    portfolioChange: { value: 3.7, isPositive: true } 
  },
  { 
    id: "c3", 
    name: "Williams Trust", 
    totalAssets: 3250000, 
    lastActivity: "2025-04-27", 
    portfolioChange: { value: 0.8, isPositive: false } 
  },
  { 
    id: "c4", 
    name: "Garcia Foundation", 
    totalAssets: 5100000, 
    lastActivity: "2025-04-25", 
    portfolioChange: { value: 2.1, isPositive: true } 
  }
];

const ClientsOverview = () => {
  const totalAUM = mockClients.reduce((sum, client) => sum + client.totalAssets, 0);
  
  return (
    <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200 shadow-md">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="bg-red-100 p-2 rounded-full mr-3">
              <Users className="h-5 w-5 text-red-600" />
            </div>
            <h2 className="text-2xl font-bold">Client Management</h2>
          </div>
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              className="bg-white hover:bg-red-50 border-red-200"
              onClick={() => toast.info("Add client feature coming soon!")}
            >
              <UserPlus className="mr-2 h-4 w-4" />
              Add Client
            </Button>
            <Button asChild variant="outline" className="bg-white hover:bg-red-50 border-red-200">
              <Link to="/advisor/prospects">
                View All Clients <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-lg p-4 shadow-sm border border-red-200">
            <p className="text-sm font-medium text-red-600 mb-1">Total Assets Under Management</p>
            <p className="text-3xl font-bold">{formatCurrency(totalAUM)}</p>
            <p className="text-sm text-muted-foreground mt-1">Across {mockClients.length} client households</p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border border-red-200">
            <p className="text-sm font-medium text-red-600 mb-1">Client Portal Management</p>
            <p className="text-lg font-medium">Monitor Client Portal Activity</p>
            <p className="text-sm text-muted-foreground mt-1">
              Access insights from client interactions with their dashboards
            </p>
            <Button 
              variant="link" 
              className="text-red-600 p-0 h-auto mt-2"
              onClick={() => window.open("https://lovable.dev/projects/00a95494-1379-485c-9fca-9a2135238b56", "_blank")}
            >
              Preview Client Portal View
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-red-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-red-50">
                  <th className="text-left px-6 py-3 text-xs font-medium text-red-600 uppercase tracking-wider">Client</th>
                  <th className="text-right px-6 py-3 text-xs font-medium text-red-600 uppercase tracking-wider">Total Assets</th>
                  <th className="text-right px-6 py-3 text-xs font-medium text-red-600 uppercase tracking-wider">Portfolio Change</th>
                  <th className="text-right px-6 py-3 text-xs font-medium text-red-600 uppercase tracking-wider">Last Activity</th>
                  <th className="text-right px-6 py-3 text-xs font-medium text-red-600 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-red-100">
                {mockClients.map((client) => (
                  <tr key={client.id} className="hover:bg-red-50/50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link to={`/advisor/prospects/${client.id}`} className="font-medium text-gray-900 hover:text-red-600">
                        {client.name}
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right font-medium">
                      {formatCurrency(client.totalAssets)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <span className={client.portfolioChange.isPositive ? "text-green-600" : "text-red-600"}>
                        {client.portfolioChange.isPositive ? "+" : "-"}
                        {client.portfolioChange.value}%
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">
                      {new Date(client.lastActivity).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <Button size="sm" variant="outline">Details</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="bg-red-50/50 px-6 py-3 text-right">
            <Link to="/advisor/prospects" className="text-sm font-medium text-red-600 hover:text-red-800">
              Manage All Clients →
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ClientsOverview;
