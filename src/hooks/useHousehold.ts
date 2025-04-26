
import { useQuery } from "@tanstack/react-query";

interface Household {
  name: string;
}

export function useHousehold() {
  const { data, isLoading: loading } = useQuery<Household>({
    queryKey: ['household'],
    queryFn: async () => {
      // TODO: Replace this with actual API call once Supabase is integrated
      return { name: "Demo Household" };
    },
  });

  return { data, loading };
}
