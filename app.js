import express from 'express'
import mongoose from 'mongoose'

const app = express()

const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING
await connectDB(DB_CONNECTION_STRING)



app.use(express.json())

app.get('/', (req, res) => {
  res.status(200).json({ message: 'hello, world!' })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))


async function connectDB(DB_CONNECTION_STRING) {

  try {
    await mongoose.connect(DB_CONNECTION_STRING)

    console.log('MongoDB connected...')
  } catch (e) {
    console.error(e)
    process.exit(1)
  }
}
