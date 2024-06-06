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
 *                   id:
 *                     type: int
 *                     example: 1
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
 *           body:
 *             type: string
 *             example: 게시글 내용
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
 *                 title:
 *                   type: string
 *                   example: 게시글 제목
 *                 body:
 *                  type: string
 *                  example: 게시글 내용
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
  // 게시글 작성
  try {
    const data = { ...req.body, author: req.token.nickname }
    const post = await postService.createPost(data)

    return res.status(201).json(post)
  } catch (e) {
    res.status(400).json({ error: e.message })
  }
}])

/**
 * @swagger
 * /posts/:id:
 *   get:
 *     description: 단일 게시글 조회
 *     tags: [Post]
 *     produces:
 *     - "application/json"
 *     parameters:
 *     - name: id
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
 *                 id:
 *                   type: int
 *                   example: 1
 *                 title:
 *                   type: string
 *                   example: 게시글 제목
 *                 body:
 *                  type: string
 *                  example: 게시글 내용
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
router.get('/:_id', [extractPostId, async (req, res) => {
  // 단일 게시글 조회
  try {
    const post = await postService.getPost(req.postId)

    return res.status(200).json(post)
  } catch (e) {
    res.status(400).json({ error: e.message })
  }
}])

/**
 * @swagger
 * /posts:id:
 *   patch:
 *     description: 게시글 수정
 *     tags: [Post]
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
 *           title:
 *             type: string
 *             example: 게시글 제목
 *           body:
 *             type: string
 *             example: 게시글 내용
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
 *                 title:
 *                   type: string
 *                   example: 게시글 제목
 *                 body:
 *                  type: string
 *                  example: 게시글 내용
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
 *       '404':
 *         description: content not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: content not found
 */
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


/**
 * @swagger
 * /posts:id:
 *   delete:
 *     description: 게시글 삭제
 *     tags: [Post]
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
 *                   example: Post deleted
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
 */
router.delete('/:_id', [authenticateUser, extractPostId, async (req, res) => {
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


/**
 * @swagger
 * /posts/:id/comments:
 *   get:
 *     description: 게시글 댓글 조회
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
 *                   id:
 *                     type: int
 *                     example: 1
 *                   body:
 *                     type: string
 *                     example: 댓글 내용
 *                   post_id:
 *                     type: int
 *                     example: 1
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
 */
router.get('/:_id/comments', [extractPostId, async (req, res) => {
  // 게시글에 포함된 댓글들 조회
  try {
    const comments = await commentService.getComments(req.postId)
    return res.status(200).json(comments)
  } catch (e) {
    return res.status(500).json({ error: e.message })
  }
}])

export default router

