import { Router } from 'express'
import postsRouter from './posts.js'
import commentsRouter from './comments.js'

const router = Router()

router.get('/', (req, res) => {
  return res.send('ok')
})

router.use('/posts', postsRouter)
router.use('/comments', commentsRouter)

export default router
