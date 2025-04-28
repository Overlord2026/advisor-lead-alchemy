
import { Calendar, Clock, FileAudio, Play, User, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Recording } from "@/types/recordings";

interface RecordingCardProps {
  recording: Recording;
  onPlay: () => void;
}

export default function RecordingCard({ recording, onPlay }: RecordingCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="bg-muted p-4 relative">
        <div className="aspect-video bg-muted-foreground/20 rounded-md flex items-center justify-center">
          <FileAudio className="h-16 w-16 text-muted-foreground/50" />
          
          {recording.hasAiAnalysis && (
            <div className="absolute top-2 right-2 px-2 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-medium">
              AI Analysis
            </div>
          )}
        </div>
      </div>
      
      <CardContent className="p-4">
        <h3 className="font-medium truncate">{recording.title}</h3>
        
        <div className="mt-3 space-y-2">
          <div className="flex items-center text-sm text-muted-foreground gap-2">
            <User className="h-4 w-4" />
            <span>{recording.prospectName}</span>
          </div>
          
          <div className="flex items-center text-sm text-muted-foreground gap-2">
            <Tag className="h-4 w-4" />
            <span>{recording.type}</span>
          </div>
          
          <div className="flex items-center text-sm text-muted-foreground gap-2">
            <Calendar className="h-4 w-4" />
            <span>{recording.date}</span>
          </div>
          
          <div className="flex items-center text-sm text-muted-foreground gap-2">
            <Clock className="h-4 w-4" />
            <span>{recording.duration}</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <Button 
          variant="outline" 
          className="w-full"
          onClick={onPlay}
        >
          <Play className="mr-2 h-4 w-4" />
          Play Recording
        </Button>
      </CardFooter>
    </Card>
  );
}
