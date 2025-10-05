// Rule-based risk flagging
import Alert from '../models/Alert.js';

export async function applyRiskLevels(transactions) {
  const txs = transactions.map((t) => ({ ...t, riskLevel: 'Low' }));

  // Index transactions by sender for frequency check
  const senderMap = new Map();
  txs.forEach((tx) => {
    if (!senderMap.has(tx.sender)) senderMap.set(tx.sender, []);
    senderMap.get(tx.sender).push(tx);
  });

  // Helper to convert consensus timestamp string to milliseconds
  const toMs = (ts) => parseFloat(ts) * 1000;

  txs.forEach((tx, idx) => {
    // Rule 1: Amount > 10 HBAR
    if (tx.amount > 10) {
      tx.riskLevel = 'High';
      return;
    }

    // Rule 2: Multiple txs from same sender within 1 minute
    const list = senderMap.get(tx.sender);
    const recent = list.filter((o) => Math.abs(toMs(o.timestamp) - toMs(tx.timestamp)) < 60 * 1000);
    if (recent.length > 1) {
      tx.riskLevel = 'Medium';
    }

    // Rule 3: Multi-hop detection (simple)
    // If this tx's sender was receiver in any other tx within last hour -> potential hop
    const hop = txs.find(
      (o) => o.receiver === tx.sender && Math.abs(toMs(o.timestamp) - toMs(tx.timestamp)) < 60 * 60 * 1000
    );
    if (hop && tx.riskLevel === 'Low') {
      tx.riskLevel = 'Medium';
    }
  });

  // Persist high / medium alerts
  for (const tx of txs) {
    if (tx.riskLevel !== 'Low') {
      await Alert.updateOne({ _id: tx.transactionId }, { ...tx, status: 'OPEN' }, { upsert: true });
    }
  }
  return txs;
}
