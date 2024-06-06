export class IPost {
  constructor() {
    // interface 로 사용하는 class 를 instance 화 할 수 없음
    if (this.constructor === IPost) {
      throw new Error('Cannot instantiate interface IPost')
    }
  }

  async createPost(post) {
    throw new Error('Method \'createPost()\' must be implemented.')
  }

  async getPost(postId) {
    throw new Error('Method \'getPost()\' must be implemented.')
  }

  async getPosts() {
    throw new Error('Method \'getPosts()\' must be implemented.')
  }

  async updatePost(postId, nickname, post) {
    throw new Error('Method \'updatePost()\' must be implemented.')
  }

  async deletePost(postId, nickname) {
    throw new Error('Method \'deletePost()\' must be implemented.')
  }
}
