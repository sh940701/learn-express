import mongoose from 'mongoose'
import { IUser } from '../interfaces/IUser.js'

const UserSchema = new mongoose.Schema({
  nickname: { type: String, required: true, unique: true }, // nickname 중복 방지
  password: { type: String, required: true },
}, { timestamps: true })

const User = mongoose.model('User', UserSchema)

export class MongooseUser extends IUser {
  async createUser(user) {
    const newUser = new User(user)
    return await newUser.save()
  }

  async getUser(nickname) {
    return await User.findOne({ nickname }).exec()
  }
}
