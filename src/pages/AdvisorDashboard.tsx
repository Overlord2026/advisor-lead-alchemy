
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";

const AdvisorDashboard = () => {
  const navigate = useNavigate();
  
  const { data: userRole, isLoading } = useQuery({
    queryKey: ['userRole'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;
      
      const { data } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id)
        .eq('role', 'advisor')
        .single();
      
      return data?.role;
    },
  });

  useEffect(() => {
    if (!isLoading && userRole !== 'advisor') {
      navigate('/');
    }
  }, [userRole, isLoading, navigate]);

  if (isLoading) {
    return <Skeleton className="w-full h-48" />;
  }

  if (userRole !== 'advisor') {
    return (
      <Alert variant="destructive">
        <AlertDescription>
          You don't have permission to access this page.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Advisor Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Placeholder cards for advisor features */}
        <div className="p-6 border rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold">Client Overview</h3>
          <p className="text-muted-foreground">Manage and view client information</p>
        </div>
        <div className="p-6 border rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold">Portfolio Management</h3>
          <p className="text-muted-foreground">Review and adjust client portfolios</p>
        </div>
        <div className="p-6 border rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold">Performance Reports</h3>
          <p className="text-muted-foreground">Generate and view client reports</p>
        </div>
      </div>
    </div>
  );
};

export default AdvisorDashboard;
