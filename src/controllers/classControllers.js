const pool = require("../config/database");

class ClassController {
  // Create a new class
  async createClass(req, res) {
    try {
      // Destructure with default values
      const {
        nama_class = null,
        deskripsi = null,
        hari = null,
        teacher = null,
        time = null,
      } = req.body;

      const [result] = await pool.execute(
        "INSERT INTO class (nama_class, deskripsi, hari, teacher, time, created_at) VALUES (?, ?, ?, ?, ?, NOW())",
        [nama_class, deskripsi, hari, teacher, time]
      );

      res.status(201).json({
        message: "Class created successfully",
        id: result.insertId,
      });
    } catch (error) {
      console.error("Error creating class:", error);
      res.status(500).json({
        message: "Failed to create class",
        error: error.message,
      });
    }
  }

  // Get all classes
  async getAllClasses(req, res) {
    try {
      const [rows] = await pool.execute("SELECT * FROM class");

      res.status(200).json(rows);
    } catch (error) {
      console.error("Error fetching classes:", error);
      res.status(500).json({
        message: "Failed to fetch classes",
        error: error.message,
      });
    }
  }

  // Get class by ID
  async getClassById(req, res) {
    try {
      const { id } = req.params;

      const [rows] = await pool.execute("SELECT * FROM class WHERE id = ?", [
        id,
      ]);

      if (rows.length === 0) {
        return res.status(404).json({ message: "Class not found" });
      }

      res.status(200).json(rows[0]);
    } catch (error) {
      console.error("Error fetching class:", error);
      res.status(500).json({
        message: "Failed to fetch class",
        error: error.message,
      });
    }
  }

  // Get class by ID
  async getClassByDay(req, res) {
    try {
      const { day } = req.params;

      const [rows] = await pool.execute("SELECT * FROM class WHERE hari = ?", [
        day,
      ]);

      if (rows.length === 0) {
        return res.status(404).json({ message: "Class not found" });
      }

      res.status(200).json(rows);
    } catch (error) {
      console.error("Error fetching class:", error);
      res.status(500).json({
        message: "Failed to fetch class",
        error: error.message,
      });
    }
  }

  // Update a class
  async updateClass(req, res) {
    try {
      const { id } = req.params;
      const { nama_class, deskripsi, hari, teacher, time } = req.body;

      const [result] = await pool.execute(
        "UPDATE class SET nama_class = ?, deskripsi = ?, hari = ?, teacher = ?, time = ? WHERE id = ?",
        [nama_class, deskripsi, hari, teacher, time, id]
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Class not found" });
      }

      res.status(200).json({ message: "Class updated successfully" });
    } catch (error) {
      console.error("Error updating class:", error);
      res.status(500).json({
        message: "Failed to update class",
        error: error.message,
      });
    }
  }

  // Delete a class
  async deleteClass(req, res) {
    try {
      const { id } = req.params;

      const [result] = await pool.execute("DELETE FROM class WHERE id = ?", [
        id,
      ]);

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Class not found" });
      }

      res.status(200).json({ message: "Class deleted successfully" });
    } catch (error) {
      console.error("Error deleting class:", error);
      res.status(500).json({
        message: "Failed to delete class",
        error: error.message,
      });
    }
  }
}

module.exports = new ClassController();
