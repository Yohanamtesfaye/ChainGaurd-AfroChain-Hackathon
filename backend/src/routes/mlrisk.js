import { Router } from 'express';
import crypto from 'crypto';

const router = Router();

// Bonus: GET /api/mlrisk/:walletId
router.get('/:walletId', (req, res) => {
  const score = parseFloat('0.' + crypto.randomInt(100, 999)); // 0.100 - 0.999
  res.json({ wallet: req.params.walletId, anomalyScore: score });
});

export default router;
