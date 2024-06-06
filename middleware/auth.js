import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../app.js'

export const authenticateUser = (req, res, next) => {
  const token = req.cookies.jwt

  if (!token) {
    return res.status(401).json({ error: '토큰이 없습니다.' })
  }

  try {
    req.token = jwt.verify(token, JWT_SECRET)
    next()
  } catch (e) {
    res.status(401).json({ error: '유효하지 않은 토큰입니다.' })
  }
}
