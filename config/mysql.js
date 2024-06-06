import { Sequelize } from 'sequelize'

const dbName = process.env.DB_NAME

const sequelize = new Sequelize(dbName, 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
})

export default sequelize
