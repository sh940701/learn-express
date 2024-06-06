import { DataTypes } from 'sequelize'
import sequelize from '../../config/mysql.js'
import { IUser } from '../interfaces/IUser.js'

export const User = sequelize.define('User', {
  nickname: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, { timestamps: false })

export class MysqlUser extends IUser {
  async createUser(user) {
    super.createUser(user)
  }

  async getUser(userId) {
    super.getUser(userId)
  }
}
