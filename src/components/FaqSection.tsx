
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FaqSection = () => {
  const faqItems = [
    {
      question: "Can Advisor Lead Alchemy integrate with my existing CRM?",
      answer: "Yes—we offer seamless integration with most popular CRM platforms used by financial advisors."
    },
    {
      question: "How do I manage my prospect pipeline?",
      answer: "Our intuitive dashboard gives you full visibility of your pipeline with drag-and-drop management."
    },
    {
      question: "Can I customize the prospect stages?",
      answer: "Yes, you can fully customize the stages to match your firm's unique sales process."
    },
    {
      question: "What about security & compliance?",
      answer: "We provide end-to-end encryption, SOC-2 audited systems, and full retention controls to meet regulatory requirements."
    }
  ];

  return (
    <section className="py-12 mb-8">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10">Frequently Asked Questions</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
          {faqItems.map((item, index) => (
            <Accordion type="single" collapsible key={index}>
              <AccordionItem value={`item-${index}`} className="border-b-0">
                <AccordionTrigger className="text-lg font-medium hover:no-underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
