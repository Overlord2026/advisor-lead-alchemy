
import { useState, useEffect, useRef } from "react";
import { X, Play, Pause, FileAudio, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Recording } from "@/types/recordings";

interface RecordingPlayerProps {
  recording: Recording;
  onClose: () => void;
}

export default function RecordingPlayer({ recording, onClose }: RecordingPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(35);
  const [currentTime, setCurrentTime] = useState({ minutes: 15, seconds: 45 });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const playbackIntervalRef = useRef<number>();
  
  useEffect(() => {
    if (canvasRef.current) {
      const waveformData = generateRandomWaveformData(100);
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        drawWaveform(ctx, waveformData);
      }
    }
    
    return () => {
      if (playbackIntervalRef.current) {
        window.clearInterval(playbackIntervalRef.current);
      }
    };
  }, []);
  
  const togglePlayback = () => {
    if (isPlaying) {
      if (playbackIntervalRef.current) {
        window.clearInterval(playbackIntervalRef.current);
      }
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      simulateAudioPlayback();
    }
  };
  
  const generateRandomWaveformData = (length: number): number[] => {
    const data: number[] = [];
    for (let i = 0; i < length; i++) {
      data.push(Math.random() * 0.8 + 0.1); // Values between 0.1 and 0.9
    }
    return data;
  };
  
  const drawWaveform = (ctx: CanvasRenderingContext2D, data: number[]) => {
    const width = ctx.canvas.width;
    const height = ctx.canvas.height;
    const barWidth = width / data.length;
    
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = '#4a6cf7';
    
    for (let i = 0; i < data.length; i++) {
      const barHeight = data[i] * height;
      const x = i * barWidth;
      const y = (height - barHeight) / 2;
      ctx.fillRect(x, y, barWidth - 1, barHeight);
    }
  };
  
  const simulateAudioPlayback = () => {
    playbackIntervalRef.current = window.setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          if (playbackIntervalRef.current) {
            window.clearInterval(playbackIntervalRef.current);
          }
          setIsPlaying(false);
          return 100;
        }
        return prev + 0.5;
      });
      
      setCurrentTime(prev => {
        let newSeconds = prev.seconds + 1;
        let newMinutes = prev.minutes;
        
        if (newSeconds >= 60) {
          newSeconds = 0;
          newMinutes++;
        }
        
        return { minutes: newMinutes, seconds: newSeconds };
      });
      
      if (canvasRef.current) {
        const waveformData = generateRandomWaveformData(100);
        const ctx = canvasRef.current.getContext('2d');
        if (ctx) {
          drawWaveform(ctx, waveformData);
        }
      }
    }, 1000);
  };
  
  const formatTime = (minutes: number, seconds: number) => {
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };
  
  return (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle>{recording.title}</CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="audio" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="audio">Audio</TabsTrigger>
            <TabsTrigger value="transcript">Transcript</TabsTrigger>
          </TabsList>
          
          <TabsContent value="audio" className="space-y-4">
            <div className="bg-muted rounded-md p-4">
              <canvas 
                ref={canvasRef} 
                className="w-full h-24 rounded-md"
                width="800"
                height="96"
              ></canvas>
              
              <div className="mt-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    {formatTime(currentTime.minutes, currentTime.seconds)}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {recording.duration}
                  </span>
                </div>
                
                <div className="mt-1 w-full bg-muted-foreground/20 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-primary h-full rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="mt-4 flex justify-center">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-12 w-12 rounded-full"
                  onClick={togglePlayback}
                >
                  {isPlaying ? (
                    <Pause className="h-6 w-6" />
                  ) : (
                    <Play className="h-6 w-6" />
                  )}
                </Button>
              </div>
              
              <div className="mt-6">
                <h3 className="text-sm font-medium">Details</h3>
                <div className="mt-2 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Prospect:</span>
                    <span className="text-sm font-medium">{recording.prospectName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Type:</span>
                    <span className="text-sm font-medium">{recording.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Date:</span>
                    <span className="text-sm font-medium">{recording.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Duration:</span>
                    <span className="text-sm font-medium">{recording.duration}</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="transcript">
            <div className="bg-muted rounded-md p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  <h3 className="font-medium">AI-Generated Transcript</h3>
                </div>
                <Button variant="outline" size="sm">Download</Button>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm">Advisor</span>
                    <span className="text-xs text-muted-foreground">00:01:23</span>
                  </div>
                  <p className="text-sm">
                    Thank you for coming in today. I'd like to learn more about your financial goals and what you're hoping to achieve in the next 5 to 10 years.
                  </p>
                </div>
                
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm">{recording.prospectName}</span>
                    <span className="text-xs text-muted-foreground">00:01:45</span>
                  </div>
                  <p className="text-sm">
                    Well, my main concern is retirement planning. I'm 52 now and ideally would like to retire at 60. I'm not sure if my current savings and investments will be sufficient for that timeline.
                  </p>
                </div>
                
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm">Advisor</span>
                    <span className="text-xs text-muted-foreground">00:02:10</span>
                  </div>
                  <p className="text-sm">
                    That's a great starting point. Can you tell me more about your current retirement accounts and other investments you have?
                  </p>
                </div>
                
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm">{recording.prospectName}</span>
                    <span className="text-xs text-muted-foreground">00:02:30</span>
                  </div>
                  <p className="text-sm">
                    I have a 401(k) through my employer with about $420,000. I also have a Roth IRA with approximately $150,000 and some individual stocks worth around $200,000.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
