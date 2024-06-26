import { Router } from 'express'
import { MongooseUser } from '../models/mongoose/mongooseUser.js'
import { UserService } from '../services/userService.js'
import bcrypt from 'bcrypt'
import { generateJwtToken } from '../utils/auth.js'
import { MysqlUser } from '../models/mysql/mysqlUser.js'

const router = Router()

// const userModel = new MongooseUser()
const userModel = new MysqlUser
const userService = new UserService(userModel)

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     description: 회원가입
 *     tags: [Auth]
 *     produces:
 *     - "application/json"
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nickname:
 *                 type: string
 *                 example: 유저 닉네임
 *               password:
 *                 type: string
 *                 example: 비밀번호
 *               checkPassword:
 *                 type: string
 *                 example: 비밀번호 확인
 *
 *     responses:
 *       201:
 *         description: successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User create success
 *       '400':
 *         description: bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Bad Request
 */
router.post('/signup', async (req, res) => {
  // 회원가입
  const { nickname, password, checkPassword } = req.body

  if (!nickname || !password || !checkPassword) {
    return res.status(400).json({ error: 'Bad Request' })
  }

  if (password !== checkPassword) {
    return res.status(401).json({ error: '비밀번호가 일치하지 않습니다.' })
  }

  const nicknameRegex = /^[a-zA-Z0-9]{3,}$/
  if (!nicknameRegex.test(nickname)) {
    return res.status(400).json({ error: '닉네임은 3자 이상, 알파벳 대소문자, 숫자로 구성해야 합니다.' })
  }
  if (password.includes(nickname)) {
    return res.status(400).json({ error: '비밀번호에 닉네임과 동일한 값이 포함되면 안됩니다.' })
  }
  if (password.length < 4) {
    return res.status(400).json({ error: '비밀번호는 4자 이상이어야 합니다.' })
  }

  try {
    await userService.createUser(req.body)

    return res.status(201).json({ message: 'User create success' })

  } catch (e) {
    if (e.code === 11000) { // mongoDB duplicated key error
      return res.status(400).json({ error: '중복된 닉네임입니다.' })
    }

    return res.status(400).json({ error: e.message })
  }
})


/**
 * @swagger
 * /auth/signin:
 *   post:
 *     description: 로그인
 *     tags: [Auth]
 *     produces:
 *     - "application/json"
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nickname:
 *                 type: string
 *                 example: 유저 닉네임
 *               password:
 *                 type: string
 *                 example: 비밀번호
 *
 *     responses:
 *       201:
 *         description: successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 로그인 성공
 *       '401':
 *         description: UnAuthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: UnAuthorized
 */
router.post('/signin', async (req, res) => {
  // 로그인
  const { nickname, password } = req.body
  try {
    const user = await userService.getUser(nickname)
    if (!user) {
      return res.status(401).json({ error: '아이디 또는 비밀번호가 일치하지 않습니다.' })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return res.status(401).json({ error: '아이디 또는 비밀번호가 일치하지 않습니다.' })
    }

    const token = generateJwtToken(nickname)

    res.cookie('jwt', token, {
      httpOnly: true,
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    })

    return res.status(200).json({ message: '로그인 성공' })
  } catch (e) {
    return res.status(401).json({ error: e.message })
  }
})

export default router
