const Login = require("../models/tutorial.model.js");

module.exports = app => {
  const Login = require("../controllers/tutorials.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/postData", Login.create);

  // Retrieve all Tutorials
  router.get("/getAll", Login.findAll);

  // Retrieve all published Tutorials 
  router.get("/published", Login.findAllPublished);

  // Retrieve a single Tutorial with id
  router.get("/:id", Login.findOne);

  // Update a Tutorial with id
  router.put("/:id", Login.update);

  // Delete a Tutorial with id
  router.delete("/:id", Login.delete);

  // Delete all Tutorials
  router.delete("/", Login.deleteAll);

  app.use('/api/tutorials', router);
};
