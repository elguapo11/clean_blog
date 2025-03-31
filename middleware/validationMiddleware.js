module.exports = (req, res, next) => {
    if (req.files == null || req.body.title == null || req.body.body == null) {
      console.log('you need to write a post with stuff to publish')
      return res.redirect('/posts/new')
    }
    next()
  }