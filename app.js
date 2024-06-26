import express from 'express'
import router from './routes/index.js'
import dotenv from 'dotenv'
import swaggerUi from 'swagger-ui-express'
import { swaggerSpec } from './config/swagger.js'
import cookieParser from 'cookie-parser'
import sequelize from './config/mysql.js'

const app = express()
dotenv.config()

const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING
export const DB_NAME = process.env.DB_NAME
export const dbType = process.env.DB_TYPE
export const JWT_SECRET = process.env.JWT_SECRET
// await connectDB(DB_CONNECTION_STRING)

await sequelize.query(`CREATE DATABASE IF NOT EXISTS ${DB_NAME};`)
await sequelize.sync({ force: false })

app.use(express.json())
app.use(cookieParser())
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
app.use('/', router)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
