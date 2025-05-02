import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, ArrowRight, Calendar, BarChart, Mic } from "lucide-react";
import { formatCurrency } from "@/utils/format";
import { Link } from "react-router-dom";
import AddProspectModal from "@/components/advisor/prospects/AddProspectModal";

interface ClientData {
  id: string;
  name: string;
  totalAssets: number;
  lastActivity: string;
  portfolioChange: {
    value: number;
    isPositive: boolean;
  };
  conversionProbability?: number;
}

// Mock data for demonstration - this would be fetched from the API in a real implementation
const mockClients: ClientData[] = [
  { 
    id: "c1", 
    name: "Johnson Family", 
    totalAssets: 2450000, 
    lastActivity: "2025-04-28", 
    portfolioChange: { value: 4.2, isPositive: true },
    conversionProbability: 85
  },
  { 
    id: "c2", 
    name: "Smith Household", 
    totalAssets: 1850000, 
    lastActivity: "2025-04-26", 
    portfolioChange: { value: 3.7, isPositive: true },
    conversionProbability: 72
  },
  { 
    id: "c3", 
    name: "Williams Trust", 
    totalAssets: 3250000, 
    lastActivity: "2025-04-27", 
    portfolioChange: { value: 0.8, isPositive: false },
    conversionProbability: 45
  },
  { 
    id: "c4", 
    name: "Garcia Foundation", 
    totalAssets: 5100000, 
    lastActivity: "2025-04-25", 
    portfolioChange: { value: 2.1, isPositive: true },
    conversionProbability: 92
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
            <h2 className="text-2xl font-bold">Prospect Pipeline</h2>
          </div>
          <div className="flex space-x-2">
            <AddProspectModal />
            <Button asChild variant="outline" className="bg-white hover:bg-red-50 border-red-200">
              <Link to="/advisor/prospects">
                View All Prospects <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-lg p-4 shadow-sm border border-red-200">
            <p className="text-sm font-medium text-red-600 mb-1">Potential AUM</p>
            <p className="text-3xl font-bold">{formatCurrency(totalAUM)}</p>
            <p className="text-sm text-muted-foreground mt-1">From {mockClients.length} active prospects</p>
          </div>
          
          <div className="bg-white rounded-lg p-4 shadow-sm border border-red-200">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-red-600 mb-1">Sales Activity</p>
                <p className="text-xl font-medium">15 Meetings This Week</p>
                <p className="text-sm text-muted-foreground mt-1">+20% vs. last week</p>
              </div>
              <Calendar className="h-8 w-8 text-red-500 opacity-70" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4 shadow-sm border border-red-200">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-red-600 mb-1">Conversion Rate</p>
                <p className="text-xl font-medium">18.5% This Month</p>
                <p className="text-sm text-green-600 mt-1">+2.3% vs. last month</p>
              </div>
              <BarChart className="h-8 w-8 text-red-500 opacity-70" />
            </div>
            <Link to="/advisor/roi" className="text-sm text-red-600 hover:underline mt-2 block">
              View ROI dashboard →
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="md:col-span-2 bg-white rounded-lg p-4 shadow-sm border border-red-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium">Recent Prospect Activity</h3>
              <Link to="/advisor/prospects" className="text-sm text-red-600 hover:underline">
                View all →
              </Link>
            </div>
            <div className="space-y-3">
              <div className="flex items-center p-2 hover:bg-red-50 rounded-md">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  <Calendar className="h-4 w-4 text-blue-700" />
                </div>
                <div>
                  <p className="font-medium">Smith Family Meeting</p>
                  <p className="text-sm text-muted-foreground">Tomorrow at 10:00 AM</p>
                </div>
              </div>
              
              <div className="flex items-center p-2 hover:bg-red-50 rounded-md">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                  <Mic className="h-4 w-4 text-green-700" />
                </div>
                <div>
                  <p className="font-medium">Johnson Meeting Recording</p>
                  <p className="text-sm text-muted-foreground">Processed 2 hours ago</p>
                </div>
              </div>
              
              <div className="flex items-center p-2 hover:bg-red-50 rounded-md">
                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                  <Users className="h-4 w-4 text-purple-700" />
                </div>
                <div>
                  <p className="font-medium">Williams Trust Follow-up</p>
                  <p className="text-sm text-muted-foreground">Due in 2 days</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4 shadow-sm border border-red-200">
            <h3 className="font-medium mb-4">Sales Process Efficiency</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Lead to Meeting</span>
                  <span className="text-sm font-medium">3.2 days</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '70%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Meeting to Proposal</span>
                  <span className="text-sm font-medium">5.4 days</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Proposal to Close</span>
                  <span className="text-sm font-medium">12.5 days</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-red-500 h-2 rounded-full" style={{ width: '40%' }}></div>
                </div>
              </div>
            </div>
            
            <Button variant="outline" className="w-full mt-4">
              <Link to="/advisor/roi" className="w-full flex justify-center">
                Improve Efficiency
              </Link>
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-red-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-red-50">
                  <th className="text-left px-6 py-3 text-xs font-medium text-red-600 uppercase tracking-wider">Prospect</th>
                  <th className="text-right px-6 py-3 text-xs font-medium text-red-600 uppercase tracking-wider">Potential AUM</th>
                  <th className="text-right px-6 py-3 text-xs font-medium text-red-600 uppercase tracking-wider">Pipeline Stage</th>
                  <th className="text-right px-6 py-3 text-xs font-medium text-red-600 uppercase tracking-wider">Conversion Probability</th>
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
                      {client.id === 'c1' && <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">Proposal</span>}
                      {client.id === 'c2' && <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">Discovery</span>}
                      {client.id === 'c3' && <span className="px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800">Follow-up</span>}
                      {client.id === 'c4' && <span className="px-2 py-1 rounded-full text-xs bg-purple-100 text-purple-800">Closing</span>}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end">
                        <span className="mr-2">{client.conversionProbability}%</span>
                        <div className="w-16 bg-gray-200 rounded-full h-1.5">
                          <div 
                            className={`h-1.5 rounded-full ${
                              client.conversionProbability! > 70 ? 'bg-green-500' : 
                              client.conversionProbability! > 50 ? 'bg-yellow-500' : 'bg-red-500'
                            }`} 
                            style={{ width: `${client.conversionProbability}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">
                      {new Date(client.lastActivity).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <Button size="sm" variant="outline">View Details</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="bg-red-50/50 px-6 py-3 text-right">
            <Link to="/advisor/prospects" className="text-sm font-medium text-red-600 hover:text-red-800">
              Manage All Prospects →
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ClientsOverview;
