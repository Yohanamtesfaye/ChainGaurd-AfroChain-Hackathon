import { Router } from 'express';
import { getLatestTransactions } from '../services/hederaService.js';
import { applyRiskLevels } from '../services/riskService.js';

const router = Router();

// GET /api/transactions
router.get('/', async (req, res, next) => {
  try {
    const txs = await getLatestTransactions();
    const txsWithRisk = await applyRiskLevels(txs);
    res.json(txsWithRisk);
  } catch (err) {
    next(err);
  }
});

export default router;
