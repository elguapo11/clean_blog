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
      // Pass errors to the view
      return res.render('register', { errors: validationErrors });
    }
    console.log(error);
    res.redirect('/auth/register');
  }
};