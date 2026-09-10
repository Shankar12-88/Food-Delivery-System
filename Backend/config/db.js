import mongoose from 'mongoose'

export async function connectDB() {
  const mongoUri = process.env.URI

  if (!mongoUri) {
    throw new Error('MongoDB URI is missing from the environment')
  }

  await mongoose.connect(mongoUri)
  console.log('MongoDB connected')
}
