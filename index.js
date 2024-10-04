const express = require('express')
const app = new express()
const path = require('path')
const mongoose = require('mongoose')
const ejs = require('ejs')
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
app.post('/posts/store', (req, res) => {
  console.log(req.body)
  res.redirect('/')
})

app.listen(3000, () => {
  console.log('app listening on 3000')
})
