const express = require("express");
const AssignController = require("../controllers/assignControllers");
const router = express.Router();

router.get("/", AssignController.getAssignmentsByClass);
router.post("/", AssignController.createAssignments);

module.exports = router;
