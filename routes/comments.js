import { Router } from 'express'
import { MongooseComment } from '../models/mongoose/mongooseComment.js'
import { CommentService } from '../services/commentService.js'
import { extractCommentId } from '../middleware/parser.js'

const router = Router()

const commentModel = new MongooseComment()
const commentService = new CommentService(commentModel)

router
  .route('/')
  .post(async (req, res) => {
    // 댓글 작성
    try {
      const comment = await commentService.createComment(req.body)
      res.status(201).json(comment)
    } catch (e) {
      return res.status(400).json({ error: e.message })
    }
  })

router
  .route('/:_id')
  .patch(extractCommentId, async (req, res) => {
    // 댓글 수정
    try {
      const comment = await commentService.updateComment(req.commentId, req.body)
      if (!comment) return res.status(404).json({ error: 'Comment not found' })
      return res.status(200).json(comment)
    } catch (e) {
      return res.status(400).json({ error: e.message })
    }
  })
  .delete(async (req, res) => {
    // 댓글 삭제
    try {
      await commentService.deleteComment(req.commentId)
      return res.status(200).json({ message: 'Comment deleted' })
    } catch (e) {
      return res.status(400).json({ error: e.message })
    }
  })


export default router
