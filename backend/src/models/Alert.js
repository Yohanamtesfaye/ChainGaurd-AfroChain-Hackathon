import mongoose from 'mongoose';

const AlertSchema = new mongoose.Schema({
  _id: { type: String, required: true }, // transactionId
  riskLevel: String,
  sender: String,
  receiver: String,
  amount: Number,
  timestamp: String,
  status: { type: String, default: 'OPEN' }, // OPEN / CLEARED / REPORTED
  notes: String,
});

export default mongoose.model('Alert', AlertSchema);
