
import { ConnectorHealthCheck } from "@/components/ConnectorHealthCheck";
import BookingTextFetcher from "@/components/BookingTextFetcher";
import ProspectCallPrep from "@/components/ProspectCallPrep";
import PostCallProcessor from "@/components/PostCallProcessor";
import HeroSection from "@/components/HeroSection";
import FeatureCards from "@/components/features/FeatureCards";
import IntegrationShowcase from "@/components/IntegrationShowcase";
import BenefitsGrid from "@/components/BenefitsGrid";

const Home = () => {
  return (
    <div className="container mx-auto space-y-8 pb-8">
      <HeroSection />
      
      <h1 className="text-3xl font-bold mb-6">Core Workflow Pillars</h1>
      <FeatureCards />
      
      <IntegrationShowcase />
      
      <BenefitsGrid />
      
      <h1 className="text-3xl font-bold mb-6 mt-12">Advisor Tools & Diagnostics</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="md:col-span-3">
          <ConnectorHealthCheck />
        </div>
      </div>
      
      <nav className="py-4">
        <ul className="flex space-x-4 overflow-x-auto pb-2">
          <li><a href="#data-retrieval" className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">Data Retrieval</a></li>
          <li><a href="#pre-call" className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">Pre-Call Prep</a></li>
          <li><a href="#post-call" className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">Post-Call Follow-Up</a></li>
        </ul>
      </nav>
      
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <div id="data-retrieval">
          <h2 className="text-2xl font-semibold mb-4">Data Retrieval</h2>
          <BookingTextFetcher />
        </div>
        
        <div id="pre-call">
          <h2 className="text-2xl font-semibold mb-4">Pre-Call Preparation</h2>
          <ProspectCallPrep />
        </div>
      </div>
      
      <div id="post-call">
        <h2 className="text-2xl font-semibold mb-4 mt-8">Post-Call Follow-Up</h2>
        <PostCallProcessor />
      </div>
    </div>
  );
};

export default Home;
