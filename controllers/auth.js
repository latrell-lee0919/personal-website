const User = require("../models/user");
const bcrypt = require('bcryptjs');

exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    heading: "Login",
    isAdmin: req.session.isLoggedIn,
  });
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email: email })
    .then((user) => {
      bcrypt
      .compare(password, user.password)
      .then(match => {
        if(match) {
          req.session.isLoggedIn = true;
          req.session.user = user;
          console.log(user)
          return req.session.save(err => {
            console.log(err);
            res.redirect('/');
          })
        }
        res.redirect('/login');
      })
      .catch(err => {
        console.log(err);
        res.redirect('/login')
      });
    })
    .catch((err) => console.log(err));
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect("/");
  });
};
