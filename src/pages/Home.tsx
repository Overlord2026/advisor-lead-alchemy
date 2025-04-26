
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useHousehold } from "@/hooks/useHousehold";
import { Button } from "@/components/ui/button";
import { FileText, Landmark, BookOpen, UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const { data, loading } = useHousehold();
  const navigate = useNavigate();
  
  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <p>Loading household data...</p>
    </div>
  );

  const quickActions = [
    { 
      title: "Documents", 
      description: "Upload and manage your important documents", 
      icon: FileText, 
      path: "/documents",
      color: "text-blue-500"
    },
    { 
      title: "Accounts", 
      description: "View and manage your financial accounts", 
      icon: Landmark, 
      path: "/accounts",
      color: "text-green-500"
    },
    { 
      title: "Training", 
      description: "Access financial education resources", 
      icon: BookOpen, 
      path: "/training",
      color: "text-purple-500"
    },
    { 
      title: "Onboarding", 
      description: "Complete your onboarding process", 
      icon: UserPlus, 
      path: "/onboarding",
      color: "text-orange-500"
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="border-none shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl">Welcome, {data?.name || 'Client'}</CardTitle>
          <CardDescription>Here's an overview of your financial journey.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {quickActions.map((action) => (
              <Card 
                key={action.title} 
                className="cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => navigate(action.path)}
              >
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center gap-2">
                    <div className={`rounded-full p-3 bg-muted ${action.color}`}>
                      <action.icon className="h-6 w-6" />
                    </div>
                    <h3 className="font-medium mt-2">{action.title}</h3>
                    <p className="text-sm text-muted-foreground">{action.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Recent Documents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">No recent documents</p>
              <Button variant="outline" onClick={() => navigate("/documents")}>
                <FileText className="mr-2 h-4 w-4" />
                Upload Document
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Financial Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-sm">Complete your profile to receive personalized financial insights.</p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">Update Profile</Button>
                <Button size="sm">View Recommendations</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
