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
    const { dataValues: { updatedAt, ...result } } = await Comment.create(comment)
    return result
  }

  async getComments(postId) {
    return Comment.findAll({
      where: { post_id: postId },
      order: [['createdAt', 'DESC']],
      attributes: { exclude: ['updatedAt'] },
    })
  }

  async updateComment(commentId, comment, nickname) {
    const dbComment = await Comment.findOne({ where: { id: commentId, author: nickname } })

    if (!dbComment) return null

    dbComment.body = comment.body
    await dbComment.save()

    return dbComment
  }

  async deleteComment(commentId, nickname) {
    const dbComment = await Comment.findOne({ where: { id: commentId, author: nickname } })

    if (!dbComment) return null

    await Comment.destroy({
      where: {
        id: commentId, author: nickname,
      },
    })

    return true
  }
}
