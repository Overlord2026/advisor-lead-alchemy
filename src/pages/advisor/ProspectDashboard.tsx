
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, Users, Calendar, Search, ArrowRight } from "lucide-react";
import { toast } from "@/utils/toast";

const ProspectDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold">Prospect Dashboard</h1>
        <p className="text-muted-foreground">
          Track and manage your prospect pipeline with detailed profiles and status tracking.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col">
              <div className="bg-primary/10 p-2 rounded-full w-fit mb-4">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <p className="text-sm font-medium text-muted-foreground">Total Prospects</p>
              <p className="mt-2 text-3xl font-bold">42</p>
              <p className="text-sm text-green-600 mt-2">+15% vs. last month</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col">
              <div className="bg-primary/10 p-2 rounded-full w-fit mb-4">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <p className="text-sm font-medium text-muted-foreground">Active Prospects</p>
              <p className="mt-2 text-3xl font-bold">28</p>
              <p className="text-sm text-green-600 mt-2">+8% vs. last month</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col">
              <div className="bg-primary/10 p-2 rounded-full w-fit mb-4">
                <Calendar className="h-5 w-5 text-primary" />
              </div>
              <p className="text-sm font-medium text-muted-foreground">Meetings Scheduled</p>
              <p className="mt-2 text-3xl font-bold">15</p>
              <p className="text-sm text-green-600 mt-2">+20% vs. last month</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col">
              <div className="bg-green-100 p-2 rounded-full w-fit mb-4">
                <BarChart className="h-5 w-5 text-green-600" />
              </div>
              <p className="text-sm font-medium text-muted-foreground">Conversions</p>
              <p className="mt-2 text-3xl font-bold">8</p>
              <p className="text-sm text-green-600 mt-2">+12% vs. last month</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Prospect Pipeline</CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search prospects..."
                  className="w-full pl-8 pr-4 py-2 rounded-md border border-input bg-background"
                />
              </div>
              <Button>
                <Users className="mr-1 h-4 w-4" /> Add Prospect
              </Button>
            </div>
          </div>
          <CardDescription>
            View and manage your prospect pipeline with detailed profiles and status tracking
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Name</th>
                  <th className="text-left py-3 px-4">Source</th>
                  <th className="text-left py-3 px-4">HNW Score</th>
                  <th className="text-left py-3 px-4">Stage</th>
                  <th className="text-left py-3 px-4">Next Meeting</th>
                  <th className="text-right py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b hover:bg-muted/50">
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-sm font-medium text-primary mr-3">
                        JD
                      </div>
                      <div>
                        <div className="font-medium">John Doe</div>
                        <div className="text-sm text-muted-foreground">john@example.com</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">Facebook Ad</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">High</span>
                  </td>
                  <td className="py-3 px-4">Initial Meeting</td>
                  <td className="py-3 px-4">Apr 24, 2025</td>
                  <td className="py-3 px-4 text-right">
                    <Button variant="ghost" size="icon" onClick={() => toast.info("Viewing prospect details")}>
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
                
                <tr className="border-b hover:bg-muted/50">
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-sm font-medium text-primary mr-3">
                        MS
                      </div>
                      <div>
                        <div className="font-medium">Mary Smith</div>
                        <div className="text-sm text-muted-foreground">mary@example.com</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 rounded-full text-xs bg-purple-100 text-purple-800">Referral</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800">Medium</span>
                  </td>
                  <td className="py-3 px-4">Follow-up</td>
                  <td className="py-3 px-4">Apr 25, 2025</td>
                  <td className="py-3 px-4 text-right">
                    <Button variant="ghost" size="icon" onClick={() => toast.info("Viewing prospect details")}>
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
                
                <tr className="border-b hover:bg-muted/50">
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-sm font-medium text-primary mr-3">
                        MJ
                      </div>
                      <div>
                        <div className="font-medium">Michael Johnson</div>
                        <div className="text-sm text-muted-foreground">michael@example.com</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 rounded-full text-xs bg-orange-100 text-orange-800">LinkedIn</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">High</span>
                  </td>
                  <td className="py-3 px-4">Proposal</td>
                  <td className="py-3 px-4">Apr 27, 2025</td>
                  <td className="py-3 px-4 text-right">
                    <Button variant="ghost" size="icon" onClick={() => toast.info("Viewing prospect details")}>
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProspectDashboard;
