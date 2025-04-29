
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Mic, MicOff, Play, Pause, Save, Trash } from "lucide-react";
import { startBrowserRecording, stopBrowserRecording } from "@/utils/recording-api";

interface BrowserRecorderProps {
  onSave: (blob: Blob, duration: number) => void;
  onCancel: () => void;
}

export default function BrowserRecorder({ onSave, onCancel }: BrowserRecorderProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const timerRef = useRef<number | null>(null);
  
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
      }
    };
  }, []);
  
  const startRecording = async () => {
    const started = await startBrowserRecording();
    if (started) {
      setIsRecording(true);
      setRecordingDuration(0);
      setAudioBlob(null);
      
      // Start timer
      timerRef.current = window.setInterval(() => {
        setRecordingDuration(prev => prev + 1);
      }, 1000);
      
      toast.success("Recording started");
    } else {
      toast.error("Failed to start recording. Please check microphone permissions.");
    }
  };
  
  const stopRecording = async () => {
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
    
    const blob = await stopBrowserRecording();
    setIsRecording(false);
    
    if (blob) {
      setAudioBlob(blob);
      if (audioRef.current) {
        audioRef.current.src = URL.createObjectURL(blob);
      }
      toast.success("Recording completed");
    } else {
      toast.error("Failed to capture recording");
    }
  };
  
  const togglePlayback = () => {
    if (!audioRef.current || !audioBlob) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    
    setIsPlaying(!isPlaying);
  };
  
  const handleSave = () => {
    if (audioBlob) {
      onSave(audioBlob, recordingDuration);
    }
  };
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  return (
    <div className="p-4 border rounded-lg space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">Browser Recording</h3>
        <span className="text-sm font-mono">{formatTime(recordingDuration)}</span>
      </div>
      
      <div className="flex justify-center">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
          {isRecording ? (
            <Mic className="h-8 w-8 text-red-500 animate-pulse" />
          ) : (
            <MicOff className="h-8 w-8 text-muted-foreground" />
          )}
        </div>
      </div>
      
      <audio ref={audioRef} className="hidden" onEnded={() => setIsPlaying(false)} />
      
      <div className="flex justify-center space-x-2">
        {isRecording ? (
          <Button onClick={stopRecording} variant="destructive">Stop Recording</Button>
        ) : (
          <>
            {audioBlob ? (
              <>
                <Button onClick={togglePlayback} variant="outline">
                  {isPlaying ? (
                    <Pause className="mr-2 h-4 w-4" />
                  ) : (
                    <Play className="mr-2 h-4 w-4" />
                  )}
                  {isPlaying ? "Pause" : "Play"}
                </Button>
                <Button onClick={handleSave} variant="default">
                  <Save className="mr-2 h-4 w-4" />
                  Save Recording
                </Button>
                <Button onClick={onCancel} variant="outline">
                  <Trash className="mr-2 h-4 w-4" />
                  Discard
                </Button>
              </>
            ) : (
              <Button onClick={startRecording} variant="default">
                <Mic className="mr-2 h-4 w-4" />
                Start Recording
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
