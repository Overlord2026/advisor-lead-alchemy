
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
      question: "Can Lovable write notes in my style?",
      answer: "Yes—train once, then AI mimics your exact voice and formatting."
    },
    {
      question: "How do I choose which meetings get captured?",
      answer: "Toggle auto-capture by default or on a per-meeting basis."
    },
    {
      question: "How does it know where to post notes?",
      answer: "Map meeting types to CRM fields at setup; all notes are editable before sync."
    },
    {
      question: "What about security & compliance?",
      answer: "End-to-end encryption, SOC-2 audited, full retention controls in your hands."
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
