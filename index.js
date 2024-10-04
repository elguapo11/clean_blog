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

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index')
})

mongoose.connect('mongodb://localhost/my_database')

app.get('/about', (req, res) => {
  res.render('about')
})

app.get('/posts/new', (req, res) => {
  res.render('create')
})
app.get('/contact', (req, res) => {
  res.render('contact')
})
app.get('/post', (req, res) => {
  res.render('post')
})
app.post('/posts/store', async (req, res) => {
  await BlogPost.create(req.body)
  console.log(req.body)
  console.log('post submitted')
  res.redirect('/')
})

app.listen(3000, () => {
  console.log('app listening on 3000')
})
