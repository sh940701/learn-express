export class PostService {
  constructor(postModel) {
    this.postModel = postModel
  }

  async createPost(post) {
    return await this.postModel.createPost(post)
  }

  async getPost(postId) {
    return await this.postModel.getPost(postId)
  }

  async getPosts() {
    return await this.postModel.getPosts()
  }

  async updatePost(postId, post) {
    return await this.postModel.updatePost(postId, post)
  }

  async deletePost(postId) {
    return await this.postModel.deletePost(postId)
  }
}
