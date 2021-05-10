const express = require("express");
const router = express.Router();
const Blog = require("../models/blogs");
const blogController = require("../controllers/blog");

router.get("/", blogController.getBlogPreview);

router.get("/:id", blogController.getBlog);

router.get("/blog/data", (req, res) => {
  Blog.find()
    .then((blogs) => {
      res.json(blogs);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.post("/", (req, res) => {
  const blog = new Blog();
  blog.title = req.body.title;
  blog.description = req.body.description;
  blog.previewDescription = req.body.previewDescription;
  blog.date = req.body.date;
  blog.imageUrl = req.body.imageUrl;
  blog
    .save()
    .then((newBlog) => {
      res.redirect("/blogs");
    })
    .catch((err) => {
      res.json(err);
    });
});

router.delete("/:id", (req, res) => {
  Blog.findByIdAndDelete(req.params.id)
    .then(() => {
      Blog.find().then((blogs) => {
        // res.json(blogs);
        res.render("blog/blog-preview", {
          blogs: blogs,
          pageTitle: "Blogs",
          path: "/blogs",
          isAdmin: req.session.isLoggedIn,
        });
      });
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = {
  routes: router,
};
