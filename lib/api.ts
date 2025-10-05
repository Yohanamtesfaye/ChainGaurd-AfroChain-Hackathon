import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

const api = axios.create({
  baseURL,
  timeout: 5000,
});

export const getTransactions = () => api.get('/transactions').then((r) => r.data);
export const getWalletRisk = (wallet: string) => api.get(`/risk/${wallet}`).then((r) => r.data);
export const getCsvExportUrl = () => `${baseURL}/export`;

export default api;
