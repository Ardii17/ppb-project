const express = require("express");
const ClassController = require("../controllers/classControllers"); // Adjust path as needed

const router = express.Router();

// CREATE - POST route to create a new class
router.post("/classes", ClassController.createClass);

// READ - GET route to fetch all classes
router.get("/classes", ClassController.getAllClasses);

// READ - GET route to fetch all classes
router.get("/classes/day/:day", ClassController.getClassByDay);

// READ - GET route to fetch a specific class by ID
router.get("/classes/:id", ClassController.getClassById);

// UPDATE - PUT route to update an existing class
router.put("/classes/:id", ClassController.updateClass);

// DELETE - DELETE route to remove a class
router.delete("/classes/:id", ClassController.deleteClass);

module.exports = router;
