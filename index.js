require("dotenv").config();
const compression = require('compression')
const express = require('express')
const mongoose = require('mongoose')
const flash = require('connect-flash');

const { PORT, SECRET, CONNECTION_STRING, } = process.env;

mongoose.connect(CONNECTION_STRING)
.then(() => console.log('Connected to MongoDB'))
.catch((error) => console.error('Connection error:', error));



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
app.use(compression())

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})

const homeController = require('./controllers/home')


app.get('/', homeController)


app.use((req, res) => {
  res.render('notfound')
})
