const express = require("express");
const cors = require("cors");
const classRoutes = require("./src/routes/classRoutes");
const assignmentRoutes = require("./src/routes/assignRoutes");
const materiRoutes = require("./src/routes/materiRoutes");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api", classRoutes);
app.use("/api", assignmentRoutes);
app.use("/api/materi", materiRoutes);

app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});
