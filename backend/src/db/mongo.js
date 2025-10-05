import mongoose from 'mongoose';


export async function connectMongo() {
  const URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1/chainguard';
  try {
    await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
  }
}
