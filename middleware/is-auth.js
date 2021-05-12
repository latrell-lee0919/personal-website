module.exports = (req, res, next) => {
    if (!req.session.isLoggedIn) {
        return res.status(404).render("404", {
          pageTitle: "Page not found",
          heading: "Wrong page?",
          path: "",
          isAdmin: req.isLoggedIn,
        })
      }
      next();
}