import { Router } from 'express'
import { CommentService } from '../services/commentService.js'
import { extractCommentId } from '../middleware/parser.js'
import { authenticateUser } from '../middleware/auth.js'
import { MysqlComment } from '../models/mysql/mysqlComment.js'

const router = Router()

// const commentModel = new MongooseComment()
const commentModel = new MysqlComment()
const commentService = new CommentService(commentModel)


/**
 * @swagger
 * /comments:
 *   post:
 *     description: 댓글 생성
 *     tags: [Comment]
 *     produces:
 *     - "application/json"
 *     parameters:
 *     - name: "body"
 *       in: "body"
 *       required: true
 *       schema:
 *         type: object
 *         properties:
 *           body:
 *             type: string
 *             example: 댓글 내용
 *           post_id:
 *             type: int
 *             example: 1
 *
 *     responses:
 *       201:
 *         description: successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: int
 *                   example: 1
 *                 body:
 *                   type: string
 *                   example: 댓글 내용
 *                 post_id:
 *                   type: int
 *                   example: 1
 *                 author:
 *                   type: string
 *                   example: nickname
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   example: 2024-06-05T10:48:23.135Z
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
router.post('/', [authenticateUser, async (req, res) => {
  // 댓글 작성
  const { nickname } = req.token

  if (req.body.body.length === 0) return res.status(400).json({ error: '댓글 내용을 입력해주세요' })
  try {
    const comment = await commentService.createComment({ ...req.body, author: nickname })
    res.status(201).json(comment)
  } catch (e) {
    return res.status(400).json({ error: e.message })
  }
}])


/**
 * @swagger
 * /comments/:id:
 *   patch:
 *     description: 댓글 생성
 *     tags: [Comment]
 *     produces:
 *     - "application/json"
 *     parameters:
 *     - name: "id"
 *       in: "path"
 *       required: true
 *       schema:
 *         type: int
 *         example: 1
 *     - name: "body"
 *       in: "body"
 *       required: true
 *       schema:
 *         type: object
 *         properties:
 *           body:
 *             type: string
 *             example: 댓글 내용
 *           post_id:
 *             type: int
 *             example: 1
 *
 *     responses:
 *       200:
 *         description: successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: int
 *                   example: 1
 *                 body:
 *                   type: string
 *                   example: 댓글 내용
 *                 post_id:
 *                   type: int
 *                   example: 1
 *                 author:
 *                   type: string
 *                   example: nickname
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   example: 2024-06-05T10:48:23.135Z
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   example: 2024-06-05T10:48:23.135Z
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
router.patch('/:_id', [authenticateUser, extractCommentId, async (req, res) => {
  // 댓글 수정
  const { nickname } = req.token

  if (req.body.body.length === 0) return res.status(400).json({ error: '댓글 내용을 입력해주세요' })
  try {
    const comment = await commentService.updateComment(req.commentId, req.body, nickname)
    if (!comment) return res.status(404).json({ error: 'Comment not found' })
    return res.status(200).json(comment)
  } catch (e) {
    return res.status(400).json({ error: e.message })
  }
}])


/**
 * @swagger
 * /comments/:id:
 *   delete:
 *     description: 댓글 삭제
 *     tags: [Comment]
 *     produces:
 *     - "application/json"
 *     parameters:
 *     - name: "id"
 *       in: "path"
 *       required: true
 *       schema:
 *         type: int
 *         example: 1
 *
 *     responses:
 *       200:
 *         description: successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Comment deleted
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
router.delete('/:_id', [authenticateUser, extractCommentId, async (req, res) => {
  // 댓글 삭제
  const { nickname } = req.token

  try {
    const result = await commentService.deleteComment(req.commentId, nickname)
    if (!result) return res.status(400).json({ error: 'Comment not found' })
    return res.status(200).json({ message: 'Comment deleted' })
  } catch (e) {
    return res.status(400).json({ error: e.message })
  }
}])


export default router
