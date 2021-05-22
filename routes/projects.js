const express = require("express");
const router = express.Router();
const Project = require("../models/project");
const projectController = require("../controllers/project");

router.get("/", projectController.getProjectPreview);

router.get("/:id", projectController.getProject);

router.get("/project/data", (req, res) => {
  Project.find()
    .then((projects) => {
      res.json(projects);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.post("/", (req, res) => {
  const project = new Project();
  project.category = req.body.category;
  project.title = req.body.title;
  project.previewDescription = req.body.previewDescription;
  project.imageUrl = req.body.imageUrl;
  project.description = req.body.description;
  project.link = req.body.link;
  project.gitHubLink = req.body.gitHubLink;
  project.techStack = req.body.techStack;
  project.videoTitle = req.body.videoTitle;
  
  project
    .save()
    .then((newProject) => {
      res.redirect("/projects");
    })
    .catch((err) => {
      res.json(err);
    });
});

router.delete("/:id", (req, res) => {
  Project.findByIdAndDelete(req.params.id)
    .then(() => {
      Project.find()
      .then((projects) => {
        // res.json(blogs);
        res.render("project/project-preview", {
          projects: projects,
          pageTitle: "Projects",
          path: "/projects",
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
