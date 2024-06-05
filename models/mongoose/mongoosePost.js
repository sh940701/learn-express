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
    return await Post.findById(postId).exec()
  }

  async getPosts() {
    return await Post.find().exec()
  }

  async updatePost(postId, post) {
    return await Post.findByIdAndUpdate(postId, post, { new: true }).exec()
  }

  async deletePost(postId) {
    return await Post.findByIdAndDelete(postId).exec()
  }
}
