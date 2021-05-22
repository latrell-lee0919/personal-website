const Project = require("../models/project");

exports.getProjectPreview = (req, res) => {
  Project.find()
    .then((projects) => {
      res.render("project/project-preview", {
        projects: projects,
        pageTitle: "Projects",
        path: "/projects",
        isAdmin: req.session.isLoggedIn,
      })
    })
    .catch((err) => {
      res.json(err)
    })
};

exports.getProject = (req, res) => {
  const projectId = req.params.id;
  Project.findById(projectId)
    .then((project) => {
      res.render("project/individual-project", {
        project: project,
        pageTitle: project.title,
        path: "/projects",
        isAdmin: req.session.isLoggedIn,
      });
    })
    .catch((err) => {
      res.render("404", {
        pageTitle: "Project Not Found",
        heading: "Wrong page?",
        path: "",
        isAdmin: req.session.isLoggedIn,
      })
    })
};
