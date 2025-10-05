export type RiskLevel = "Low" | "Medium" | "High";

export interface Transaction {
  transactionId?: string; // optional if backend uses transactionId
  sender: string;
  receiver: string;
  amount: number;
  timestamp: string; // ISO or unix timestamp as string
  riskLevel: RiskLevel;
}
