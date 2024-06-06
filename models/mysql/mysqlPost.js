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
    },
  },
}, { timestamps: true })

export class MysqlPost extends IPost {
  async createPost(post) {
    super.createPost(post)
  }

  async getPost(postId) {
    super.getPost(postId)
  }

  async getPosts() {
    super.getPosts()
  }

  async updatePost(postId) {
    super.updatePost(postId)
  }

  async deletePost(postId) {
    super.deletePost(postId)
  }
}
