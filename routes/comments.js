import { Router } from 'express'

const router = Router()

router
  .route('/')
  .get((req, res, next) => {
    return res.json({ msg: 'comments' })
  })

export default router
