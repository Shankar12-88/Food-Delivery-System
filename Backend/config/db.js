import dns from 'dns';
import mongoose from 'mongoose';

dns.setServers(['8.8.8.8', '8.8.4.4']);

export async function connectDB() {
  const mongoUri = process.env.MONGO_URI || process.env.URI;
  console.log('Mongo URI loaded');

  if (!mongoUri) {
    throw new Error('MongoDB URI is missing from the environment');
  }

  await mongoose.connect(mongoUri);
  console.log('MongoDB connected');
}
