export class IUser {
  constructor() {
    // interface 로 사용하는 class 를 instance 화 할 수 없음
    if (this.constructor === IUser) {
      throw new Error('Cannot instantiate interface IUser')
    }
  }

  async createUser(user) {
    throw new Error('Method \'createUser()\' must be implemented.')
  }

  async getUser(nickname) {
    throw new Error('Method \'getUser()\' must be implemented.')
  }
}
