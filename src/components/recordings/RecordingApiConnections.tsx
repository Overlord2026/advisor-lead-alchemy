
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Video, Mic, Check, X } from "lucide-react";
import { RecordingSource } from "@/types/recordings";
import { connectToService, disconnectFromService, getRecordingSources } from "@/utils/recording-api";

export default function RecordingApiConnections() {
  const [sources, setSources] = useState<RecordingSource[]>(getRecordingSources());
  const [connecting, setConnecting] = useState<string | null>(null);
  const [disconnecting, setDisconnecting] = useState<string | null>(null);
  
  const handleConnect = async (sourceId: string) => {
    setConnecting(sourceId);
    try {
      const success = await connectToService(sourceId);
      if (success) {
        setSources(current => 
          current.map(source => 
            source.id === sourceId 
              ? { ...source, isConnected: true, lastSynced: new Date().toISOString() } 
              : source
          )
        );
        toast.success(`Connected to ${sources.find(s => s.id === sourceId)?.name}`);
      } else {
        toast.error(`Failed to connect to ${sources.find(s => s.id === sourceId)?.name}`);
      }
    } catch (error) {
      toast.error(`Error connecting to service: ${error}`);
    } finally {
      setConnecting(null);
    }
  };
  
  const handleDisconnect = async (sourceId: string) => {
    setDisconnecting(sourceId);
    try {
      const success = await disconnectFromService(sourceId);
      if (success) {
        setSources(current => 
          current.map(source => 
            source.id === sourceId 
              ? { ...source, isConnected: false, lastSynced: undefined } 
              : source
          )
        );
        toast.success(`Disconnected from ${sources.find(s => s.id === sourceId)?.name}`);
      } else {
        toast.error(`Failed to disconnect from ${sources.find(s => s.id === sourceId)?.name}`);
      }
    } catch (error) {
      toast.error(`Error disconnecting from service: ${error}`);
    } finally {
      setDisconnecting(null);
    }
  };
  
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'Video': return <Video className="h-5 w-5 text-primary" />;
      case 'Mic': return <Mic className="h-5 w-5 text-primary" />;
      default: return <Video className="h-5 w-5 text-primary" />;
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recording Integrations</CardTitle>
        <CardDescription>
          Connect to recording services to capture meetings with prospects
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {sources.map((source) => (
            <div 
              key={source.id} 
              className="flex items-center justify-between p-4 border rounded-lg"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  {getIconComponent(source.icon)}
                </div>
                <div>
                  <h3 className="font-medium">{source.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {source.isConnected 
                      ? source.lastSynced 
                        ? `Last synced: ${new Date(source.lastSynced).toLocaleDateString()}` 
                        : "Connected" 
                      : "Not connected"}
                  </p>
                </div>
              </div>
              <div>
                {source.isConnected ? (
                  <Button 
                    variant="outline" 
                    onClick={() => handleDisconnect(source.id)} 
                    disabled={disconnecting === source.id}
                  >
                    {disconnecting === source.id ? (
                      <>Disconnecting...</>
                    ) : (
                      <>
                        <X className="mr-2 h-4 w-4" />
                        Disconnect
                      </>
                    )}
                  </Button>
                ) : (
                  <Button 
                    variant="outline" 
                    onClick={() => handleConnect(source.id)} 
                    disabled={connecting === source.id}
                  >
                    {connecting === source.id ? (
                      <>Connecting...</>
                    ) : (
                      <>
                        <Check className="mr-2 h-4 w-4" />
                        Connect
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
