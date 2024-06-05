import mongoose from 'mongoose'
import { IComment } from '../interfaces/IComment.js'

const CommentSchema = new mongoose.Schema({
  body: { type: String, required: true },
  post: { type: mongoose.Types.ObjectId, required: true },
}, { timestamps: true })

const Comment = mongoose.model('Comment', CommentSchema)

export class MongooseComment extends IComment {
  async createComment(comment) {
    const newComment = new Comment(comment)
    return await newComment.save()
  }

  async getComments(postId) {
    return await Comment.find({ post: postId }).exec()
  }

  async updateComment(commentId, comment) {
    return await Comment.findByIdAndUpdate(commentId, comment).exec()
  }

  async deleteComment(commentId) {
    return await Comment.findByIdAndDelete(commentId).exec()
  }
}
