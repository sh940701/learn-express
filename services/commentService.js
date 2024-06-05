export class CommentService {
  constructor(commentModel) {
    this.commentModel = commentModel
  }

  async createComment(comment) {
    return this.commentModel.createComment(comment)
  }

  async getComments(postId) {
    return this.commentModel.getComments(postId)
  }

  async updateComment(commentId, comment) {
    return this.commentModel.updateComment(commentId, comment)
  }

  async deleteComment(commentId) {
    return this.commentModel.deleteComment(commentId)
  }
}
