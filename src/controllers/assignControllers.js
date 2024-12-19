const pool = require("../config/database");
const ResponseHandler = require("../utils/responseHandler");

class AssignmentController {
  // Bulk Insert
  static async createAssignments(req, res) {
    const connection = await pool.getConnection();
    try {
      await connection.beginTransaction();

      const assignments = req.body;
      const results = [];

      for (const assignment of assignments) {
        const { class_id, judul, deskripsi, deadline } = assignment;
        const [result] = await connection.query(
          "INSERT INTO assignment (class_id, judul, deskripsi, deadline) VALUES (?, ?, ?, ?)",
          [class_id, judul, deskripsi, deadline]
        );
        results.push(result.insertId);
      }

      await connection.commit();
      ResponseHandler.success(
        res,
        { ids: results },
        "Assignments berhasil dibuat",
        201
      );
    } catch (error) {
      await connection.rollback();
      ResponseHandler.error(res, error.message);
    } finally {
      connection.release();
    }
  }

  // Kompleks Query dengan Join
  static async getAssignmentsByClass(req, res) {
    try {
      const { class_id } = req.params;
      const [assignments] = await pool.query(
        `
        SELECT a.*, c.nama_class 
        FROM assignment a
        JOIN class c ON a.class_id = c.id
        WHERE a.class_id = ? 
        ORDER BY a.deadline
      `,
        [class_id]
      );

      ResponseHandler.success(res, assignments);
    } catch (error) {
      ResponseHandler.error(res, error.message);
    }
  }
}

module.exports = AssignmentController;
