const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  category: String,
  title: String,
  previewDescription: String,
  imageUrl: String,
  description: String,
  link: String,
  gitHubLink: String,
  techStack: String,
  videoTitle: String
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
