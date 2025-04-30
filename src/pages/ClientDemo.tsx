
import React from "react";
import DashboardHeader from '@/components/advisor-dashboard/DashboardHeader';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/shared/ui";
import { Link } from "react-router-dom";

const ClientDemo = () => {
  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Main Heading */}
      <DashboardHeader 
        title="Client Portal Demo" 
        subtitle="This page demonstrates how the shared header works in client mode"
      />
      
      {/* Feature overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Unified Design System</CardTitle>
            <CardDescription>Consistent branding across applications</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Our shared header component automatically adapts to both advisor and client contexts
              while maintaining consistent styling and branding.
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild variant="outline">
              <Link to="/advisor">View Advisor Mode</Link>
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Responsive Design</CardTitle>
            <CardDescription>Optimized for all devices</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              The header and layout components are fully responsive and provide optimal user experience
              on desktop, tablet, and mobile devices.
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild variant="outline">
              <Link to="/">Return to Home</Link>
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Role-Based Navigation</CardTitle>
            <CardDescription>Context-aware menu items</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Navigation items automatically adjust based on the current user context,
              showing relevant options for advisors or clients.
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="outline">Learn More</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default ClientDemo;
