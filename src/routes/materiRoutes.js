const express = require("express");
const MateriController = require("../controllers/materiControllers");
const router = express.Router();

router.get("/", MateriController.searchMateri);
router.post("/", MateriController.uploadMateri);

module.exports = router;
