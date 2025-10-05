# ChainGuard Ethiopia – Backend API

Express.js backend powering the ChainGuard Ethiopia Hackathon MVP. Provides Hedera testnet transaction monitoring, risk flagging, CSV export, and optional mock ML risk scoring.

## Features

- Fetch latest 50 Hedera testnet transactions (mirror node) with fallback mock data.
- Rule-based risk levels (`Low`, `Medium`, `High`).
- REST endpoints:
  - `GET /api/transactions` – all transactions with risk.
  - `GET /api/risk/:walletId` – transactions for a wallet.
  - `GET /api/export` – CSV download.
  - `GET /api/mlrisk/:walletId` – random anomaly score (bonus).
- <3 s response target, simple logging middleware.

## Tech Stack

Node.js, Express.js, Hedera JS SDK, Axios, json2csv, dotenv

## Setup

```bash
# 1. Install dependencies
npm install

# 2. Copy environment template and edit if needed
cp .env.example .env
# or on Windows PowerShell
type .env.example > .env
# Edit MIRROR_NODE_URL / PORT as desired

# 3. Start server
npm run dev   # auto-restart with nodemon
# or
npm start
```

Server listens on `http://localhost:4000` by default.

## Endpoints

| Route | Description |
|-------|-------------|
| `/api/transactions` | Latest 50 tx with risk levels |
| `/api/risk/<walletId>` | Filtered tx for wallet |
| `/api/export` | CSV download |
| `/api/mlrisk/<walletId>` | Random anomaly score |

## Project Structure

```
backend/
├─ src/
│  ├─ server.js           # Entry point
│  ├─ routes/             # Express routers
│  ├─ services/           # Business logic (Hedera, risk)
│  ├─ utils/logger.js     # Logging middleware
│  └─ mock/mockTransactions.json  # Sample data
└─ .env.example
```

## Notes

- Fallback mock data ensures demo works without live internet/API.
- Risk rules are basic; tweak `src/services/riskService.js` to tune thresholds.
- Hedera account credentials are **optional** for mirror-node only flow.

Happy hacking! 🎉
