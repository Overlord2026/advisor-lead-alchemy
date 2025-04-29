
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/utils/toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface PostCallResponse {
  recapBullets: string[];
  emailSubject: string;
  emailBody: string;
  videoScript: string;
}

const PostCallProcessor = () => {
  const [transcriptText, setTranscriptText] = useState<string>('');
  const [postCallData, setPostCallData] = useState<PostCallResponse | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>('summary');

  const processTranscript = async () => {
    if (!transcriptText) {
      toast.error("Please enter meeting transcript first");
      return;
    }
    
    setIsProcessing(true);
    setError(null);
    
    try {
      const { data, error } = await supabase.functions.invoke('post-call', {
        body: {
          transcriptText
        }
      });
      
      if (error) {
        console.error('Error processing transcript:', error);
        setError(error.message || 'Failed to process transcript');
        toast.error('Failed to process transcript');
      } else if (data) {
        setPostCallData(data);
        toast.success('Meeting transcript processed successfully');
      }
    } catch (err) {
      console.error('Exception processing transcript:', err);
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
      toast.error('An error occurred while processing the transcript');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-xl">Post-Call Follow Up</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Step 1: Enter Meeting Transcript */}
          <div className="border rounded-md p-4">
            <h3 className="text-lg font-medium mb-4">Step 1: Enter Meeting Transcript</h3>
            <div className="space-y-4">
              <div className="space-y-1">
                <label htmlFor="transcriptText" className="text-sm font-medium">Meeting Transcript</label>
                <Textarea 
                  id="transcriptText"
                  value={transcriptText}
                  onChange={(e) => setTranscriptText(e.target.value)}
                  rows={8}
                  className="font-mono text-xs"
                  placeholder="Enter meeting transcript (e.g., 'Advisor: Hello, thank you for joining today's call...')"
                />
              </div>
            </div>
          </div>

          {/* Step 2: Process Transcript */}
          <div className="border rounded-md p-4">
            <h3 className="text-lg font-medium mb-4">Step 2: Process Transcript</h3>
            <Button 
              onClick={processTranscript}
              disabled={!transcriptText || isProcessing}
              className="w-full"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                'Process Transcript'
              )}
            </Button>
          </div>
          
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-800 text-sm">
              {error}
            </div>
          )}

          {/* Step 3: Follow-Up Results */}
          {postCallData && (
            <div className="border rounded-md p-4">
              <h3 className="text-lg font-medium mb-4">Follow-Up Materials</h3>
              
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-3 mb-4">
                  <TabsTrigger value="summary">Key Points</TabsTrigger>
                  <TabsTrigger value="email">Email</TabsTrigger>
                  <TabsTrigger value="video">Video Script</TabsTrigger>
                </TabsList>
                
                <TabsContent value="summary" className="space-y-4">
                  <h4 className="font-medium">Key Points & Next Steps</h4>
                  <ul className="list-disc pl-5 space-y-2">
                    {postCallData.recapBullets.map((bullet, index) => (
                      <li key={index}>{bullet}</li>
                    ))}
                  </ul>
                </TabsContent>
                
                <TabsContent value="email">
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium">Subject</h4>
                      <p className="border p-2 rounded bg-gray-50">{postCallData.emailSubject}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium">Email Body</h4>
                      <Textarea 
                        value={postCallData.emailBody} 
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
                      value={postCallData.videoScript}
                      readOnly
                      className="min-h-[300px]"
                    />
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="text-sm text-muted-foreground">
        This tool helps you create follow-up materials based on meeting transcripts.
      </CardFooter>
    </Card>
  );
};

export default PostCallProcessor;
