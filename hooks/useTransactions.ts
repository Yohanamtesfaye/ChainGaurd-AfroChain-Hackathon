// hooks/useTransactions.ts
import { useQuery } from '@tanstack/react-query';
import { getTransactions } from '../lib/api';
import { Transaction } from '../types/transaction';

export const useTransactions = () =>
  useQuery<Transaction[]>({ 
    queryKey: ['transactions'], 
    queryFn: getTransactions, 
    refetchInterval: 5000 
  });