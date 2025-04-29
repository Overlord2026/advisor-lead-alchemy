
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/utils/toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface CallPrepResponse {
  summaryBullets: string[];
  emailSubject: string;
  emailBody: string;
  videoScript: string;
  summary?: string;
  agenda?: string[];
  riskProfile?: string;
  wealthProfile?: string;
  recommendedProducts?: string[];
  talkingPoints?: string[];
}

const ProspectCallPrep = () => {
  const [bookingText, setBookingText] = useState<string>('');
  const [callPrepData, setCallPrepData] = useState<CallPrepResponse | null>(null);
  const [isPreparingCall, setIsPreparingCall] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>('summary');

  const prepareForCall = async () => {
    if (!bookingText) {
      toast.error("Please enter booking text first");
      return;
    }
    
    setIsPreparingCall(true);
    setError(null);
    
    try {
      const { data, error } = await supabase.functions.invoke('prospect-call-prep', {
        body: {
          bookingText
        }
      });
      
      if (error) {
        console.error('Error preparing for call:', error);
        setError(error.message || 'Failed to prepare for call');
        toast.error('Failed to prepare for call');
      } else if (data) {
        setCallPrepData(data);
        toast.success('Call preparation completed successfully');
      }
    } catch (err) {
      console.error('Exception preparing for call:', err);
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
      toast.error('An error occurred while preparing for call');
    } finally {
      setIsPreparingCall(false);
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-xl">Prospect Call Preparation</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Step 1: Enter Booking Text */}
          <div className="border rounded-md p-4">
            <h3 className="text-lg font-medium mb-4">Step 1: Enter Booking Text</h3>
            <div className="space-y-4">
              <div className="space-y-1">
                <label htmlFor="bookingText" className="text-sm font-medium">Booking Text</label>
                <Textarea 
                  id="bookingText"
                  value={bookingText}
                  onChange={(e) => setBookingText(e.target.value)}
                  rows={6}
                  className="font-mono text-xs"
                  placeholder="Enter booking text in the format: 
Invitee: John Smith
Email: john.smith@example.com
Time: April 30, 2025 at 2:00 PM EST
Goals: Retirement planning and portfolio review
Assets: $750,000"
                />
              </div>
            </div>
          </div>

          {/* Step 2: Prepare for Call */}
          <div className="border rounded-md p-4">
            <h3 className="text-lg font-medium mb-4">Step 2: Prepare for Call</h3>
            <Button 
              onClick={prepareForCall}
              disabled={!bookingText || isPreparingCall}
              className="w-full"
            >
              {isPreparingCall ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Preparing...
                </>
              ) : (
                'Prepare for Call'
              )}
            </Button>
          </div>
          
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-800 text-sm">
              {error}
            </div>
          )}

          {/* Step 3: Call Preparation Results */}
          {callPrepData && (
            <div className="border rounded-md p-4">
              <h3 className="text-lg font-medium mb-4">Call Preparation Results</h3>
              
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-4 mb-4">
                  <TabsTrigger value="summary">Summary</TabsTrigger>
                  <TabsTrigger value="email">Email</TabsTrigger>
                  <TabsTrigger value="video">Video Script</TabsTrigger>
                  <TabsTrigger value="resources">Resources</TabsTrigger>
                </TabsList>
                
                <TabsContent value="summary" className="space-y-4">
                  <h4 className="font-medium">Key Points</h4>
                  <ul className="list-disc pl-5 space-y-2">
                    {callPrepData.summaryBullets.map((bullet, index) => (
                      <li key={index}>{bullet}</li>
                    ))}
                  </ul>
                  
                  <div className="mt-4">
                    <h4 className="font-medium">Meeting Agenda</h4>
                    <ol className="list-decimal pl-5 space-y-1">
                      {callPrepData.agenda?.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ol>
                  </div>
                </TabsContent>
                
                <TabsContent value="email">
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium">Subject</h4>
                      <p className="border p-2 rounded bg-gray-50">{callPrepData.emailSubject}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium">Email Body</h4>
                      <Textarea 
                        value={callPrepData.emailBody} 
                        readOnly 
                        className="min-h-[300px]"
                      />
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="video">
                  <div>
                    <h4 className="font-medium">Video Script</h4>
                    <Textarea 
                      value={callPrepData.videoScript}
                      readOnly
                      className="min-h-[300px]"
                    />
                  </div>
                </TabsContent>
                
                <TabsContent value="resources">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium">Risk Profile</h4>
                      <p>{callPrepData.riskProfile}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium">Wealth Profile</h4>
                      <p>{callPrepData.wealthProfile}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium">Recommended Products</h4>
                      <ul className="list-disc pl-5">
                        {callPrepData.recommendedProducts?.map((product, index) => (
                          <li key={index}>{product}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium">Talking Points</h4>
                      <ul className="list-disc pl-5">
                        {callPrepData.talkingPoints?.map((point, index) => (
                          <li key={index}>{point}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="text-sm text-muted-foreground">
        This tool helps you prepare for prospect calls by analyzing booking information and generating talking points.
      </CardFooter>
    </Card>
  );
};

export default ProspectCallPrep;
