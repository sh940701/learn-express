import { hashPassword } from '../utils/auth.js'

export class UserService {
  constructor(userModel) {
    this.userModel = userModel
  }

  async createUser(user) {
    user.password = await hashPassword(user.password) // 비밀번호 encrypt
    return await this.userModel.createUser(user)
  }

  async getUser(nickname) {
    return await this.userModel.getUser(nickname)
  }
}
