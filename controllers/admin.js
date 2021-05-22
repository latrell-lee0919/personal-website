exports.getAdminPage = (req, res) => {
  res.render("admin/add-project", {
    pageTitle: "Add New Project",
    path: "/admin",
    isAdmin: req.session.isLoggedIn,
  });
};
