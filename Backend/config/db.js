import mongoose from 'mongoose';

export async function connectDB() {
  const mongoUri = process.env.MONGO_URI || process.env.URI;
  console.log("Mongo URI loaded", (process.env.MONGO_URI));
  
  if (!mongoUri) {
    throw new Error('MongoDB URI is missing from the environment');
  }

  await mongoose.connect(mongoUri, { family: 4 });
  console.log('MongoDB connected');
}
