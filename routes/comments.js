import { Router } from 'express'

const router = Router()

router
  .route('/')
  .post((req, res, next) => {
    // 댓글 작성
  })

router
  .route('/:comment_id')
  .patch((req, res, next) => {
    // 댓글 수정
  })
  .delete((req, res, next) => {
    // 댓글 삭제
  })


export default router
