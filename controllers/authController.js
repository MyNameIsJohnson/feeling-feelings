const db = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = (req, res) => {
  db.User.findOne({email: req.body.email}, (err, foundUser) => {
    if (err) return res.status(400).json({
      status: 400,
      message: 'Something went wrong, please try again'
    });
    if (foundUser) return res.status(400).json({
      status: 400,
      message: 'Email has already been registered, please try again'
    });
    bcrypt.genSalt(10, (err, salt)=> {
      if (err) return res.status(400).json({
        status: 400,
        message: 'Something went wrong, please try again'
      });
      bcrypt.hash(req.body.password, salt, (err, hash) => {
        if (err) return res.status(400).json({
          status: 400,
          message: 'Something went wrong, please try again'
        });
        const { firstName, lastName, email } = req.body;
        const newUser = {
          firstName,
          lastName,
          email,
          password: hash,
        };
        db.User.create(newUser, (err, createdUser) => {
          if (err) return res.status(400).json({
            status: 400,
            message: 'Something went wrong, please try again'
          });
      
          res.status(201).json({status: 201, message: 'Success'});
        });
      });
    });
  });
};

const login = (req, res) => {
  db.User.findOne({email: req.body.email}, '+password', (err, foundUser) => {
    if (err) return res.status(400).json({
      status: 400,
      error: 'Something went wrong. Please try again',
    });

    if (!foundUser) {
      return res.status(400).json({
        status: 400,
        error: 'Username or password is incorrect',
      });
    }

    bcrypt.compare(req.body.password, foundUser.password, (err, isMatch) => {
      if (err) return res.status(400).json({
        status: 400,
        error: 'Something went wrong. Please try again',
      });

      if (isMatch) {

        const currentUser = {
          _id: foundUser._id,
          firstName: foundUser.firstName,
          lastName: foundUser.lastName,
          email: foundUser.email,
        }

        req.session.currentUser = currentUser;
        return res.status(200).json({
          status: 200,
          user: currentUser,
        });
      } else {

        return res.json({
          status: 400,
          error: 'Username or password is incorrect',
        });
      }
    });
  });
};

const logout = (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({
      status: 401,
      message: 'Unauthorized, please login and try again'
    });
  }

  req.session.destroy((err) => {
    if (err) return res.status(400).json({
      status: 400,
      error: 'Something went wrong, please try again',
    });
    
    res.json({status: 200});
    res.redirect('/login');
  });
};

const verify = (req, res) => {

  if (req.session.user) {
    return res.json({
      status: 200,
      message: 'Authorized',
      user: req.session.user
    });
  }

  res.status(401).json({
    status: 401,
    message: 'Unauthorized. Please login and try again'
  });
};

module.exports = {
  register,
  login,
  logout,
  verify,
};
