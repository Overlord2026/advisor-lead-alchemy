
import { ConnectorHealthCheck } from "@/components/ConnectorHealthCheck";
import BookingTextFetcher from "@/components/BookingTextFetcher";

const Home = () => {
  return (
    <div className="container mx-auto p-6 space-y-8">
      <h1 className="text-2xl font-bold mb-6">System Diagnostics</h1>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Connector Health</h2>
        <ConnectorHealthCheck />
      </div>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Booking Text Fetcher</h2>
        <BookingTextFetcher />
      </div>
    </div>
  );
};

export default Home;
