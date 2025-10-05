import axios from 'axios';
import fs from 'fs/promises';
import path from 'path';

const MIRROR_NODE_URL = process.env.MIRROR_NODE_URL || 'https://testnet.mirrornode.hedera.com/api/v1';
const MOCK_PATH = path.resolve('src/mock/mockTransactions.json');

export async function getLatestTransactions(limit = 50) {
  try {
    const url = `${MIRROR_NODE_URL}/transactions?limit=${limit}&order=desc`;
    const { data } = await axios.get(url, { timeout: 3000 });
    const formatted = data.transactions.map(formatMirrorTx);
    return formatted;
  } catch (err) {
    return readMockData();
  }
}

function formatMirrorTx(tx) {
  // sender = the account with negative amount, receiver = the one with positive
  const senderXfer = tx.transfers?.find((tr) => parseInt(tr.amount) < 0);
  const receiverXfer = tx.transfers?.find((tr) => parseInt(tr.amount) > 0);
  return {
    transactionId: tx.transaction_id,
    timestamp: new Date(parseFloat(tx.consensus_timestamp) * 1000).toISOString(),
    sender: senderXfer?.account || '0.0.0',
    receiver: receiverXfer?.account || '0.0.0',
    amount: Math.abs(parseInt(receiverXfer?.amount || senderXfer?.amount || 0)) / 1e8, // tinybar to hbar
  }
}

async function readMockData() {
  const content = await fs.readFile(MOCK_PATH, 'utf-8');
  return JSON.parse(content);
}
