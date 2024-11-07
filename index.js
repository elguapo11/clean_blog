require("dotenv").config();
const express = require('express')
const mongoose = require('mongoose')
const flash = require('connect-flash');

const { PORT, SECRET, CONNECTION_STRING, } = process.env;


mongoose.connect(CONNECTION_STRING);



// this connection string is going to change depending on the env


const app = new express()
const ejs = require('ejs')

const fileUpload = require('express-fileupload')
const validateMiddleWare = require('./middleware/validationMiddleware')
const expressSession = require('express-session')
const authMiddleware = require('./middleware/authMiddleware')
const redirectIfAuthenticatedMiddleware = require('./middleware/redirectIfAuthenticatedMiddleware')

app.set('view engine', 'ejs')

global.loggedIn = null

app.use(express.static('public'))
app.use(express.json())
app.use(fileUpload())
app.use('/posts/store', validateMiddleWare)
app.use(
  expressSession({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
  })
)
app.use(flash())
app.use('*', (req, res, next) => {
  loggedIn = req.session.userId
  next()
})

app.listen(PORT, () => {
  console.log(`Lstening on port ${PORT}`)
})

const newPostController = require('./controllers/newPost')
const homeController = require('./controllers/home')
const storePostController = require('./controllers/storePost')
const getPostController = require('./controllers/getPost')
const newUserController = require('./controllers/newUser')
const storeUserController = require('./controllers/storeUser')
const loginController = require('./controllers/login')
const loginUserController = require('./controllers/loginUser')
const logoutController = require('./controllers/logout')

app.get('/', homeController)

app.get('/post/:id', getPostController)

app.get('/posts/new', authMiddleware, newPostController)

app.post('/posts/store', authMiddleware, storePostController)

app.get('/auth/register', redirectIfAuthenticatedMiddleware, newUserController)

app.post(
  '/users/register',
  redirectIfAuthenticatedMiddleware,
  storeUserController
)

app.get('/auth/login', redirectIfAuthenticatedMiddleware, loginController)

app.post('/users/login', redirectIfAuthenticatedMiddleware, loginUserController)

app.get('/auth/logout', logoutController)

app.use((req, res) => {
  res.render('notfound')
})
