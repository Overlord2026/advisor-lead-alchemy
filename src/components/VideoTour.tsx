
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

const VideoTour = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  
  const handlePlayVideo = () => {
    setIsPlaying(true);
  };
  
  return (
    <section className="py-12 bg-card rounded-lg border border-border mb-8">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">See Advisor Lead Alchemy in action</h2>
          <p className="text-xl text-muted-foreground">Watch our 60-second walkthrough to see how easy it is.</p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          {isPlaying ? (
            // Video iframe placeholder - would be replaced with actual video embed
            <div className="relative pt-[56.25%] bg-black rounded-lg overflow-hidden">
              <iframe 
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1" 
                title="Advisor Lead Alchemy Demo Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : (
            // Video thumbnail with play button
            <div 
              className="relative rounded-lg overflow-hidden cursor-pointer bg-gray-800 pt-[56.25%]"
              onClick={handlePlayVideo}
            >
              {/* This is a placeholder for the video thumbnail */}
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-700">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Button 
                    size="lg" 
                    className="rounded-full w-16 h-16 flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
                    onClick={handlePlayVideo}
                  >
                    <Play className="h-8 w-8 ml-1" />
                  </Button>
                </div>
                <div className="absolute bottom-4 left-4 right-4 z-10">
                  <p className="text-white font-medium text-lg">See how Advisor Lead Alchemy transforms your prospecting workflow</p>
                  <p className="text-gray-300">60-second overview</p>
                </div>
              </div>
            </div>
          )}
          
          {!isPlaying && (
            <div className="flex justify-center mt-6">
              <Button 
                size="lg"
                className="font-medium"
                onClick={handlePlayVideo}
              >
                Watch Demo
                <Play className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default VideoTour;
