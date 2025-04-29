
import { useState } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertCircle, Video, ExternalLink } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";
import { startGoogleMeetRecording } from "@/utils/recording-api";

interface StartMeetingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onStartMeeting: () => void;
}

export default function StartMeetingDialog({ open, onOpenChange, onStartMeeting }: StartMeetingDialogProps) {
  const [title, setTitle] = useState("Meeting with New Prospect");
  const [prospect, setProspect] = useState("");
  const [meetingType, setMeetingType] = useState("Initial Discovery");
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [meetingUrl, setMeetingUrl] = useState("");
  
  const handleConnect = () => {
    setIsLoading(true);
    // Mock Google Meet API connection
    setTimeout(() => {
      setIsConnected(true);
      setMeetingUrl("https://meet.google.com/abc-defg-hij");
      setIsLoading(false);
    }, 1500);
  };
  
  const handleStartMeeting = async () => {
    if (!isConnected) {
      toast.error("Please connect to Google Meet first");
      return;
    }
    
    setIsLoading(true);
    try {
      // This would use the actual Google Meet API in a real implementation
      const success = await startGoogleMeetRecording("mock-meeting-id");
      if (success) {
        toast.success("Google Meet recording started");
        onStartMeeting();
        onOpenChange(false);
      } else {
        toast.error("Failed to start recording");
      }
    } catch (error) {
      toast.error(`Error: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Start Google Meet Recording</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="meeting-title">Meeting Title</Label>
            <Input 
              id="meeting-title" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="prospect">Prospect</Label>
            <Select value={prospect} onValueChange={setProspect}>
              <SelectTrigger id="prospect">
                <SelectValue placeholder="Select a prospect..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="john-doe">John Doe</SelectItem>
                <SelectItem value="mary-smith">Mary Smith</SelectItem>
                <SelectItem value="robert-johnson">Robert Johnson</SelectItem>
                <SelectItem value="alice-williams">Alice Williams</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="meeting-type">Meeting Type</Label>
            <Select value={meetingType} onValueChange={setMeetingType}>
              <SelectTrigger id="meeting-type">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Initial Discovery">Initial Discovery</SelectItem>
                <SelectItem value="Follow-up Discussion">Follow-up Discussion</SelectItem>
                <SelectItem value="Financial Planning">Financial Planning</SelectItem>
                <SelectItem value="Investment Strategy">Investment Strategy</SelectItem>
                <SelectItem value="Estate Planning">Estate Planning</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {!isConnected ? (
            <>
              <Alert className="bg-primary/10 border-primary/20">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  You need to connect to Google Meet to start a recorded meeting.
                </AlertDescription>
              </Alert>
              
              <Button 
                onClick={handleConnect} 
                className="w-full" 
                disabled={isLoading}
              >
                <Video className="mr-2 h-4 w-4" />
                {isLoading ? "Connecting..." : "Connect to Google Meet"}
              </Button>
            </>
          ) : (
            <>
              <div className="p-4 border rounded-lg bg-muted/40">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-sm">Google Meet URL</span>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-6 p-0" 
                    onClick={() => window.open(meetingUrl, "_blank")}
                  >
                    <ExternalLink className="h-4 w-4" />
                    <span className="sr-only">Open meeting</span>
                  </Button>
                </div>
                <code className="text-xs break-all">{meetingUrl}</code>
              </div>
              
              <p className="text-sm text-muted-foreground">
                This will start a Google Meet session and automatically record the meeting.
              </p>
            </>
          )}
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button 
            onClick={handleStartMeeting} 
            disabled={!isConnected || isLoading}
          >
            {isLoading ? "Starting..." : "Start Meeting"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
