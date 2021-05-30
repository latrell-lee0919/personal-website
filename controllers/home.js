const AWS = require('aws-sdk');
const Instagram = require('instagram-web-api');
const User = require('../models/user');
require('dotenv').config();
const username = process.env.username;
const password = process.env.password;

exports.getSections = (req, res, next) => {
    const client = new Instagram({ username, password })
    client
      .login()
      .then(() => {
        client
          .getProfile()
          .then(console.log(client.getProfile()))
      })
    const file = 'Headshot.JPG';
    const s3 = new AWS.S3({});
    let base64;
    const params = {
      Bucket: 'mywebsitepictures',
      Key: file
    };
    s3.getObject(params, function(err, data) {
      if (err) {
        console.log(err, err.stack);
      }
      else {
        base64 = data.Body.toString('base64');
        let src = "data:image/jpeg;base64,"+base64;
        res.render("home/home", {
          pageTitle: "Home",
          heading: "Welcome!",
          path: "/",
          isAdmin: req.session.isLoggedIn,
          imageURL: src
        });
      }
    })
  }