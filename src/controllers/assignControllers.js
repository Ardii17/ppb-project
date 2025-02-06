const pool = require("../config/database");

class AssignmentController {
  static async readAssignments(req, res) {
    try {
      const query = "SELECT * FROM task";

      const [rows] = await pool.query(query);
      res.status(200).json(rows);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }

  static async createAssignments(req, res) {
    try {
      const { judul, deskripsi, deadline } = req.body;

      const query =
        "INSERT INTO task (judul, deskripsi, deadline, status, created_at) VALUES (?, ?, ?, false, NOW())";

      const [result] = await pool.execute(query, [judul, deskripsi, deadline]);
      res.status(200).json({
        message: "Assignment created successfully",
        id: result.insertId,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }

  static async updateAssignments(req, res) {
    try {
      const { id } = req.params;
      const { judul, deskripsi, deadline, status } = req.body;
      const query =
        "UPDATE task SET judul = ?, deskripsi = ?, deadline = ?, status = ? WHERE id = ?";

      const [result] = await pool.execute(query, [
        judul,
        deskripsi,
        deadline,
        status,
        id,
      ]);

      res.status(200).json({
        message: "Assignment updated successfully",
        id: result.insertId,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }

  static async deleteAssignments(req, res) {
    try {
      const { id } = req.params;
      const query = "DELETE FROM task WHERE id = ?";

      const [result] = await pool.execute(query, [id]);
      res.status(200).json({
        message: "Assignment deleted successfully",
        id: result.insertId,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
}

module.exports = AssignmentController;
