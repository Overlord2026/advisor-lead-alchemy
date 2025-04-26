
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom";
import { Check } from "lucide-react";

const Onboarding = () => {
  const { id } = useParams();
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Welcome to Your Onboarding Process</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="bg-muted/50 p-4 rounded-md">
              <p className="font-medium">Client ID: {id || "New Client"}</p>
              <p className="text-sm text-muted-foreground mt-1">
                Your trial begins today and lasts for 30 days
              </p>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-medium text-lg">Getting Started</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Complete your profile</p>
                    <p className="text-sm text-muted-foreground">
                      Fill in your personal information and preferences
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Upload your financial documents</p>
                    <p className="text-sm text-muted-foreground">
                      Tax returns, investment statements, and insurance policies
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Link your financial accounts</p>
                    <p className="text-sm text-muted-foreground">
                      Connect your bank accounts, investments, and other financial assets
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="flex gap-3 pt-4">
              <Button>Continue Onboarding</Button>
              <Button variant="outline">Schedule a Call</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Onboarding;
