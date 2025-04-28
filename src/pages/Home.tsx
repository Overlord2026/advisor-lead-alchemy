
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChevronRight, BarChart, Mic, ClipboardList, Users, Mail } from "lucide-react";

const Home = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">Welcome to Boutique Family Office Platform</h1>
        <p className="text-muted-foreground">Streamline your client relationships with our comprehensive advisor tools</p>
      </div>

      {/* Hero Section */}
      <Card className="border-none bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950">
        <CardContent className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="flex-1 space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold">Sales Process Automation</h2>
              <p className="text-lg">
                Streamline your client acquisition workflow, from prospect verification to meeting analysis and follow-up communication.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <Button asChild size="lg">
                  <Link to="/advisor">
                    Access Advisor Dashboard
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg">
                  Learn More
                </Button>
              </div>
            </div>
            <div className="flex-shrink-0">
              <img 
                src="/placeholder.svg" 
                alt="Dashboard Preview" 
                className="rounded-lg border shadow-md w-full max-w-md" 
                width={480} 
                height={320} 
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Features Grid */}
      <h2 className="text-2xl font-bold mt-8">Key Features</h2>
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
            <p>Track prospects through your sales pipeline with verification using Catchlight.ai integration.</p>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" asChild className="gap-1">
              <Link to="/advisor/prospects">
                Explore <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="bg-indigo-100 dark:bg-indigo-900 p-2 rounded-lg">
                <Mic className="h-5 w-5 text-indigo-700 dark:text-indigo-300" />
              </div>
              <CardTitle>Meeting Intelligence</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p>Record, transcribe, and extract key insights from client meetings with AI-powered analysis.</p>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" asChild className="gap-1">
              <Link to="/advisor/recordings">
                Explore <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
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
            <p>Create, send, and analyze client questionnaires with automated comparison to meeting notes.</p>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" asChild className="gap-1">
              <Link to="/advisor/questionnaires">
                Explore <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
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
            <p>Manage personalized email templates with variable support for efficient client communication.</p>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" asChild className="gap-1">
              <Link to="/advisor/templates">
                Explore <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
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
            <p>Analyze marketing campaign performance and track conversions through your sales funnel.</p>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" asChild className="gap-1">
              <Link to="/advisor/roi">
                Explore <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="bg-teal-100 dark:bg-teal-900 p-2 rounded-lg">
                <ChevronRight className="h-5 w-5 text-teal-700 dark:text-teal-300" />
              </div>
              <CardTitle>Integrations</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p>Connect with popular tools like CRM systems, email providers, and verification services.</p>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" disabled className="gap-1">
              Coming Soon <ChevronRight className="h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      {/* CTA Section */}
      <Card className="mt-8 bg-gradient-to-br from-indigo-600 to-blue-700 text-white">
        <CardContent className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">Ready to streamline your advisory practice?</h2>
              <p className="text-indigo-100">Access our advisor portal to explore all features.</p>
            </div>
            <Button size="lg" variant="secondary" asChild>
              <Link to="/advisor">
                Go to Advisor Dashboard
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Home;
