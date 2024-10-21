const express = require('express')
const app = new express()
const path = require('path')
const mongoose = require('mongoose')
const ejs = require('ejs')
const bodyParser = require('body-parser')
const BlogPost = require('./public/models/BlogPost')
const newPostController = require('./public/controllers/newPost')

const homeController = require('./public/controllers/home')
const storePostController = require('./public/controllers/storePost')
const getPostController = require('./public/controllers/getPost')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'ejs')
const fileUpload = require('express-fileupload')
app.use(fileUpload())
mongoose.connect('mongodb://localhost/my_database')
app.use(express.static('public'))
app.get('posts/new', newPostController)
app.get('/', async (req, res) => {
  const blogposts = await BlogPost.find({})
  res.render('index', { blogposts })
})


app.get('/', homeController)

app.get('/post/:id',getPostController)

app.post('/posts/store', storePostController)

app.get('/about', (req, res) => {
  res.render('about')
})

app.get('/contact', (req, res) => {
  res.render('contact')
})
const validationMiddleWare = (req, res, next) => {
  if (req.files == null || req.body.title == null || req.body.body == null) {
    console.log('you need to write a post with stuff to publish')
    return res.redirect('/posts/new')
  }
  next()
}
app.use('/posts/store', validationMiddleWare)
app.delete('/posts/:id', async (req, res) => {
  const blogpost = await BlogPost.findById(req.params.id)
  console.log(blogpost + 'has been deleted')
  res.sendStatus(200)
})

app.listen(3000, () => {
  console.log('app listening on 3000')
})

app.all('*', (req, res) => {
  res.render('error');
})