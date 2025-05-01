
import { useQuery } from "@tanstack/react-query";

interface Household {
  name: string;
}

export function useHousehold() {
  const { data, isLoading: loading } = useQuery<Household>({
    queryKey: ['household'],
    queryFn: async () => {
      // Return empty data instead of "Demo Household"
      return { name: "" };
    },
  });

  return { data, loading };
}
