const express = require('express')
const app = new express()
const mongoose = require('mongoose')
const ejs = require('ejs')
const expressSession = require('express-session')
const bodyParser = require('body-parser')
const BlogPost = require('./models/BlogPost')
const storeUserController = require('./controllers/storeUser')
const newPostController = require('./controllers/newPost')
const validationMiddleWare = require('./middleware/validationMiddleware')
const newUserController = require('./controllers/newUser')
const homeController = require('./controllers/home')
const storePostController = require('./controllers/storePost')
const getPostController = require('./controllers/getPost')
const loginController = require('./controllers/login')
const loginUserController = require('./controllers/loginUser')
const authMiddleware = require('./middleware/authMiddleware')
const redirectIfAuthenticatedMiddleware = require('./middleware/redirectIfAuthenticatedMiddleware')
const logoutController = require('./controllers/logout')



app.set('view engine', 'ejs')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
const fileUpload = require('express-fileupload')
const User = require('./models/User')
app.use(fileUpload())
mongoose.connect('mongodb://localhost/my_database')
app.use(express.static('public'))
app.use(expressSession({
  secret: 'keyboard cat'
}))
app.use('/posts/store', validationMiddleWare)
app.get('posts/new', newPostController)
app.get('/auth/register', redirectIfAuthenticatedMiddleware, newUserController)
app.get('/', homeController)
app.get('/posts/new', newPostController)
app.get('/post/:id',getPostController)
app.get('/auth/login', redirectIfAuthenticatedMiddleware, loginController)
app.get('/posts/new', authMiddleware, newPostController)
app.get('/contact', (req, res) => {
  res.render('contact')
})
app.get('/about', (req, res) => {
  res.render('about')
})
app.get('auth/logout', logoutController)
app.post('/posts/store', newPostController, storePostController)
app.post('/users/register', redirectIfAuthenticatedMiddleware, storeUserController)
app.post('/users/login', redirectIfAuthenticatedMiddleware, loginUserController)


app.delete('/posts/:id', async (req, res) => {
  const blogpost = await BlogPost.findById(req.params.id)
  console.log(blogpost + 'has been deleted')
  res.sendStatus(200)
})

app.use((req, res) => res.render('notFound'))
app.listen(3000, () => {
  console.log('app listening on 3000')
})

global.loggedIn = null

app.use('*', (req, res, next) => {
  loggedIn = req.session.userId
  next()
})