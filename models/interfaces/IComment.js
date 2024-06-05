export class IComment {
  constructor() {
    // interface 로 사용하는 class 를 instance 화 할 수 없음
    if (this.constructor === IComment) {
      throw new Error('Cannot instantiate interface IComment')
    }
  }

  async createComment(comment) {
    throw new Error('Method \'createComment()\' must be implemented.')
  }

  async getComments(postId) {
    throw new Error('Method \'getComments()\' must be implemented.')
  }

  async updateComment(commentId) {
    throw new Error('Method \'updateComment()\' must be implemented.')
  }

  async deleteComment(commentId) {
    throw new Error('Method \'deleteComments()\' must be implemented.')
  }
}
