const express = require('express')
const app = new express()
const path = require('path')
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'pages/index.html'))
})

app.get('/about', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'pages/about.html'))
})
app.get('/contact', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'pages/about.html'))
})
app.get('/post', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'pages/post.html'))
})

app.listen(4000, () => {
  console.log('app listening on 4000')
})

// this isn't working
