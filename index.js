require("dotenv").config();
const compression = require('compression')
const express = require('express')

const { PORT, SECRET, CONNECTION_STRING } = process.env

// this connection string is going to change depending on the env

const app = new express()
const ejs = require('ejs')

app.set('view engine', 'ejs')

app.use(express.static('public'))
app.use(express.json())


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

