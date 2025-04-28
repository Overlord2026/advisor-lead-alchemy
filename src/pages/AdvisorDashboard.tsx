import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Users, FileText, Calendar, Mail, BarChart, 
  ArrowRight, UserPlus, Search, ChartBar
} from "lucide-react";
import ROITracker from "@/components/roi-tracker/ROITracker";

const AdvisorDashboard = () => {
  const navigate = useNavigate();
  
  const { data: userRole, isLoading } = useQuery({
    queryKey: ['userRole'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;
      
      const { data } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id)
        .eq('role', 'advisor')
        .single();
      
      return data?.role;
    },
  });

  useEffect(() => {
    if (!isLoading && userRole !== 'advisor') {
      navigate('/');
    }
  }, [userRole, isLoading, navigate]);

  if (isLoading) {
    return <Skeleton className="w-full h-48" />;
  }

  if (userRole !== 'advisor') {
    return (
      <Alert variant="destructive">
        <AlertDescription>
          You don't have permission to access this page.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold">Advisor Dashboard</h1>
        <p className="text-muted-foreground">
          A comprehensive platform to streamline your entire sales workflow from lead generation to client onboarding.
        </p>
      </div>

      <Tabs defaultValue="dashboard" className="w-full">
        <TabsList className="grid grid-cols-5 mb-8">
          <TabsTrigger value="dashboard">Overview</TabsTrigger>
          <TabsTrigger value="prospects">Prospects</TabsTrigger>
          <TabsTrigger value="meetings">Meetings</TabsTrigger>
          <TabsTrigger value="questionnaires">Questionnaires</TabsTrigger>
          <TabsTrigger value="roi">ROI Tracker</TabsTrigger>
        </TabsList>
        
        <TabsContent value="dashboard">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <DashboardCard 
              title="Prospect Dashboard"
              description="Track your prospect pipeline with detailed profiles and status tracking."
              icon={<Users className="h-5 w-5" />}
              metrics="23 active prospects"
              ctaText="View All Prospects"
            />
            
            <DashboardCard 
              title="Meeting Recordings"
              description="Record, transcribe, and analyze client meetings with AI-powered insights."
              icon={<Calendar className="h-5 w-5" />}
              metrics="5 upcoming meetings"
              ctaText="Schedule Meeting"
              enhancedLabel="AI Enhanced"
            />
            
            <DashboardCard 
              title="Questionnaires"
              description="Create, send, and analyze client questionnaires with intelligent insights."
              icon={<FileText className="h-5 w-5" />}
              metrics="12 pending responses"
              ctaText="Create Questionnaire"
              enhancedLabel="AI Enhanced"
            />
            
            <DashboardCard 
              title="Email Templates"
              description="Create and manage personalized email templates with AI-powered suggestions."
              icon={<Mail className="h-5 w-5" />}
              metrics="8 templates available"
              ctaText="Manage Templates"
              enhancedLabel="AI Enhanced"
            />
            
            <DashboardCard 
              title="ROI Tracker"
              description="Track and analyze the return on investment for marketing and sales activities."
              icon={<ChartBar className="h-5 w-5" />}
              metrics="+15% MoM growth"
              ctaText="View Analytics"
              enhancedLabel="AI Enhanced"
            />
            
            <Card className="border-dashed border-2 flex flex-col items-center justify-center p-6">
              <div className="rounded-full bg-muted p-3 mb-4">
                <UserPlus className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-center">Add New Feature</h3>
              <p className="text-sm text-muted-foreground text-center mt-2">
                Customize your dashboard with additional features
              </p>
              <Button variant="outline" size="sm" className="mt-4">
                Explore Features
              </Button>
            </Card>
          </div>

          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Streamlined Sales Process</CardTitle>
              <CardDescription>
                Our integrated system automates every step of your sales process, from lead generation to client onboarding.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row justify-between gap-4 md:gap-8">
                <SalesProcessStep 
                  number={1}
                  title="Lead Generation"
                  description="Facebook ad integration and appointment booking"
                />
                <SalesProcessStep 
                  number={2}
                  title="Prospect Verification"
                  description="Background and financial verification"
                />
                <SalesProcessStep 
                  number={3}
                  title="Meeting Recording"
                  description="Multi-channel recording and AI analysis"
                />
                <SalesProcessStep 
                  number={4}
                  title="Questionnaire Processing"
                  description="Digital delivery and intelligent analysis"
                />
                <SalesProcessStep 
                  number={5}
                  title="Client Onboarding"
                  description="Comprehensive profiles and follow-up"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="prospects">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Prospect Pipeline</span>
                <Button variant="outline" size="sm" className="ml-auto">
                  <UserPlus className="mr-2 h-4 w-4" />
                  Add Prospect
                </Button>
              </CardTitle>
              <CardDescription>
                Comprehensive view of your prospect pipeline with status tracking
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div className="flex items-center justify-between border-b pb-4">
                  <div className="flex-1">
                    <h3 className="font-medium">John Doe</h3>
                    <p className="text-sm text-muted-foreground">Financial Advisor referral</p>
                  </div>
                  <div className="flex-1 text-center">
                    <span className="text-sm font-medium">Contact Status</span>
                    <p className="text-sm text-muted-foreground">Initial Meeting Scheduled</p>
                  </div>
                  <div className="flex-1 text-center">
                    <span className="text-sm font-medium">Est. Value</span>
                    <p className="text-sm text-muted-foreground">$2.5M AUM</p>
                  </div>
                  <div className="flex justify-end">
                    <Button variant="ghost" size="sm">
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between border-b pb-4">
                  <div className="flex-1">
                    <h3 className="font-medium">Jane Smith</h3>
                    <p className="text-sm text-muted-foreground">Website inquiry</p>
                  </div>
                  <div className="flex-1 text-center">
                    <span className="text-sm font-medium">Contact Status</span>
                    <p className="text-sm text-muted-foreground">Needs Follow-up</p>
                  </div>
                  <div className="flex-1 text-center">
                    <span className="text-sm font-medium">Est. Value</span>
                    <p className="text-sm text-muted-foreground">$1.2M AUM</p>
                  </div>
                  <div className="flex justify-end">
                    <Button variant="ghost" size="sm">
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between border-b pb-4">
                  <div className="flex-1">
                    <h3 className="font-medium">Michael Johnson</h3>
                    <p className="text-sm text-muted-foreground">Client referral</p>
                  </div>
                  <div className="flex-1 text-center">
                    <span className="text-sm font-medium">Contact Status</span>
                    <p className="text-sm text-muted-foreground">Proposal Sent</p>
                  </div>
                  <div className="flex-1 text-center">
                    <span className="text-sm font-medium">Est. Value</span>
                    <p className="text-sm text-muted-foreground">$4.8M AUM</p>
                  </div>
                  <div className="flex justify-end">
                    <Button variant="ghost" size="sm">
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Previous</Button>
              <Button>Next</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="meetings" className="h-full space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Meetings</CardTitle>
                <CardDescription>Your scheduled client meetings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b pb-3">
                    <div>
                      <h3 className="font-medium">John Doe</h3>
                      <p className="text-sm text-muted-foreground">Initial Consultation</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">Tomorrow</p>
                      <p className="text-sm text-muted-foreground">10:00 AM</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center border-b pb-3">
                    <div>
                      <h3 className="font-medium">Jane Smith</h3>
                      <p className="text-sm text-muted-foreground">Portfolio Review</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">May 2, 2025</p>
                      <p className="text-sm text-muted-foreground">2:30 PM</p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <Calendar className="mr-2 h-4 w-4" />
                  Schedule Meeting
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Recent Recordings</CardTitle>
                <CardDescription>AI analyzed meeting recordings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b pb-3">
                    <div>
                      <h3 className="font-medium">Michael Johnson</h3>
                      <p className="text-sm text-muted-foreground">Investment Strategy</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">April 24, 2025</p>
                      <Button variant="ghost" size="sm">
                        <FileText className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex justify-between items-center border-b pb-3">
                    <div>
                      <h3 className="font-medium">Sarah Williams</h3>
                      <p className="text-sm text-muted-foreground">Retirement Planning</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">April 21, 2025</p>
                      <Button variant="ghost" size="sm">
                        <FileText className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View All Recordings
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="questionnaires">
          <Card>
            <CardHeader>
              <CardTitle>Client Questionnaires</CardTitle>
              <CardDescription>Create, send, and analyze client questionnaires</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b pb-4">
                  <div className="flex-1">
                    <h3 className="font-medium">Financial Goals Assessment</h3>
                    <p className="text-sm text-muted-foreground">15 questions</p>
                  </div>
                  <div className="flex-1 text-center">
                    <span className="text-sm font-medium">Response Rate</span>
                    <p className="text-sm text-muted-foreground">85%</p>
                  </div>
                  <div className="flex justify-end">
                    <Button variant="outline" size="sm">Send</Button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between border-b pb-4">
                  <div className="flex-1">
                    <h3 className="font-medium">Risk Tolerance Survey</h3>
                    <p className="text-sm text-muted-foreground">10 questions</p>
                  </div>
                  <div className="flex-1 text-center">
                    <span className="text-sm font-medium">Response Rate</span>
                    <p className="text-sm text-muted-foreground">92%</p>
                  </div>
                  <div className="flex justify-end">
                    <Button variant="outline" size="sm">Send</Button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between border-b pb-4">
                  <div className="flex-1">
                    <h3 className="font-medium">Retirement Planning</h3>
                    <p className="text-sm text-muted-foreground">12 questions</p>
                  </div>
                  <div className="flex-1 text-center">
                    <span className="text-sm font-medium">Response Rate</span>
                    <p className="text-sm text-muted-foreground">78%</p>
                  </div>
                  <div className="flex justify-end">
                    <Button variant="outline" size="sm">Send</Button>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">
                <FileText className="mr-2 h-4 w-4" />
                Import Template
              </Button>
              <Button>
                <UserPlus className="mr-2 h-4 w-4" />
                Create New
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="roi">
          <ROITracker />
        </TabsContent>
      </Tabs>
    </div>
  );
};

