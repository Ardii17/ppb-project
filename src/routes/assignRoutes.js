const express = require("express");
const AssignController = require("../controllers/assignControllers");
const router = express.Router();

router.get("/assignments", AssignController.readAssignments);
router.post("/assignments", AssignController.createAssignments);
router.put("/assignments/:id", AssignController.updateAssignments);
router.delete("/assignments/:id", AssignController.deleteAssignments);

module.exports = router;
