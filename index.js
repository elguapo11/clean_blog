const express = require('express')
const app = new express()
const path = require('path')
const mongoose = require('mongoose')
const ejs = require('ejs')
const bodyParser = require('body-parser')
const BlogPost = require('./public/models/BlogPost')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'ejs')

mongoose.connect('mongodb://localhost/my_database')
app.use(express.static('public'))

app.get('/', async (req, res) => {
  const blogposts = await BlogPost.find({})
  console.log(blogposts)
  res.render('index', { blogposts })
})


app.get('/about', (req, res) => {
  res.render('about')
})

app.get('/posts/new', (req, res) => {
  res.render('create')
})
app.get('/contact', (req, res) => {
  res.render('contact')
})
app.get('/error', (req, res) => {
  res.send(404 + ' not found')
  console.log('oops')
})
app.get('/post/:id', async (req, res) => {
  const blogpost = await BlogPost.findById(req.params.id)
  res.render('post',{ blogpost })
})
app.post('/posts/store', async (req, res) => {
  await BlogPost.create(req.body)
  console.log(req.body)
  res.redirect('/')
})

app.delete('/posts/:id', async (req, res) => {
  const blogpost = await BlogPost.findById(req.params.id)
  console.log(blogpost + 'has been deleted')
  res.sendStatus(200)
})

app.listen(3000, () => {
  console.log('app listening on 3000')
})
