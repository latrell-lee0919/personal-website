const express = require("express");
const router = express.Router();
const Project = require("../models/project");
const projectController = require("../controllers/project");

router.get("/", projectController.getProjectPreview);

router.get("/:id", projectController.getProject);

router.post("/", (req, res) => {
  const image = req.file;
  const imageURL = image.path;
  const project = new Project();
  project.category = req.body.category;
  project.title = req.body.title;
  project.previewDescription = req.body.previewDescription;
  project.imageUrl = imageURL;
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
        let webDev = [];
        let mobileDev = [];
        let machineLearning = [];
        projects.forEach(function (project) {
          let category = project.category;
          if (category == "Web Development") {
            webDev.push(project)
          } else if (category == "Mobile App Development") {
            mobileDev.push(project)
          } else if (category == "Machine Learning") {
            machineLearning.push(project)
          }
        })
          res.render("project/project-preview", {
            projects: projects,
            webDevelopment: webDev,
            mobileDevelopment: mobileDev,
            machineLearning: machineLearning,
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
