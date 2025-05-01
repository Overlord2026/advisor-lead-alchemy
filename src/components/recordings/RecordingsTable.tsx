
import { Search, Filter, Play, Video, Mic, Upload, FileAudio } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { customBadgeVariants } from "@/shared/ui";
import { 
  Table, TableBody, TableCell, TableHead, 
  TableHeader, TableRow 
} from "@/components/ui/table";
import { Recording } from "@/types/recordings";

interface RecordingsTableProps {
  recordings: Recording[];
  onPlayRecording: (recording: Recording) => void;
}

const RecordingsTable = ({ recordings, onPlayRecording }: RecordingsTableProps) => {
  const getSourceIcon = (source?: string) => {
    switch (source) {
      case "google-meet":
      case "zoom":
      case "amazon-chime":
        return <Video className="h-4 w-4 text-blue-500" />;
      case "twilio":
      case "browser":
        return <Mic className="h-4 w-4 text-green-500" />;
      case "upload":
        return <Upload className="h-4 w-4 text-purple-500" />;
      default:
        return <FileAudio className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
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
              <TableHead>Source</TableHead>
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
                  <div className="flex items-center">
                    {getSourceIcon(recording.source)}
                    <span className="ml-2 text-xs text-muted-foreground capitalize">
                      {recording.source || "Unknown"}
                    </span>
                  </div>
                </TableCell>
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
                  <Badge 
                    className={recording.status?.includes("Complete") ? customBadgeVariants.success : ""}
                    variant="outline"
                  >
                    {recording.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button 
                      size="icon" 
                      variant="ghost" 
                      onClick={() => onPlayRecording(recording)}
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
  );
};

export default RecordingsTable;
