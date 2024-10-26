const User = require('../models/User.js')
const path = require('path')

module.exports = async (req, res) => {
  try {
      const user = await User.create(req.body);
      if(error) {
        return res.redirect('/auth/register')
      }
      res.redirect('/');
  } catch (error) {
      console.log(error)
      res.redirect('/auth/register');
  }
};