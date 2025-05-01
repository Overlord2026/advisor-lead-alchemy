
import { useState } from "react";
import { toast } from "sonner";
import { Upload, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RecordingPlayer from "./RecordingPlayer";
import StartMeetingDialog from "./dialogs/StartMeetingDialog";
import StartRecordingDialog from "./dialogs/StartRecordingDialog";
import GetAppDialog from "./dialogs/GetAppDialog";
import UploadRecordingDialog from "./dialogs/UploadRecordingDialog";
import RecordingApiConnections from "./RecordingApiConnections";
import RecordingMethods from "./RecordingMethods";
import RecordingsTable from "./RecordingsTable";
import RecordingSettings from "./RecordingSettings";
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
    initial: "JD",
    source: "google-meet"
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
    initial: "MS",
    source: "zoom"
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
    initial: "RJ",
    source: "twilio"
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
    initial: "AW",
    source: "browser"
  },
];

export default function RecordingsTab() {
  const [recordings] = useState<Recording[]>(mockRecordings);
  const [selectedRecording, setSelectedRecording] = useState<Recording | null>(null);
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("recordings");
  
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
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="recordings">Recordings</TabsTrigger>
          <TabsTrigger value="integrations">API Integrations</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="recordings">
          {isPlayerOpen && selectedRecording && (
            <RecordingPlayer 
              recording={selectedRecording} 
              onClose={closeRecordingPlayer} 
            />
          )}
          
          <div className="grid gap-6">
            <RecordingMethods 
              onOpenMeetingDialog={() => setIsMeetingDialogOpen(true)}
              onOpenRecordingDialog={() => setIsRecordingDialogOpen(true)}
              onOpenAppDialog={() => setIsAppDialogOpen(true)}
              onOpenUploadDialog={() => setIsUploadDialogOpen(true)}
            />
            
            <RecordingsTable 
              recordings={recordings}
              onPlayRecording={openRecordingPlayer}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="integrations">
          <RecordingApiConnections />
        </TabsContent>
        
        <TabsContent value="settings">
          <RecordingSettings />
        </TabsContent>
      </Tabs>

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
