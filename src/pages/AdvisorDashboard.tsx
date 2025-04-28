
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { BarChart, ChevronRight, ClipboardList, Mail, Mic, Users } from "lucide-react";

const AdvisorDashboard = () => {
  // Mock data for dashboard metrics
  const metrics = {
    prospects: 42,
    activeLeads: 28,
    meetingsScheduled: 15,
    conversions: 8,
    questionnairesCompleted: 22,
    emailsSent: 67
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Advisor Dashboard</h1>
        <p className="text-muted-foreground">Overview of your sales process and prospect activity</p>
      </div>

      {/* Summary Metrics */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Prospects</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.prospects}</div>
            <p className="text-xs text-muted-foreground">
              +4 from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Leads</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.activeLeads}</div>
            <p className="text-xs text-muted-foreground">
              +2 from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Meetings Scheduled</CardTitle>
            <Mic className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.meetingsScheduled}</div>
            <p className="text-xs text-muted-foreground">
              +5 from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversions</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.conversions}</div>
            <p className="text-xs text-muted-foreground">
              +3 from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Questionnaires Completed</CardTitle>
            <ClipboardList className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.questionnairesCompleted}</div>
            <p className="text-xs text-muted-foreground">
              +8 from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Emails Sent</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.emailsSent}</div>
            <p className="text-xs text-muted-foreground">
              +12 from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Access Cards */}
      <h2 className="text-xl font-semibold mt-8">Sales Process Tools</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-lg">
                <Users className="h-5 w-5 text-blue-700 dark:text-blue-300" />
              </div>
              <CardTitle>Prospect Management</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Manage your prospect pipeline and verify potential clients.
            </CardDescription>
          </CardContent>
          <div className="px-6 pb-4">
            <Button asChild>
              <Link to="/advisor/prospects">View Prospects</Link>
            </Button>
          </div>
        </Card>
        
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="bg-indigo-100 dark:bg-indigo-900 p-2 rounded-lg">
                <Mic className="h-5 w-5 text-indigo-700 dark:text-indigo-300" />
              </div>
              <CardTitle>Meeting Recordings</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Record, transcribe, and analyze your client meetings.
            </CardDescription>
          </CardContent>
          <div className="px-6 pb-4">
            <Button asChild>
              <Link to="/advisor/recordings">View Recordings</Link>
            </Button>
          </div>
        </Card>
        
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="bg-purple-100 dark:bg-purple-900 p-2 rounded-lg">
                <ClipboardList className="h-5 w-5 text-purple-700 dark:text-purple-300" />
              </div>
              <CardTitle>Questionnaires</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Create and manage questionnaires for your prospects and clients.
            </CardDescription>
          </CardContent>
          <div className="px-6 pb-4">
            <Button asChild>
              <Link to="/advisor/questionnaires">View Questionnaires</Link>
            </Button>
          </div>
        </Card>
        
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="bg-green-100 dark:bg-green-900 p-2 rounded-lg">
                <Mail className="h-5 w-5 text-green-700 dark:text-green-300" />
              </div>
              <CardTitle>Email Templates</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Manage your email templates for efficient client communication.
            </CardDescription>
          </CardContent>
          <div className="px-6 pb-4">
            <Button asChild>
              <Link to="/advisor/templates">Manage Templates</Link>
            </Button>
          </div>
        </Card>
        
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="bg-orange-100 dark:bg-orange-900 p-2 rounded-lg">
                <BarChart className="h-5 w-5 text-orange-700 dark:text-orange-300" />
              </div>
              <CardTitle>ROI Tracker</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Track your marketing ROI and analyze campaign performance.
            </CardDescription>
          </CardContent>
          <div className="px-6 pb-4">
            <Button asChild>
              <Link to="/advisor/roi">View ROI Data</Link>
            </Button>
          </div>
        </Card>
      </div>

      {/* Recent Activity */}
      <h2 className="text-xl font-semibold mt-8">Recent Activity</h2>
      <Card>
        <CardHeader>
          <CardTitle>Activity Feed</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-4 border-b pb-4">
              <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-full">
                <Users className="h-4 w-4 text-blue-700 dark:text-blue-300" />
              </div>
              <div>
                <p className="font-medium">New prospect added</p>
                <p className="text-sm text-muted-foreground">John Smith - Referred by James Wilson</p>
                <p className="text-xs text-muted-foreground">2 hours ago</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 border-b pb-4">
              <div className="bg-indigo-100 dark:bg-indigo-900 p-2 rounded-full">
                <Mic className="h-4 w-4 text-indigo-700 dark:text-indigo-300" />
              </div>
              <div>
                <p className="font-medium">Meeting recording complete</p>
                <p className="text-sm text-muted-foreground">Initial consultation with Sarah Johnson</p>
                <p className="text-xs text-muted-foreground">Yesterday at 2:30 PM</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 border-b pb-4">
              <div className="bg-purple-100 dark:bg-purple-900 p-2 rounded-full">
                <ClipboardList className="h-4 w-4 text-purple-700 dark:text-purple-300" />
              </div>
              <div>
                <p className="font-medium">Questionnaire completed</p>
                <p className="text-sm text-muted-foreground">Michael Brown completed the Risk Assessment</p>
                <p className="text-xs text-muted-foreground">Yesterday at 11:15 AM</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="bg-green-100 dark:bg-green-900 p-2 rounded-full">
                <Mail className="h-4 w-4 text-green-700 dark:text-green-300" />
              </div>
              <div>
                <p className="font-medium">Email template created</p>
                <p className="text-sm text-muted-foreground">New "Estate Planning Follow-up" template</p>
                <p className="text-xs text-muted-foreground">2 days ago</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdvisorDashboard;
