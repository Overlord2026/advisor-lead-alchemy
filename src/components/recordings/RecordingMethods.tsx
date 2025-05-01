
import { Video, Mic, Upload, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";

interface RecordingMethodsProps {
  onOpenMeetingDialog: () => void;
  onOpenRecordingDialog: () => void;
  onOpenAppDialog: () => void;
  onOpenUploadDialog: () => void;
}

const RecordingMethods = ({
  onOpenMeetingDialog,
  onOpenRecordingDialog,
  onOpenAppDialog,
  onOpenUploadDialog
}: RecordingMethodsProps) => {
  return (
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
          <Button size="sm" variant="secondary" onClick={onOpenMeetingDialog}>
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
          <Button size="sm" variant="secondary" onClick={onOpenRecordingDialog}>
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
          <Button size="sm" variant="secondary" onClick={onOpenAppDialog}>
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
          <Button size="sm" variant="secondary" onClick={onOpenUploadDialog}>
            Upload File
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RecordingMethods;
