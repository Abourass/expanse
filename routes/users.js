const express = require('express');
const csrf = require('csurf');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const router = express.Router();
const bodyParser = require('body-parser');
const csrfProtection = csrf({ cookie: true });
const parseForm = bodyParser.urlencoded({ extended: false });

const User = mongoose.model('users'); // ===============================================> Load User Schema <====================

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* GET registration page */
router.get('/register', csrfProtection, function(req, res, next) {
  res.render('users/register', {
    title: 'Register | Expanse',
    csrfToken: req.csrfToken(),
  })
});

/* PUT registration page */
router.post('/register', csrfProtection, function(req, res, next) {
  const errorArray = [];
  if (req.body.fullName.length === 0) { errorArray.push({error: 'You must provide a name. Might I suggest Jon Doe? Or maybe Rusty Shakleford?' }); }
  if (req.body.email.length === 0) { errorArray.push({error: 'You must provide an email address to sign up. It\'s how you log in. C\'mon you knew that...' }); }
  if (req.body.password.length === 0) { errorArray.push({error: 'You must provide a password to sign up.' }); }
  if (req.body.password.length > 1 && req.body.password !== req.body.passwordConf) { errorArray.push({ error: 'Passwords do not match.' }); }
  if (req.body.password.length > 1 && req.body.password.length < 5) { errorArray.push({ error: 'Password does not meet complexity requirements.' }); }
  if (errorArray.length > 0) {
    res.render('index/register', {
      errorArray: errorArray,
      errorIsTrue: true,
      fullName: req.body.fullName,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      passwordConf: req.body.passwordConf,
      title: 'Register | Expanse',
      csrfToken: req.csrfToken(),
    });
  } else {
    User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        req.flash('error_msg', ' That email has been registered previously.');
        res.redirect('../../users/registration');
      } else {
        const newUser = new User({
          name: req.body.fullName,
          username: req.body.username,
          email: req.body.email.toLowerCase().trim(),
          password: req.body.password.trim(),
          userCreated: Date.now()
        });
        bcrypt.hash(newUser.password, 10, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser.save().catch(err => console.log(err));
          req.flash('success_msg', ' You are now through the tutorial, please log in to start');
          res.redirect('../../../../users/login');
        }).catch(err => console.log(err));
      }
    }).catch(err => console.log(err));
  }
});

/* GET registration page */
router.get('/login', csrfProtection, function(req, res, next) {
  res.render('users/login', {
    title: 'Login | Expanse',
    csrfToken: req.csrfToken(),
    login: true
  })
});

module.exports = router;
