
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import BenefitsGrid from "@/components/BenefitsGrid";
import FaqSection from "@/components/FaqSection";
import VideoTour from "@/components/VideoTour";
import CustomerTestimonial from "@/components/CustomerTestimonial";
import ClosingCTA from "@/components/ClosingCTA";
import SharedHeader from "@/components/SharedHeader";

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <SharedHeader portalType="home" />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="container mx-auto max-w-6xl text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Advisor Platform
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto">
            Transform your prospect management and accelerate your sales process
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" className="font-medium px-8 bg-gold hover:bg-gold/90 text-navy-dark">
              <Link to="/advisor">Access Advisor Platform</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Main content sections */}
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <BenefitsGrid />
        <VideoTour />
        <CustomerTestimonial />
        <FaqSection />
        <ClosingCTA />
      </div>
    </div>
  );
};

export default Home;
