
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen } from "lucide-react";

const Training = () => {
  const trainingItems = [
    {
      id: 1,
      title: "Financial Planning Basics",
      description: "Learn the fundamentals of financial planning and investment strategies.",
      duration: "20 min"
    },
    {
      id: 2,
      title: "Retirement Planning",
      description: "Understand how to prepare for retirement and maximize your savings.",
      duration: "15 min"
    },
    {
      id: 3,
      title: "Tax Optimization Strategies",
      description: "Discover ways to minimize tax liability and optimize your financial portfolio.",
      duration: "25 min"
    }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Training Resources</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {trainingItems.map((item) => (
              <Card key={item.id} className="cursor-pointer hover:bg-muted/50 transition-colors">
                <CardContent className="p-4">
                  <div className="flex gap-3 items-start">
                    <BookOpen className="h-5 w-5 text-blue-500 mt-0.5" />
                    <div>
                      <h3 className="font-medium">{item.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                      <div className="mt-3 text-xs text-muted-foreground flex items-center">
                        <span>Duration: {item.duration}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Training;
