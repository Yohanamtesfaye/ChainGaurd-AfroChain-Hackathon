import { useQuery } from '@tanstack/react-query';
import { getWalletRisk } from '../lib/api';

export const useWalletRisk = (wallet: string, enabled = false) =>
  useQuery({
    queryKey: ['risk', wallet],
    queryFn: () => getWalletRisk(wallet),
    enabled: enabled && wallet.length > 0,
  });
