import mongoose from 'mongoose'
import { IPost } from '../interfaces/IPost.js'

const PostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  body: { type: String, required: true },
}, { timestamps: true })

const Post = mongoose.model('Post', PostSchema)

export class MongoosePost extends IPost {
  async createPost(post) {
    const newPost = new Post(post)
    return await newPost.save()
  }

  async getPost(postId) {
    return await Post.find({ _id: postId }, { _id: 0, title: 1, author: 1, body: 1, createdAt: 1 }).exec()
  }

  async getPosts() {
    return await Post.find({}, { _id: 0, title: 1, author: 1, createdAt: 1 }).sort({ createdAt: -1 }).exec()
  }

  async updatePost(postId, nickname, post) {
    return await Post.findOneAndUpdate({ _id: postId, author: nickname }, post, { new: true }).exec()
  }

  async deletePost(postId, nickname) {
    return await Post.findOneAndDelete({ _id: postId, author: nickname }).exec()
  }
}
