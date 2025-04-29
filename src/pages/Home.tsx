
import { ConnectorHealthCheck } from "@/components/ConnectorHealthCheck";
import BookingTextFetcher from "@/components/BookingTextFetcher";
import ProspectCallPrep from "@/components/ProspectCallPrep";
import PostCallProcessor from "@/components/PostCallProcessor";

const Home = () => {
  return (
    <div className="container mx-auto space-y-8 pb-8">
      <h1 className="text-3xl font-bold mb-6">Advisor Tools & Diagnostics</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="md:col-span-3">
          <ConnectorHealthCheck />
        </div>
      </div>
      
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Data Retrieval</h2>
          <BookingTextFetcher />
        </div>
        
        <div>
          <h2 className="text-2xl font-semibold mb-4">Pre-Call Preparation</h2>
          <ProspectCallPrep />
        </div>
      </div>
      
      <div>
        <h2 className="text-2xl font-semibold mb-4 mt-8">Post-Call Follow-Up</h2>
        <PostCallProcessor />
      </div>
    </div>
  );
};

export default Home;
