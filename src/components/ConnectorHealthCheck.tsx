
import React, { useState } from 'react';
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";
import { toast } from "@/utils/toast";
import { supabase } from "@/integrations/supabase/client";

const defaultConnectors = [
  "gmail",
  "outlook",
  "googleCalendar",
  "office365Calendar",
  "advizon", 
  "salesforce",
  "wealthfront",
  "drive",
  "openai"
];

export const ConnectorHealthCheck = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<Record<string, string>>({});
  const [error, setError] = useState<string | null>(null);

  const checkConnectors = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const { data, error } = await supabase.functions.invoke('diagnostics-connectors', {
        method: 'POST',
        body: { connectors: defaultConnectors },
      });

      if (error) {
        console.error('Error checking connectors:', error);
        setError(error.message || 'Failed to check connectors');
        toast.error('Failed to check connectors');
        return;
      }

      setResults(data);
      toast.success('Connector health check complete');
    } catch (err) {
      console.error('Error checking connectors:', err);
      setError(String(err) || 'An unknown error occurred');
      toast.error('Failed to check connectors');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Connector Health Check</CardTitle>
        <CardDescription>
          Verify the status of all your integrated services and API connections
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Available Connectors</h3>
            <Button 
              onClick={checkConnectors} 
              disabled={isLoading}
              variant="outline"
            >
              {isLoading ? 'Checking...' : 'Run Health Check'}
            </Button>
          </div>
          
          <Separator />
          
          {error && (
            <div className="p-4 bg-red-50 text-red-700 rounded-md">
              {error}
            </div>
          )}
          
          {Object.keys(results).length > 0 && (
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(results).map(([connector, status]) => (
                <div key={connector} className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                  <span className="font-medium">{connector}</span>
                  <span className={status === 'OK' ? 'text-green-600' : 'text-red-600'}>
                    {status}
                  </span>
                </div>
              ))}
            </div>
          )}
          
          {!isLoading && !error && Object.keys(results).length === 0 && (
            <div className="text-center p-8 text-gray-500">
              Click "Run Health Check" to verify your connector status
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between">
        <div className="text-sm text-gray-500">
          All systems will report OK or ERROR status
        </div>
      </CardFooter>
    </Card>
  );
};
