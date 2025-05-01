
import React from 'react';
import { Mic, Calendar, ClipboardList, Mail } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const QuickActions = () => {
  const navigate = useNavigate();
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Button 
            variant="outline" 
            className="flex flex-col items-center justify-center h-24 hover:bg-primary hover:text-white"
            onClick={() => navigate("/advisor/recordings")}
          >
            <Mic className="h-6 w-6 mb-1" />
            <span>Record Meeting</span>
          </Button>
          
          <Button 
            variant="outline" 
            className="flex flex-col items-center justify-center h-24 hover:bg-blue-600 hover:text-white"
            onClick={() => navigate("/advisor/calendar")}
          >
            <Calendar className="h-6 w-6 mb-1" />
            <span>Schedule Meeting</span>
          </Button>
          
          <Button 
            variant="outline" 
            className="flex flex-col items-center justify-center h-24 hover:bg-green-600 hover:text-white"
            onClick={() => navigate("/advisor/questionnaires")}
          >
            <ClipboardList className="h-6 w-6 mb-1" />
            <span>Send Questionnaire</span>
          </Button>
          
          <Button 
            variant="outline" 
            className="flex flex-col items-center justify-center h-24 hover:bg-teal-600 hover:text-white"
            onClick={() => navigate("/advisor/templates")}
          >
            <Mail className="h-6 w-6 mb-1" />
            <span>Create Email</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
