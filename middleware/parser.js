export const extractPostId = (req, res, next) => {
  const { _id: postId } = req.params

  if (!postId) {
    return res.status(400).json({ error: 'Post ID is required' })
  }

  req.postId = postId
  next()
}

export const extractCommentId = (req, res, next) => {
  const { _id: commentId } = req.params

  if (!commentId) {
    return res.status(400).json({ error: 'Comment ID is required' })
  }

  req.commentId = commentId
  next()
}
