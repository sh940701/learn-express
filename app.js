import express from 'express'
import mongoose from 'mongoose'
import router from './routes/index.js'
import dotenv from 'dotenv'
import swaggerUi from 'swagger-ui-express'
import { swaggerSpec } from './config/swagger.js'
import cookieParser from 'cookie-parser'

const app = express()
dotenv.config()

const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING
export const JWT_SECRET = process.env.JWT_SECRET
await connectDB(DB_CONNECTION_STRING)


app.use(express.json())
app.use(cookieParser())
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
app.use('/', router)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))


async function connectDB(DB_CONNECTION_STRING) {

  try {
    await mongoose.connect(DB_CONNECTION_STRING, { dbName: 'tmpDB' })

    console.log('MongoDB connected...')
  } catch (e) {
    console.error(e)
    process.exit(1)
  }
}
