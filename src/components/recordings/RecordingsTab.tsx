
import { useState } from "react";
import { toast } from "sonner";
import { 
  Play, Mic, Upload, Smartphone, Video, 
  Calendar, Clock, FileAudio, User, Tag
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
    title: "Initial Consultation",
    prospectName: "John Doe",
    prospectId: "p1",
    type: "Initial Discovery",
    date: "2025-04-25",
    duration: "45:12",
    hasAiAnalysis: true,
  },
  {
    id: "2",
    title: "Investment Strategy Discussion",
    prospectName: "Sarah Williams",
    prospectId: "p2",
    type: "Financial Planning",
    date: "2025-04-23",
    duration: "32:05",
    hasAiAnalysis: true,
  },
  {
    id: "3",
    title: "Estate Planning Follow-up",
    prospectName: "Michael Johnson",
    prospectId: "p3",
    type: "Estate Planning",
    date: "2025-04-20",
    duration: "28:47",
    hasAiAnalysis: false,
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
      {isPlayerOpen && selectedRecording && (
        <RecordingPlayer 
          recording={selectedRecording} 
          onClose={closeRecordingPlayer} 
        />
      )}
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recording Methods</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Button 
                onClick={() => setIsMeetingDialogOpen(true)} 
                variant="outline" 
                className="h-auto flex-col gap-2 p-4"
                title="Start Meeting"
              >
                <Video className="h-10 w-10 text-primary" />
                <div className="text-sm font-medium">Google Meet</div>
              </Button>
              
              <Button 
                onClick={() => setIsRecordingDialogOpen(true)} 
                variant="outline" 
                className="h-auto flex-col gap-2 p-4"
                title="Start Recording"
              >
                <Mic className="h-10 w-10 text-primary" />
                <div className="text-sm font-medium">In-Office Recording</div>
              </Button>
              
              <Button 
                onClick={() => setIsAppDialogOpen(true)} 
                variant="outline" 
                className="h-auto flex-col gap-2 p-4"
                title="Get App"
              >
                <Smartphone className="h-10 w-10 text-primary" />
                <div className="text-sm font-medium">Mobile App</div>
              </Button>
              
              <Button 
                onClick={() => setIsUploadDialogOpen(true)} 
                variant="outline" 
                className="h-auto flex-col gap-2 p-4"
                title="Upload File"
              >
                <Upload className="h-10 w-10 text-primary" />
                <div className="text-sm font-medium">Upload Recording</div>
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Recent Recordings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recordings.slice(0, 3).map((recording) => (
                <div 
                  key={recording.id}
                  className="flex items-center justify-between border-b pb-3 last:border-0"
                >
                  <div className="overflow-hidden">
                    <p className="font-medium truncate">{recording.title}</p>
                    <p className="text-sm text-muted-foreground">{recording.date}</p>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => openRecordingPlayer(recording)}
                  >
                    <Play className="h-4 w-4" />
                    <span className="sr-only">Play</span>
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>All Recordings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {recordings.map((recording) => (
                <RecordingCard
                  key={recording.id}
                  recording={recording}
                  onPlay={() => openRecordingPlayer(recording)}
                />
              ))}
            </div>
          </CardContent>
        </Card>
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
