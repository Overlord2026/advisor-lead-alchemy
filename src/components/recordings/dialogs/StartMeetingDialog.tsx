
import { useState } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface StartMeetingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onStartMeeting: () => void;
}

export default function StartMeetingDialog({ open, onOpenChange, onStartMeeting }: StartMeetingDialogProps) {
  const [title, setTitle] = useState("Meeting with New Prospect");
  const [prospect, setProspect] = useState("");
  const [meetingType, setMeetingType] = useState("Initial Discovery");
  
  const handleStartMeeting = () => {
    onStartMeeting();
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
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
          
          <p className="text-sm text-muted-foreground">
            This will start a Google Meet session and automatically record the meeting.
          </p>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleStartMeeting}>Start Meeting</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
