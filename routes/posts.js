import { Router } from 'express'
import { PostService } from '../services/postService.js'
import { extractPostId } from '../middleware/parser.js'
import { CommentService } from '../services/commentService.js'
import { authenticateUser } from '../middleware/auth.js'
import { MysqlPost } from '../models/mysql/mysqlPost.js'
import { MysqlComment } from '../models/mysql/mysqlComment.js'

const router = Router()

// const postModel = new MongoosePost()
const postModel = new MysqlPost
const postService = new PostService(postModel)
// const commentModel = new MongooseComment()
const commentModel = new MysqlComment()
const commentService = new CommentService(commentModel)

/**
 * @swagger
 * /posts:
 *   get:
 *     description: 전체 게시글 조회
 *     tags: [Post]
 *     produces:
 *     - "application/json"
 *     responses:
 *       200:
 *         description: successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: 666042773dac3f37c64a75b7
 *                   title:
 *                     type: string
 *                     example: 게시글 제목
 *                   author:
 *                     type: string
 *                     example: nickname
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     example: 2024-06-05T10:48:23.135Z
 *       '500':
 *         description: internal error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: internal error
 *             examples:
 *               application/json:
 *                 error: "internal error"
 */
router.get('/', async (req, res) => {
  // 전체 게시글 목록 조회
  try {
    const posts = await postService.getPosts()

    return res.status(200).json(posts)
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

/**
 * @swagger
 * /posts:
 *   post:
 *     description: 게시글 생성
 *     tags: [Post]
 *     produces:
 *     - "application/json"
 *     parameters:
 *     - name: "body"
 *       in: "body"
 *       required: true
 *       schema:
 *         type: object
 *         properties:
 *           title:
 *             type: string
 *             example: 게시글 제목
 *           password:
 *             type: string
 *             example: password
 *
 *     responses:
 *       201:
 *         description: successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: 666042773dac3f37c64a75b7
 *                 title:
 *                   type: string
 *                   example: 게시글 제목
 *                 author:
 *                   type: string
 *                   example: nickname
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   example: 2024-06-05T10:48:23.135Z
 *       '500':
 *         description: internal error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: internal error
 *             examples:
 *               application/json:
 *                 error: "internal error"
 */
router.post('/', [authenticateUser, async (req, res) => {
  // 게시글 작성
  try {
    const data = { ...req.body, author: req.token.nickname }
    const post = await postService.createPost(data)

    return res.status(201).json(post)
  } catch (e) {
    res.status(400).json({ error: e.message })
  }
}])

router.get('/:_id', [extractPostId, async (req, res) => {
  // 단일 게시글 조회
  try {
    const post = await postService.getPost(req.postId)

    return res.status(200).json(post)
  } catch (e) {
    res.status(400).json({ error: e.message })
  }
}])

router.patch('/:_id', [authenticateUser, extractPostId, async (req, res) => {
  // 게시글 수정
  const { nickname } = req.token
  try {
    const post = await postService.updatePost(req.postId, nickname, req.body)
    if (!post) return res.status(404).json({ error: 'Post not found' })
    return res.status(200).json(post)
  } catch (e) {
    return res.status(404).json({ error: e.message })
  }
}])

router.post('/:_id', [authenticateUser, extractPostId, async (req, res) => {
  // 게시글 삭제
  const { nickname } = req.token
  try {
    const result = await postService.deletePost(req.postId, nickname)
    if (!result) return res.status(400).json({ error: 'Post not found' })
    return res.status(200).json({ message: 'Post deleted' })
  } catch (e) {
    return res.status(500).json({ error: e.message })
  }
}])

router.get('/:_id/comments', [extractPostId, async (req, res, next) => {
  // 게시글에 포함된 댓글들 조회
  try {
    const comments = await commentService.getComments(req.postId)
    return res.status(200).json(comments)
  } catch (e) {
    return res.status(500).json({ error: e.message })
  }
}])

export default router

