const User = require("../models/user");

const bcrypt = require('bcryptjs');

exports.getUsers = (req, res) => {
    User.find()
      .then((users) => {
        res.json(users);
      })
      .catch((err) => {
        res.json(err);
      });
}

exports.deleteUsers = (req, res) => {
    User.findByIdAndDelete(req.params.id)
      .then(() => {
        User.find()
        .then((users) => {
          res.json(users)
        })
      })
      .catch((err) => {
        res.json(err);
      })
}

exports.postUser = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    bcrypt.hash(password, 12)
    .then(hashedPassword => {
        const user = new User({
            email: email,
            password: hashedPassword
        })
        console.log(user);
        return user.save();
    })
    .then(user => {
        res.json(user);
    })
    .catch(err => {
        res.json(err);
    })
}