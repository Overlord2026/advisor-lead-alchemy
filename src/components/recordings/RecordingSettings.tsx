
import { Button } from "@/components/ui/button";

const RecordingSettings = () => {
  return (
    <div className="border rounded-lg p-6">
      <h2 className="text-lg font-semibold mb-4">Recording Settings</h2>
      
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-8">
          <div>
            <h3 className="text-base font-medium mb-4">Audio Processing</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-sm">Auto Transcription</h4>
                  <p className="text-sm text-muted-foreground">
                    Automatically transcribe recordings
                  </p>
                </div>
                <Button variant="outline">Configure</Button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-sm">AI Analysis</h4>
                  <p className="text-sm text-muted-foreground">
                    Generate insights from recordings
                  </p>
                </div>
                <Button variant="outline">Configure</Button>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-base font-medium mb-4">Storage Options</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-sm">Retention Period</h4>
                  <p className="text-sm text-muted-foreground">
                    How long recordings are stored
                  </p>
                </div>
                <Button variant="outline">Configure</Button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-sm">Storage Location</h4>
                  <p className="text-sm text-muted-foreground">
                    Where recordings are stored
                  </p>
                </div>
                <Button variant="outline">Configure</Button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="pt-4 border-t">
          <h3 className="text-base font-medium mb-4">Advanced Options</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-sm">Export Settings</h4>
                <p className="text-sm text-muted-foreground">
                  Configure export formats and destinations
                </p>
              </div>
              <Button variant="outline">Configure</Button>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-sm">Default Recording Source</h4>
                <p className="text-sm text-muted-foreground">
                  Set your preferred recording method
                </p>
              </div>
              <Button variant="outline">Configure</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecordingSettings;
