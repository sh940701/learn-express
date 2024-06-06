import swaggerJSDoc from 'swagger-jsdoc'
import { fileURLToPath } from 'url'
import path from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)


const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'swagger',
    version: '1.0.0',
    description: 'swagger for board',
  },
  host: 'localhost:3000',
  basePath: '/',
}

const options = {
  swaggerDefinition,
  apis: [__dirname + '/../routes/*.js'],
}

export const swaggerSpec = swaggerJSDoc(options)
