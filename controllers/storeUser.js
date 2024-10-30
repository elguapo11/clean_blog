const User = require('../models/User.js');
const path = require('path');

module.exports = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.redirect('/');
  } catch (error) {
    if (error.name === 'ValidationError') {
      const validationErrors = Object.keys(error.errors).map(
        key => error.errors[key].message
      );
      req.flash('validationErrors', validationErrors)
      req.flash('data', req.body);
      console.log(req.body[0])
      return res.render('register', { errors: validationErrors });
    }
    console.log(error);
    res.redirect('/auth/register');
  }
};