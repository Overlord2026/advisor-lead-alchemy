
import { useState } from "react";
import { toast } from "sonner";
import { 
  Play, Mic, Upload, Smartphone, Video, 
  Calendar, Clock, FileAudio, User, Tag, Search, Filter
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, TableBody, TableCell, TableHead, 
  TableHeader, TableRow 
} from "@/components/ui/table";
import { Badge } from "@/shared/ui";
import RecordingCard from "./RecordingCard";
import RecordingPlayer from "./RecordingPlayer";
import StartMeetingDialog from "./dialogs/StartMeetingDialog";
import StartRecordingDialog from "./dialogs/StartRecordingDialog";
import GetAppDialog from "./dialogs/GetAppDialog";
import UploadRecordingDialog from "./dialogs/UploadRecordingDialog";
import { Recording } from "@/types/recordings";

const mockRecordings: Recording[] = [
  {
    id: "1",
    title: "Initial Discovery",
    prospectName: "John Doe",
    prospectId: "p1",
    type: "Initial Discovery",
    date: "2025-04-22",
    duration: "45 min",
    hasAiAnalysis: true,
    status: "Analysis Complete",
    email: "john.doe@example.com",
    initial: "JD"
  },
  {
    id: "2",
    title: "Follow-up Discussion",
    prospectName: "Mary Smith",
    prospectId: "p2",
    type: "Follow-up Discussion",
    date: "2025-04-21",
    duration: "32 min",
    hasAiAnalysis: true,
    status: "Analysis Complete",
    email: "mary.smith@example.com",
    initial: "MS"
  },
  {
    id: "3",
    title: "Financial Planning",
    prospectName: "Robert Johnson",
    prospectId: "p3",
    type: "Financial Planning",
    date: "2025-04-20",
    duration: "58 min",
    hasAiAnalysis: false,
    status: "Processing (85%)",
    email: "robert@example.com",
    initial: "RJ"
  },
  {
    id: "4",
    title: "Estate Planning",
    prospectName: "Alice Williams",
    prospectId: "p4",
    type: "Estate Planning",
    date: "2025-04-19",
    duration: "41 min",
    hasAiAnalysis: true,
    status: "Analysis Complete",
    email: "alice.w@example.com",
    initial: "AW"
  },
];

