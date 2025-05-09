
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Clock, ShieldCheck, Sparkles } from "lucide-react";

const BenefitsGrid = () => {
  const benefits = [
    {
      icon: <Check className="h-6 w-6 text-primary" />,
      title: "Streamlined prospect management",
      descriptions: [
        "Track and manage prospects effortlessly",
        "Never let a valuable lead slip through the cracks"
      ]
    },
    {
      icon: <Clock className="h-6 w-6 text-primary" />,
      title: "Optimize your sales process",
      descriptions: [
        "Reduce admin work by 85%",
        "Focus on building client relationships, not paperwork"
      ]
    },
    {
      icon: <ShieldCheck className="h-6 w-6 text-primary" />,
      title: "Maintain compliance",
      descriptions: [
        "Audit-friendly prospect tracking",
        "You control client data and retention"
      ]
    },
    {
      icon: <Sparkles className="h-6 w-6 text-primary" />,
      title: "Future-proof your advisory practice",
      descriptions: [
        "Advanced analytics for pipeline optimization",
        "Regular new features based on advisor feedback"
      ]
    }
  ];

  return (
    <section className="py-12">
      <h2 className="text-3xl font-bold text-center mb-10">Advisor advantages</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {benefits.map((benefit, index) => (
          <Card key={index} className="border border-border bg-card hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center gap-4 pb-2">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                {benefit.icon}
              </div>
              <CardTitle className="text-xl">{benefit.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {benefit.descriptions.map((description, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <div className="min-w-4 mt-1">
                      <Check className="h-4 w-4 text-primary" />
                    </div>
                    <CardDescription className="text-base">{description}</CardDescription>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default BenefitsGrid;
