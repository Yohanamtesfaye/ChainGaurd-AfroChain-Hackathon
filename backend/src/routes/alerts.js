import { Router } from 'express';
import Alert from '../models/Alert.js';

const router = Router();

// List alerts
router.get('/', async (req, res, next) => {
  try {
    const alerts = await Alert.find().sort({ timestamp: -1 }).limit(100);
    res.json(alerts);
  } catch (err) {
    next(err);
  }
});

// Resolve / update alert
router.post('/:id/resolve', async (req, res, next) => {
  try {
    const { status, notes } = req.body;          // CLEARED or REPORTED

    if (status === 'CLEARED') {
      await Alert.deleteOne({ _id: req.params.id });
    } else {
      await Alert.updateOne(
        { _id: req.params.id },
        { $set: { status: 'REPORTED', notes } },
        { upsert: true }
      );
    }

    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
});

export default router;