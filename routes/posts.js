import { Router } from 'express'
import { MongoosePost } from '../models/mongoose/mongoosePost.js'
import { PostService } from '../services/postService.js'
import { extractPostId } from '../middleware/parser.js'

const router = Router()

const postModel = new MongoosePost()
const postService = new PostService(postModel)

router
  .route('/')
  .get(async (req, res) => {
    // 전체 게시글 목록 조회
    try {
      const posts = await postService.getPosts()

      return res.status(200).json(posts)
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  })
  .post(async (req, res) => {
    // 게시글 작성
    try {
      const posts = await postService.createPost(res.body)

      return res.status(201).json(posts)
    } catch (e) {
      res.status(400).json({ error: e.message })
    }
  })

router
  .route('/:_id')
  .get(extractPostId, async (req, res) => {
    // 단일 게시글 조회
    try {
      const post = await postService.getPost(req.postId)

      return res.status(200).json(post)
    } catch (e) {
      res.status(400).json({ error: e.message })
    }
  })
  .patch(extractPostId, async (req, res) => {
    // 게시글 수정
    try {
      const post = await postService.updatePost(req.postId, req.body)
      if (!post) return res.status(404).json({ error: 'Post not found' })
      return res.status(200).json(post)
    } catch (e) {
      return res.status(404).json({ error: e.message })
    }
  })
  .delete(extractPostId, async (req, res) => {
    try {
      await postService.deletePost(req.postId)
      return res.status(200).json({ message: 'User deleted' })
    } catch (e) {
      return res.status(500).json({ error: e.message })
    }
  })

router
  .route(':_id/comments')
  .get(extractPostId, async (req, res, next) => {
    // 게시글에 포함된 댓글들 조회
    try {
      await postService.deletePost(req.postId)
      return res.status(200).json({ message: 'Post deleted' })
    } catch (e) {
      return res.status(500).json({ error: e.message })
    }
  })

export default router
