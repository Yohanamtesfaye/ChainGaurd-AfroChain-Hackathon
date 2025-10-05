import express from 'express';
import dotenv from 'dotenv';
import transactionsRouter from './routes/transactions.js';
import riskRouter from './routes/risk.js';
import exportRouter from './routes/export.js';
import alertsRouter from './routes/alerts.js';
import { connectMongo } from './db/mongo.js';
import mlRiskRouter from './routes/mlrisk.js';
import logger from './utils/logger.js';
import cors from 'cors';
import { verifySdkConnection } from './services/hederaSdk.js';

// Load env vars
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(logger);

// Connect DB
connectMongo();

// Routes
app.use('/api/transactions', transactionsRouter);
app.use('/api/risk', riskRouter);
app.use('/api/export', exportRouter);
app.use('/api/mlrisk', mlRiskRouter); // optional
app.use('/api/alerts', alertsRouter);

// Root
app.get('/', (req, res) => {
  res.send('ChainGuard Ethiopia Backend is running');
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || 'Internal server error' });
});

verifySdkConnection();

app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});
