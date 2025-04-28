
import React, { useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  BarChart, ChevronRight, ClipboardList, Mail, 
  Mic, Users, Sparkles, Play, Settings, LineChart 
} from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { initSalesProcessAutomation } from "@/utils/salesProcessAutomation";

const AdvisorDashboard = () => {
  useEffect(() => {
    // Initialize sales process automation
    initSalesProcessAutomation();
  }, []);

  return (
    <div className="space-y-10">
      <Toaster />
      
      {/* Header Section */}
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-2">Sales Process Automation System</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Streamline your client acquisition and relationship management process
        </p>
      </div>

      {/* Main Feature Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="card-gradient-purple overflow-hidden border-none">
          <CardContent className="p-6">
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-white/10 rounded-lg">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <div className="ai-badge">
                  <Sparkles className="h-3 w-3" />
                  AI Enhanced
                </div>
              </div>
              
              <h3 className="text-xl font-bold mb-2">Prospect Management</h3>
              
              <p className="text-sm text-white/80 mb-4">
                AI-powered analytics and scoring to identify high-value prospects and optimize your sales pipeline.
              </p>
              
              <ul className="text-sm text-white/80 mb-6 space-y-1">
                <li className="flex items-center">
                  <div className="h-1.5 w-1.5 bg-white/80 rounded-full mr-2"></div>
                  Pipeline visualization
                </li>
                <li className="flex items-center">
                  <div className="h-1.5 w-1.5 bg-white/80 rounded-full mr-2"></div>
                  HNW scoring
                </li>
                <li className="flex items-center">
                  <div className="h-1.5 w-1.5 bg-white/80 rounded-full mr-2"></div>
                  Automated follow-ups
                </li>
              </ul>
              
              <div className="mt-auto">
                <Button asChild variant="secondary" className="w-full">
                  <Link to="/advisor/prospects">
                    Access Prospects
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="card-gradient-indigo overflow-hidden border-none">
          <CardContent className="p-6">
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-white/10 rounded-lg">
                  <Mic className="h-8 w-8 text-white" />
                </div>
                <div className="ai-badge">
                  <Sparkles className="h-3 w-3" />
                  AI Enhanced
                </div>
              </div>
              
              <h3 className="text-xl font-bold mb-2">Meeting Intelligence</h3>
              
              <p className="text-sm text-white/80 mb-4">
                Record, transcribe, and analyze client meetings to extract insights and automate follow-up actions.
              </p>
              
              <ul className="text-sm text-white/80 mb-6 space-y-1">
                <li className="flex items-center">
                  <div className="h-1.5 w-1.5 bg-white/80 rounded-full mr-2"></div>
                  AI transcription
                </li>
                <li className="flex items-center">
                  <div className="h-1.5 w-1.5 bg-white/80 rounded-full mr-2"></div>
                  Key moment detection
                </li>
                <li className="flex items-center">
                  <div className="h-1.5 w-1.5 bg-white/80 rounded-full mr-2"></div>
                  Action item extraction
                </li>
              </ul>
              
              <div className="mt-auto">
                <Button asChild variant="secondary" className="w-full">
                  <Link to="/advisor/recordings">
                    Access Recordings
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="card-gradient-blue overflow-hidden border-none">
          <CardContent className="p-6">
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-white/10 rounded-lg">
                  <ClipboardList className="h-8 w-8 text-white" />
                </div>
                <div className="ai-badge">
                  <Sparkles className="h-3 w-3" />
                  AI Enhanced
                </div>
              </div>
              
              <h3 className="text-xl font-bold mb-2">Smart Questionnaires</h3>
              
              <p className="text-sm text-white/80 mb-4">
                Dynamic questionnaires that adapt based on client inputs, with AI analysis of responses.
              </p>
              
              <ul className="text-sm text-white/80 mb-6 space-y-1">
                <li className="flex items-center">
                  <div className="h-1.5 w-1.5 bg-white/80 rounded-full mr-2"></div>
                  Adaptive questions
                </li>
                <li className="flex items-center">
                  <div className="h-1.5 w-1.5 bg-white/80 rounded-full mr-2"></div>
                  Response sentiment analysis
                </li>
                <li className="flex items-center">
                  <div className="h-1.5 w-1.5 bg-white/80 rounded-full mr-2"></div>
                  Auto-recommended solutions
                </li>
              </ul>
              
              <div className="mt-auto">
                <Button asChild variant="secondary" className="w-full">
                  <Link to="/advisor/questionnaires">
                    Access Questionnaires
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="card-gradient-teal overflow-hidden border-none">
          <CardContent className="p-6">
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-white/10 rounded-lg">
                  <Mail className="h-8 w-8 text-white" />
                </div>
                <div className="ai-badge">
                  <Sparkles className="h-3 w-3" />
                  AI Enhanced
                </div>
              </div>
              
              <h3 className="text-xl font-bold mb-2">Email Automation</h3>
              
              <p className="text-sm text-white/80 mb-4">
                Personalized email templates and automated sequences based on client interactions and preferences.
              </p>
              
              <ul className="text-sm text-white/80 mb-6 space-y-1">
                <li className="flex items-center">
                  <div className="h-1.5 w-1.5 bg-white/80 rounded-full mr-2"></div>
                  Dynamic personalization
                </li>
                <li className="flex items-center">
                  <div className="h-1.5 w-1.5 bg-white/80 rounded-full mr-2"></div>
                  Sequence automation
                </li>
                <li className="flex items-center">
                  <div className="h-1.5 w-1.5 bg-white/80 rounded-full mr-2"></div>
                  Performance analytics
                </li>
              </ul>
              
              <div className="mt-auto">
                <Button asChild variant="secondary" className="w-full">
                  <Link to="/advisor/templates">
                    Access Templates
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="card-gradient-pink overflow-hidden border-none">
          <CardContent className="p-6">
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-white/10 rounded-lg">
                  <BarChart className="h-8 w-8 text-white" />
                </div>
                <div className="ai-badge">
                  <Sparkles className="h-3 w-3" />
                  AI Enhanced
                </div>
              </div>
              
              <h3 className="text-xl font-bold mb-2">ROI Analytics</h3>
              
              <p className="text-sm text-white/80 mb-4">
                Track marketing ROI and sales performance with advanced analytics and predictive modeling.
              </p>
              
              <ul className="text-sm text-white/80 mb-6 space-y-1">
                <li className="flex items-center">
                  <div className="h-1.5 w-1.5 bg-white/80 rounded-full mr-2"></div>
                  Channel attribution
                </li>
                <li className="flex items-center">
                  <div className="h-1.5 w-1.5 bg-white/80 rounded-full mr-2"></div>
                  Conversion path analysis
                </li>
                <li className="flex items-center">
                  <div className="h-1.5 w-1.5 bg-white/80 rounded-full mr-2"></div>
                  AI-powered forecasting
                </li>
              </ul>
              
              <div className="mt-auto">
                <Button asChild variant="secondary" className="w-full">
                  <Link to="/advisor/roi">
                    Access ROI Data
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="overflow-hidden border-none bg-gradient-to-br from-gray-900 to-gray-800 text-white">
          <CardContent className="p-6">
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-white/10 rounded-lg">
                  <Settings className="h-8 w-8 text-white" />
                </div>
              </div>
              
              <h3 className="text-xl font-bold mb-2">System Settings</h3>
              
              <p className="text-sm text-white/80 mb-4">
                Configure your sales process automation settings and integrations.
              </p>
              
              <ul className="text-sm text-white/80 mb-6 space-y-1">
                <li className="flex items-center">
                  <div className="h-1.5 w-1.5 bg-white/80 rounded-full mr-2"></div>
                  API connections
                </li>
                <li className="flex items-center">
                  <div className="h-1.5 w-1.5 bg-white/80 rounded-full mr-2"></div>
                  Automation rules
                </li>
                <li className="flex items-center">
                  <div className="h-1.5 w-1.5 bg-white/80 rounded-full mr-2"></div>
                  User permissions
                </li>
              </ul>
              
              <div className="mt-auto">
                <Button 
                  variant="secondary" 
                  className="w-full" 
                  onClick={() => toast.info("Settings module coming soon!")}
                >
                  Configure Settings
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Process Flow Section */}
      <div className="mt-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-2">Streamlined Sales Process</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our integrated system enables a cohesive 5-step approach to client acquisition and management
          </p>
        </div>
        
        <div className="space-y-8 max-w-3xl mx-auto">
          <div className="process-step">
            <div className="process-step-number">1</div>
            <h3 className="text-xl font-bold mb-2">Prospect Identification & Qualification</h3>
            <p className="text-muted-foreground">
              Use AI-powered scoring to identify and prioritize high-value prospects based on multiple factors, including wealth indicators, behavioral signals, and referral sources.
            </p>
          </div>
          
          <div className="process-step">
            <div className="process-step-number">2</div>
            <h3 className="text-xl font-bold mb-2">Meeting Intelligence & Analysis</h3>
            <p className="text-muted-foreground">
              Record and automatically analyze client conversations to extract insights, action items, and sentiment data to inform your approach.
            </p>
          </div>
          
          <div className="process-step">
            <div className="process-step-number">3</div>
            <h3 className="text-xl font-bold mb-2">Personalized Data Collection</h3>
            <p className="text-muted-foreground">
              Deploy smart questionnaires that adapt based on previous inputs and meeting insights to gather comprehensive client information efficiently.
            </p>
          </div>
          
          <div className="process-step">
            <div className="process-step-number">4</div>
            <h3 className="text-xl font-bold mb-2">Automated Communication</h3>
            <p className="text-muted-foreground">
              Send timely, personalized emails that integrate insights from all previous interactions, with optimal timing determined by AI analysis.
            </p>
          </div>
          
          <div className="process-step">
            <div className="process-step-number">5</div>
            <h3 className="text-xl font-bold mb-2">Performance Tracking & Optimization</h3>
            <p className="text-muted-foreground">
              Track ROI and conversion rates across your entire sales process, with AI recommendations for improving performance.
            </p>
          </div>
        </div>
        
        <div className="mt-10 text-center">
          <Button 
            variant="default" 
            size="lg" 
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            onClick={() => {
              toast.success("Demo mode activated", {
                description: "All features are fully functional in this demo version."
              });
            }}
          >
            <Play className="mr-2 h-4 w-4" />
            Start Demo Walkthrough
          </Button>
        </div>
      </div>

      {/* Demo Data Stats */}
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
    </div>
  );
};

export default AdvisorDashboard;
