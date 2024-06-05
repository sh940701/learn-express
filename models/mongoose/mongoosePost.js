import mongoose from 'mongoose'
import { IPost } from '../interfaces/IPost.js'

const PostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  password: { type: String, required: true },
  body: { type: String, required: true },
}, { timestamps: true })

const Post = mongoose.model('Post', PostSchema)

export class MongoosePost extends IPost {
  async createPost(post) {
    const newPost = new Post(post)
    return await newPost.save()
  }

  async getPost(postId) {
    return await Post.find({ _id: postId }, { title: 1, author: 1, body: 1, createdAt: 1 }).exec()
  }

  async getPosts() {
    return await Post.find({}, { title: 1, author: 1, createdAt: 1 }).sort({ createdAt: -1 }).exec()
  }

  async updatePost(postId, password, post) {
    return await Post.findOneAndUpdate({ _id: postId, password }, post, { new: true }).exec()
  }

  async deletePost(postId, password) {
    return await Post.findOneAndDelete({ _id: postId, password }).exec()
  }
}
