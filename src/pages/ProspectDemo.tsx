
import React from "react";
import DashboardHeader from '@/components/advisor-dashboard/DashboardHeader';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/shared/ui";
import { Link } from "react-router-dom";

const ProspectDemo = () => {
  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Main Heading */}
      <DashboardHeader 
        title="Prospect Portal Demo" 
        subtitle="Learn more about our wealth management services"
      />
      
      {/* Feature overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Wealth Management</CardTitle>
            <CardDescription>Comprehensive financial planning</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Our boutique family office provides personalized wealth management solutions
              tailored to your unique financial situation and goals.
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild variant="outline">
              <Link to="/prospect/services">Learn More</Link>
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Estate Planning</CardTitle>
            <CardDescription>Protect and preserve your legacy</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Ensure your assets are distributed according to your wishes while
              minimizing taxes and other expenses through strategic estate planning.
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild variant="outline">
              <Link to="/prospect/services">Explore Services</Link>
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Tax Strategy</CardTitle>
            <CardDescription>Optimize your tax position</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Our tax specialists work with you to develop strategies that minimize
              your tax burden while ensuring compliance with all regulations.
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild variant="outline">
              <Link to="/prospect/resources">View Resources</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      <div className="mt-8 text-center">
        <Button asChild size="lg" className="mr-4">
          <Link to="/">Return to Home</Link>
        </Button>
      </div>
    </div>
  );
};

export default ProspectDemo;
