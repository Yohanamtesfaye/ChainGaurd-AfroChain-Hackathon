import { Router } from 'express';
import Papa from 'papaparse';
import { getLatestTransactions } from '../services/hederaService.js';
import { applyRiskLevels } from '../services/riskService.js';

const router = Router();

// GET /api/export
router.get('/', async (req, res, next) => {
  try {
    const txs = await getLatestTransactions();
    const txsWithRisk = await applyRiskLevels(txs);

    const csv = Papa.unparse(txsWithRisk, {
      columns: ['timestamp', 'sender', 'receiver', 'amount', 'riskLevel'],
    });

    res.header('Content-Type', 'text/csv');
    res.attachment('transactions.csv');
    return res.send(csv);
  } catch (err) {
    next(err);
  }
});

export default router;
