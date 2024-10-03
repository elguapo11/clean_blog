const mongoose = require('mongoose')
const BlogPost = require('./BlogPost')

mongoose.connect('mongodb://localhost/my_database')

BlogPost.create({
  title: 'This is a test for visualizing mongodb + benny',
  body: 'And this is the body of my test',
})

console.log(BlogPost.find({ title: 'This is a test for visualizing mongodb' }))
