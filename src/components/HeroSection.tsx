
import { Button } from "@/components/ui/button";
import { Mail, ArrowRight } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="py-12 md:py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Cut meeting admin work by 90%—literally.
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground">
                Lovable is the only AI meeting assistant built exclusively for financial advisors. From prep to post-call tasks, we connect with your entire tech stack.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="font-medium">
                Try Lovable Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="font-medium">
                See a Live Demo
              </Button>
            </div>
          </div>
          
          {/* Visual Animation Placeholder */}
          <div className="relative bg-gray-100 rounded-lg border shadow-md p-6 h-[400px]">
            <div className="flex flex-col h-full justify-between">
              <div className="text-center mb-4">
                <div className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium mb-2">
                  Meeting Sources
                </div>
                <div className="flex justify-center space-x-8">
                  <div className="text-center">
                    <div className="h-10 w-10 bg-blue-100 rounded-full mx-auto mb-2 flex items-center justify-center">
                      <span className="text-blue-600 font-bold">Z</span>
                    </div>
                    <span className="text-xs">Zoom</span>
                  </div>
                  <div className="text-center">
                    <div className="h-10 w-10 bg-purple-100 rounded-full mx-auto mb-2 flex items-center justify-center">
                      <span className="text-purple-600 font-bold">T</span>
                    </div>
                    <span className="text-xs">Teams</span>
                  </div>
                  <div className="text-center">
                    <div className="h-10 w-10 bg-green-100 rounded-full mx-auto mb-2 flex items-center justify-center">
                      <span className="text-green-600 font-bold">G</span>
                    </div>
                    <span className="text-xs">Google</span>
                  </div>
                  <div className="text-center">
                    <div className="h-10 w-10 bg-orange-100 rounded-full mx-auto mb-2 flex items-center justify-center">
                      <span className="text-orange-600 font-bold">IP</span>
                    </div>
                    <span className="text-xs">In-Person</span>
                  </div>
                </div>
              </div>
              
              {/* Animated Flow (Simple Version) */}
              <div className="flex-grow flex flex-col items-center justify-center">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
                  <span className="font-bold text-primary">AI</span>
                </div>
                <div className="h-12 w-0.5 bg-gray-300 my-3 animate-pulse"></div>
                <div className="grid grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="h-12 w-12 bg-blue-50 rounded-lg mx-auto mb-2 flex items-center justify-center">
                      <Mail className="h-6 w-6 text-blue-500" />
                    </div>
                    <span className="text-xs">Email</span>
                  </div>
                  <div className="text-center">
                    <div className="h-12 w-12 bg-green-50 rounded-lg mx-auto mb-2 flex items-center justify-center">
                      <span className="text-green-600 font-bold">CRM</span>
                    </div>
                    <span className="text-xs">Updates</span>
                  </div>
                  <div className="text-center">
                    <div className="h-12 w-12 bg-amber-50 rounded-lg mx-auto mb-2 flex items-center justify-center">
                      <span className="text-amber-600 font-bold">✓</span>
                    </div>
                    <span className="text-xs">Tasks</span>
                  </div>
                </div>
              </div>
              
              {/* Integration Logo Bar */}
              <div>
                <div className="text-center text-sm text-muted-foreground mb-2">
                  Seamlessly connects with your tech stack
                </div>
                <div className="grid grid-cols-4 gap-2">
                  <div className="p-2 bg-gray-50 rounded text-center text-xs font-medium">Salesforce</div>
                  <div className="p-2 bg-gray-50 rounded text-center text-xs font-medium">Advyzon</div>
                  <div className="p-2 bg-gray-50 rounded text-center text-xs font-medium">GHL</div>
                  <div className="p-2 bg-gray-50 rounded text-center text-xs font-medium">Practifi</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
