import mongoose from 'mongoose'

export async function connectDB(DB_CONNECTION_STRING) {

  try {
    await mongoose.connect(DB_CONNECTION_STRING, { dbName: 'tmpDB' })

    console.log('MongoDB connected...')
  } catch (e) {
    console.error(e)
    process.exit(1)
  }
}
