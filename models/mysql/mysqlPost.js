import sequelize from '../../config/mysql.js'
import { DataTypes } from 'sequelize'
import { User } from './mysqlUser.js'
import { IPost } from '../interfaces/IPost.js'

export const Post = sequelize.define('Post', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  body: {
    type: DataTypes.TEXT,
    allowNull: false,
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

export class MysqlPost extends IPost {
  async createPost(post) {
    const { dataValues: { updatedAt, ...result } } = await Post.create(post)
    return result
  }

  async getPost(postId) {
    return Post.findByPk(postId, { attributes: { exclude: ['updatedAt'] } })
  }

  async getPosts() {
    return Post.findAll({
      order: [['createdAt', 'DESC']],
      attributes: { exclude: ['body', 'updatedAt'] },
    })
  }

  async updatePost(postId, nickname, post) {
    const dbPost = await Post.findOne({ where: { id: postId, author: nickname } })

    if (!dbPost) return null

    dbPost.title = post.title
    dbPost.body = post.body
    await dbPost.save()

    return dbPost
  }

  async deletePost(postId, nickname) {

    const dbPost = await Post.findOne({ where: { id: postId, author: nickname } })

    if (!dbPost) return null

    await Post.destroy({
      where: {
        id: postId, author: nickname,
      },
    })

    return true
  }
}
