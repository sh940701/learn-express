import mongoose from 'mongoose'
import { IComment } from '../interfaces/IComment.js'

const CommentSchema = new mongoose.Schema({
  body: { type: String, required: true },
  post: { type: mongoose.Types.ObjectId, required: true },
  author: { type: String, required: true },
}, { timestamps: true })

const Comment = mongoose.model('Comment', CommentSchema)

export class MongooseComment extends IComment {
  async createComment(comment) {
    const newComment = new Comment(comment)
    return await newComment.save()
  }

  async getComments(postId) {
    return await Comment.find({ post: postId }).sort({ createdAt: -1 }).exec()
  }

  async updateComment(commentId, comment, nickname) {
    return await Comment.findOneAndUpdate({
      _id: commentId,
      post: comment.post,
      author: nickname,
    }, { body: comment.body }).exec()
  }

  async deleteComment(commentId, nickname) {
    return await Comment.findOneAndDelete({ _id: commentId, author: nickname }).exec()
  }
}
