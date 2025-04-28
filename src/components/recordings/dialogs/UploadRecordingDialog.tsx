
import { useState } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload } from "lucide-react";

interface UploadRecordingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpload: () => void;
}

export default function UploadRecordingDialog({ open, onOpenChange, onUpload }: UploadRecordingDialogProps) {
  const [title, setTitle] = useState("Uploaded Meeting");
  const [prospect, setProspect] = useState("");
  const [meetingType, setMeetingType] = useState("Initial Discovery");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSelectedFile(file);
  };
  
  const handleUpload = () => {
    onUpload();
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Upload Recording</DialogTitle>
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
          
          <div className="grid gap-2">
            <Label htmlFor="recording-file">Recording File</Label>
            <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center gap-2">
              <div className="bg-primary/10 p-2 rounded-full">
                <Upload className="h-5 w-5 text-primary" />
              </div>
              <p className="text-sm font-medium">Choose file or drag here</p>
              <p className="text-xs text-muted-foreground">
                Supported formats: MP3, WAV, M4A, MP4
              </p>
              <Input 
                id="recording-file" 
                type="file" 
                className="hidden" 
                accept=".mp3,.wav,.m4a,.mp4"
                onChange={handleFileChange}
              />
              <Button 
                variant="outline" 
                size="sm" 
                asChild 
                className="mt-2"
              >
                <label htmlFor="recording-file">Choose file</label>
              </Button>
              
              {selectedFile && (
                <p className="text-xs text-muted-foreground mt-2">
                  Selected: {selectedFile.name}
                </p>
              )}
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleUpload}>Upload</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
