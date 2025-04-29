
import { ConnectorHealthCheck } from "@/components/ConnectorHealthCheck";

const Home = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">System Diagnostics</h1>
      <ConnectorHealthCheck />
    </div>
  );
};

export default Home;