const DashboardCard = ({ 
  title, 
  description, 
  icon, 
  metrics, 
  ctaText, 
  enhancedLabel 
}: { 
  title: string;
  description: string;
  icon: React.ReactNode;
  metrics: string;
  ctaText: string;
  enhancedLabel?: string;
}) => (
  <Card>
    <CardHeader className="pb-2">
      <div className="flex items-center justify-between">
        <div className="bg-primary/10 p-2 rounded-full">
          {icon}
        </div>
        {enhancedLabel && (
          <div className="px-2 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-medium">
            {enhancedLabel}
          </div>
        )}
      </div>
      <CardTitle className="mt-3">{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
    <CardContent>
      <p className="text-sm font-medium">{metrics}</p>
    </CardContent>
    <CardFooter>
      <Button variant="outline" size="sm" className="w-full">
        {ctaText}
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </CardFooter>
  </Card>
);

const SalesProcessStep = ({ 
  number, 
  title, 
  description 
}: { 
  number: number;
  title: string;
  description: string;
}) => (
  <div className="flex flex-col items-center text-center">
    <div className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center font-bold mb-2">
      {number}
    </div>
    <h3 className="font-medium">{title}</h3>
    <p className="text-xs text-muted-foreground mt-1 max-w-[150px]">{description}</p>
  </div>
);

export default AdvisorDashboard;
