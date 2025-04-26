
import { Card } from "@/components/ui/card";
import { useHousehold } from "@/hooks/useHousehold";

export default function Home() {
  const { data, loading } = useHousehold();
  
  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <p>Loading household data...</p>
    </div>
  );

  return (
    <div className="container mx-auto p-6">
      <Card className="p-6 shadow-md">
        <h1 className="text-2xl font-bold mb-4">Welcome, {data?.name || 'Household'}</h1>
        <p>Here's an overview of your financial journey.</p>
      </Card>
    </div>
  );
}