export default function RecordingsTab() {
  const [recordings] = useState<Recording[]>(mockRecordings);
  const [selectedRecording, setSelectedRecording] = useState<Recording | null>(null);
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);
  
  const [isMeetingDialogOpen, setIsMeetingDialogOpen] = useState(false);
  const [isRecordingDialogOpen, setIsRecordingDialogOpen] = useState(false);
  const [isAppDialogOpen, setIsAppDialogOpen] = useState(false);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);

  const openRecordingPlayer = (recording: Recording) => {
    setSelectedRecording(recording);
    setIsPlayerOpen(true);
  };

  const closeRecordingPlayer = () => {
    setIsPlayerOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Meeting Recordings</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setIsUploadDialogOpen(true)}>
            <Upload className="mr-2 h-4 w-4" />
            Upload Recording
          </Button>
          <Button onClick={() => setIsMeetingDialogOpen(true)}>
            <Play className="mr-2 h-4 w-4" />
            Record New Meeting
          </Button>
        </div>
      </div>
      
      {isPlayerOpen && selectedRecording && (
        <RecordingPlayer 
          recording={selectedRecording} 
          onClose={closeRecordingPlayer} 
        />
      )}
      
      <div className="grid gap-6">
        <div>
          <h2 className="text-lg font-semibold mb-4">Recording Methods</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="border rounded-lg p-4 space-y-2">
              <div className="flex items-start">
                <Video className="h-5 w-5 mr-2 text-primary" />
                <div>
                  <h3 className="font-medium">Google Meet</h3>
                  <p className="text-sm text-muted-foreground">Record virtual meetings with automatic transcription</p>
                </div>
              </div>
              <Button size="sm" variant="secondary" onClick={() => setIsMeetingDialogOpen(true)}>
                Start Meeting
              </Button>
            </div>
            
            <div className="border rounded-lg p-4 space-y-2">
              <div className="flex items-start">
                <Mic className="h-5 w-5 mr-2 text-primary" />
                <div>
                  <h3 className="font-medium">In-Office</h3>
                  <p className="text-sm text-muted-foreground">Record in-person meetings using computer microphone</p>
                </div>
              </div>
              <Button size="sm" variant="secondary" onClick={() => setIsRecordingDialogOpen(true)}>
                Start Recording
              </Button>
            </div>
            
            <div className="border rounded-lg p-4 space-y-2">
              <div className="flex items-start">
                <Smartphone className="h-5 w-5 mr-2 text-primary" />
                <div>
                  <h3 className="font-medium">Mobile App</h3>
                  <p className="text-sm text-muted-foreground">Record meetings on-the-go with our mobile app</p>
                </div>
              </div>
              <Button size="sm" variant="secondary" onClick={() => setIsAppDialogOpen(true)}>
                Get App
              </Button>
            </div>
            
            <div className="border rounded-lg p-4 space-y-2">
              <div className="flex items-start">
                <Upload className="h-5 w-5 mr-2 text-primary" />
                <div>
                  <h3 className="font-medium">Upload</h3>
                  <p className="text-sm text-muted-foreground">Upload existing recordings from other platforms</p>
                </div>
              </div>
              <Button size="sm" variant="secondary" onClick={() => setIsUploadDialogOpen(true)}>
                Upload File
              </Button>
            </div>
          </div>
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Recent Recordings</h2>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search recordings..." 
                  className="pl-8 w-[250px]"
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
                <span className="sr-only">Filter</span>
              </Button>
            </div>
          </div>
          
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Prospect</TableHead>
                  <TableHead>Meeting Type</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recordings.map((recording) => (
                  <TableRow key={recording.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium">
                          {recording.initial}
                        </div>
                        <div>
                          <div className="font-medium">{recording.prospectName}</div>
                          <div className="text-xs text-muted-foreground">{recording.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{recording.type}</TableCell>
                    <TableCell>{recording.date}</TableCell>
                    <TableCell>{recording.duration}</TableCell>
                    <TableCell>
                      <Badge variant={recording.status.includes("Complete") ? "success" : "outline"}>
                        {recording.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button 
                          size="icon" 
                          variant="ghost" 
                          onClick={() => openRecordingPlayer(recording)}
                        >
                          <Play className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            
            <div className="flex items-center justify-center py-4 border-t">
              <div className="flex items-center gap-1">
                <Button variant="outline" size="icon" className="h-8 w-8 p-0" disabled>
                  <span className="sr-only">Previous page</span>
                  <Play className="h-4 w-4 rotate-180" />
                </Button>
                <Button variant="outline" size="sm" className="h-8 w-8 p-0 bg-primary text-primary-foreground">
                  1
                </Button>
                <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                  2
                </Button>
                <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                  3
                </Button>
                <Button variant="outline" size="icon" className="h-8 w-8 p-0">
                  <span className="sr-only">Next page</span>
                  <Play className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <StartMeetingDialog 
        open={isMeetingDialogOpen} 
        onOpenChange={setIsMeetingDialogOpen} 
        onStartMeeting={() => {
          setIsMeetingDialogOpen(false);
          toast.info("Google Meet session starting...");
        }}
      />
      
      <StartRecordingDialog 
        open={isRecordingDialogOpen} 
        onOpenChange={setIsRecordingDialogOpen} 
        onStartRecording={() => {
          setIsRecordingDialogOpen(false);
          toast.success("Recording started");
        }}
      />
      
      <GetAppDialog 
        open={isAppDialogOpen} 
        onOpenChange={setIsAppDialogOpen} 
      />
      
      <UploadRecordingDialog 
        open={isUploadDialogOpen} 
        onOpenChange={setIsUploadDialogOpen} 
        onUpload={() => {
          setIsUploadDialogOpen(false);
          toast.info("File upload started");
          setTimeout(() => toast.success("Recording uploaded successfully"), 2000);
        }}
      />
    </div>
  );
}
