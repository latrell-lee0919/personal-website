const Blog = require("../models/blogs");

exports.getBlogPreview = (req, res) => {
  Blog.find()
    .then((blogs) => {
      res.render("blog/blog-preview", {
        blogs: blogs,
        pageTitle: "Blogs",
        path: "/blogs",
        isAdmin: req.session.isLoggedIn,
      })
    })
    .catch((err) => {
      res.json(err)
    })
};

exports.getBlog = (req, res) => {
  const blogId = req.params.id;
  Blog.findById(blogId)
    .then((blog) => {
      res.render("blog/individual-blog", {
        blog: blog,
        pageTitle: blog.title,
        path: "/blogs",
        isAdmin: req.session.isLoggedIn,
      });
    })
    .catch((err) => {
      res.render("404", {
        pageTitle: "Blog Not Found",
        heading: "Wrong page?",
        path: "",
        isAdmin: req.session.isLoggedIn,
      })
    })
};
