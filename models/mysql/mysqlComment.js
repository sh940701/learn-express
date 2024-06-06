import sequelize from '../../config/mysql.js'
import { DataTypes } from 'sequelize'
import { Post } from './mysqlPost.js'
import { User } from './mysqlUser.js'
import { IComment } from '../interfaces/IComment.js'

export const Comment = sequelize.define('Comment', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  body: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  post_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Post,
      key: 'id',
    },
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: User,
      key: 'nickname',
    },
  },
}, { timestamps: true })

export class MysqlComment extends IComment {
  async createComment(comment) {
    super.createComment(comment)
  }

  async getComments(postId) {
    super.getComments(postId)
  }

  async updateComment(commentId) {
    super.updateComment(commentId)
  }

  async deleteComment(commentId) {
    super.deleteComment(commentId)
  }
}
