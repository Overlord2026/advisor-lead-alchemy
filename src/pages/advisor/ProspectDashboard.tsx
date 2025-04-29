
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BarChart, Users, Calendar, Search, ArrowRight, Filter, PlusCircle } from "lucide-react";
import { toast } from "@/utils/toast";
import DashboardHeader from "@/components/advisor-dashboard/DashboardHeader";

const ProspectDashboard = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <DashboardHeader title="Prospect Dashboard" />
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="text-xs">
            <Filter className="h-3 w-3 mr-1" />
            Filter
          </Button>
          <Button size="sm" className="bg-primary text-primary-foreground text-xs">
            <PlusCircle className="h-3 w-3 mr-1" />
            Add New Prospect
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <Card className="bg-card">
          <CardContent className="pt-6">
            <div className="flex flex-col">
              <div className="flex items-center mb-4">
                <div className="p-2 rounded-full bg-blue-100 mr-2">
                  <Users className="h-5 w-5 text-blue-600" />
                </div>
                <span className="text-sm font-medium">Total Prospects</span>
              </div>
              <p className="text-3xl font-bold">42</p>
              <p className="text-xs text-green-600 mt-1">+15% this month</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-card">
          <CardContent className="pt-6">
            <div className="flex flex-col">
              <div className="flex items-center mb-4">
                <div className="p-2 rounded-full bg-blue-100 mr-2">
                  <Users className="h-5 w-5 text-blue-600" />
                </div>
                <span className="text-sm font-medium">Active Prospects</span>
              </div>
              <p className="text-3xl font-bold">28</p>
              <p className="text-xs text-green-600 mt-1">+5% this month</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-card">
          <CardContent className="pt-6">
            <div className="flex flex-col">
              <div className="flex items-center mb-4">
                <div className="p-2 rounded-full bg-blue-100 mr-2">
                  <Calendar className="h-5 w-5 text-blue-600" />
                </div>
                <span className="text-sm font-medium">Meetings Scheduled</span>
              </div>
              <p className="text-3xl font-bold">15</p>
              <p className="text-xs text-green-600 mt-1">+20% this month</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-card">
          <CardContent className="pt-6">
            <div className="flex flex-col">
              <div className="flex items-center mb-4">
                <div className="p-2 rounded-full bg-green-100 mr-2">
                  <BarChart className="h-5 w-5 text-green-600" />
                </div>
                <span className="text-sm font-medium">Conversions</span>
              </div>
              <p className="text-3xl font-bold">8</p>
              <p className="text-xs text-green-600 mt-1">+12% this month</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Prospect Pipeline Chart */}
      <Card className="bg-card">
        <CardContent className="pt-6">
          <div className="mb-4">
            <h3 className="text-lg font-bold mb-3">Prospect Pipeline</h3>
            <div className="h-40 w-full">
              <div className="flex h-full items-end justify-between gap-1">
                <div className="w-1/7 bg-blue-500 h-[75%] rounded-t-md"></div>
                <div className="w-1/7 bg-blue-500 h-[50%] rounded-t-md"></div>
                <div className="w-1/7 bg-blue-500 h-[45%] rounded-t-md"></div>
                <div className="w-1/7 bg-blue-500 h-[40%] rounded-t-md"></div>
                <div className="w-1/7 bg-blue-500 h-[30%] rounded-t-md"></div>
                <div className="w-1/7 bg-blue-500 h-[25%] rounded-t-md"></div>
                <div className="w-1/7 bg-blue-500 h-[20%] rounded-t-md"></div>
              </div>
              <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                <span>Initial Contact</span>
                <span>Initial Meeting</span>
                <span>Questionnaire</span>
                <span>Follow-up</span>
                <span>Proposal</span>
                <span>Decision</span>
                <span>Onboarding</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Prospect List */}
      <Card className="bg-card">
        <CardContent className="pt-6">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">Prospect List</h3>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search prospects..."
                    className="pl-8 pr-4 py-2 text-sm rounded-md border border-border bg-background w-64"
                  />
                </div>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="text-left border-b border-border">
                  <tr>
                    <th className="py-3 px-4 text-xs font-medium text-muted-foreground">Name</th>
                    <th className="py-3 px-4 text-xs font-medium text-muted-foreground">Source</th>
                    <th className="py-3 px-4 text-xs font-medium text-muted-foreground">HNW Score</th>
                    <th className="py-3 px-4 text-xs font-medium text-muted-foreground">Stage</th>
                    <th className="py-3 px-4 text-xs font-medium text-muted-foreground">Next Meeting</th>
                    <th className="py-3 px-4 text-xs font-medium text-muted-foreground text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-muted/20 border-b border-border">
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-sm font-medium text-blue-600 mr-3">
                          JD
                        </div>
                        <div>
                          <div className="font-medium text-sm">John Doe</div>
                          <div className="text-xs text-muted-foreground">john.doe@example.com</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200 text-xs font-normal">Facebook Ad</Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Badge className="bg-green-100 text-green-800 border-green-200 text-xs font-normal">High</Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Badge className="bg-blue-100 text-blue-800 border-blue-200 text-xs font-normal">Initial Meeting</Badge>
                    </td>
                    <td className="py-3 px-4 text-sm">Apr 24, 2025</td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex justify-end space-x-2">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <span className="sr-only">Edit</span>
                          <i className="h-4 w-4">✏️</i>
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <span className="sr-only">Email</span>
                          <i className="h-4 w-4">📧</i>
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <span className="sr-only">More</span>
                          <i className="h-4 w-4">⋯</i>
                        </Button>
                      </div>
                    </td>
                  </tr>
                  
                  <tr className="hover:bg-muted/20 border-b border-border">
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-sm font-medium text-purple-600 mr-3">
                          MS
                        </div>
                        <div>
                          <div className="font-medium text-sm">Mary Smith</div>
                          <div className="text-xs text-muted-foreground">mary@example.com</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-200 text-xs font-normal">Referral</Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200 text-xs font-normal">Medium</Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200 text-xs font-normal">Follow-up</Badge>
                    </td>
                    <td className="py-3 px-4 text-sm">Apr 25, 2025</td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex justify-end space-x-2">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <span className="sr-only">Edit</span>
                          <i className="h-4 w-4">✏️</i>
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <span className="sr-only">Email</span>
                          <i className="h-4 w-4">📧</i>
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <span className="sr-only">More</span>
                          <i className="h-4 w-4">⋯</i>
                        </Button>
                      </div>
                    </td>
                  </tr>
                  
                  <tr className="hover:bg-muted/20 border-b border-border">
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-sm font-medium text-green-600 mr-3">
                          RJ
                        </div>
                        <div>
                          <div className="font-medium text-sm">Robert Johnson</div>
                          <div className="text-xs text-muted-foreground">robert@example.com</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200 text-xs font-normal">LinkedIn</Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Badge className="bg-green-100 text-green-800 border-green-200 text-xs font-normal">Very High</Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Badge className="bg-purple-100 text-purple-800 border-purple-200 text-xs font-normal">Questionnaire</Badge>
                    </td>
                    <td className="py-3 px-4 text-sm">Apr 26, 2025</td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex justify-end space-x-2">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <span className="sr-only">Edit</span>
                          <i className="h-4 w-4">✏️</i>
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <span className="sr-only">Email</span>
                          <i className="h-4 w-4">📧</i>
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <span className="sr-only">More</span>
                          <i className="h-4 w-4">⋯</i>
                        </Button>
                      </div>
                    </td>
                  </tr>
                  
                  <tr className="hover:bg-muted/20 border-b border-border">
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-sm font-medium text-orange-600 mr-3">
                          AW
                        </div>
                        <div>
                          <div className="font-medium text-sm">Amanda Williams</div>
                          <div className="text-xs text-muted-foreground">amanda@example.com</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-200 text-xs font-normal">Website</Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200 text-xs font-normal">Medium</Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Badge className="bg-green-100 text-green-800 border-green-200 text-xs font-normal">Proposal</Badge>
                    </td>
                    <td className="py-3 px-4 text-sm">Apr 27, 2025</td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex justify-end space-x-2">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <span className="sr-only">Edit</span>
                          <i className="h-4 w-4">✏️</i>
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <span className="sr-only">Email</span>
                          <i className="h-4 w-4">📧</i>
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <span className="sr-only">More</span>
                          <i className="h-4 w-4">⋯</i>
                        </Button>
                      </div>
                    </td>
                  </tr>
                  
                  <tr className="hover:bg-muted/20 border-b border-border">
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-sm font-medium text-blue-600 mr-3">
                          MB
                        </div>
                        <div>
                          <div className="font-medium text-sm">Michael Brown</div>
                          <div className="text-xs text-muted-foreground">michael@example.com</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200 text-xs font-normal">Facebook Ad</Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Badge className="bg-green-100 text-green-800 border-green-200 text-xs font-normal">High</Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Badge className="bg-red-100 text-red-800 border-red-200 text-xs font-normal">Decision</Badge>
                    </td>
                    <td className="py-3 px-4 text-sm">Apr 28, 2025</td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex justify-end space-x-2">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <span className="sr-only">Edit</span>
                          <i className="h-4 w-4">✏️</i>
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <span className="sr-only">Email</span>
                          <i className="h-4 w-4">📧</i>
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <span className="sr-only">More</span>
                          <i className="h-4 w-4">⋯</i>
                        </Button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="flex items-center justify-center space-x-2 mt-4">
              <Button
                variant="outline"
                size="sm"
                className="h-8 w-8 p-0"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(1)}
              >
                1
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => setCurrentPage(2)}
              >
                2
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => setCurrentPage(3)}
              >
                3
              </Button>
              <span className="mx-2">...</span>
              <Button
                variant="outline"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => setCurrentPage(10)}
              >
                10
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProspectDashboard;
