import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";

export interface Alert {
  _id: string;
  riskLevel: "High" | "Medium" | "Low";
  sender: string;
  receiver: string;
  amount: number;
  timestamp: string;
  status: "OPEN" | "CLEARED" | "REPORTED";
  notes?: string;
}

export const useAlerts = () =>
  useQuery<Alert[]>({
    queryKey: ["alerts"],
    queryFn: () => api.get("/alerts").then((r) => r.data),
    refetchInterval: 5000,
  });

export const useResolveAlert = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status, notes }: { id: string; status: "CLEARED" | "REPORTED"; notes?: string }) =>
      api.post(`/alerts/${id}/resolve`, { status, notes }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["alerts"] }),
  });
};
