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

app.set('view engine', 'ejs')

app.use(express.static('public'))
app.use(express.json())

app.use(flash())
app.use('*', (req, res, next) => {
  next()
})
app.use(compression())


app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})

const homeController = require('./controllers/home')


app.get('/', homeController)

app.use((req, res, next) => {
  res.status(404).render('notFound'); // Catch-all for nonexistent routes
}
);

