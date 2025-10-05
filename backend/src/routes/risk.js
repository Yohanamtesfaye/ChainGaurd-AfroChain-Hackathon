import { Router } from 'express';
import { getLatestTransactions } from '../services/hederaService.js';
import { applyRiskLevels } from '../services/riskService.js';

const router = Router();

// GET /api/risk/:walletId
router.get('/:walletId', async (req, res, next) => {
  try {
    const walletId = req.params.walletId;
    const txs = await getLatestTransactions();
    const txsWithRisk = applyRiskLevels(txs).filter(
      (t) => t.sender === walletId || t.receiver === walletId
    );
    res.json(txsWithRisk);
  } catch (err) {
    next(err);
  }
});

export default router;
