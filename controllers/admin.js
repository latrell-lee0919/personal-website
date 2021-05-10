exports.getAdminPage = (req, res) => {
  res.render("admin/add-blog", {
    pageTitle: "Add New Blog",
    path: "/admin",
    isAdmin: req.session.isLoggedIn,
  });
};
