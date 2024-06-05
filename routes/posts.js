import { Router } from 'express'

const router = Router()

router
  .route('/')
  .get((req, res, next) => {
    // 전체 게시글 목록 조회
    return res.json({ msg: 'posts' })
  })
  .post((req, res, next) => {
    // 게시글 작성
  })

router
  .route('/:_id')
  .get((req, res, next) => {
    // 단일 게시글 조회
  })
  .patch((req, res, next) => {
    // 게시글 수정
  })
  .delete((req, res, next) => {
    // 게시글 삭제
  })

router
  .route(':_id/comments')
  .get((req, rex, next) => {
    // 게시글에 포함된 댓글들 삭제
  })

export default router
