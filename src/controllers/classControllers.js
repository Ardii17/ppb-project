const pool = require("../config/database");

class ClassController {
  // Create a new class
  async createClass(req, res) {
    try {
      const { nama_class, deskripsi, hari, teacher, time } = req.body;

      // Validate required fields
      if (!nama_class || !hari || !teacher || !time) {
        return res.status(400).json({
          message: "Missing required fields",
          required: ["nama_class", "hari", "teacher", "time"]
        });
      }

      // Validate time format (HH:mm:ss)
      const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/;
      if (!timeRegex.test(time)) {
        return res.status(400).json({
          message: "Invalid time format. Please use HH:mm:ss format"
        });
      }

      // Validate day
      const validDays = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];
      if (!validDays.includes(hari)) {
        return res.status(400).json({
          message: "Invalid day. Please use one of: " + validDays.join(', ')
        });
      }

      // Sanitize and trim input
      const sanitizedData = {
        nama_class: nama_class.trim(),
        deskripsi: deskripsi ? deskripsi.trim() : null,
        hari: hari.trim(),
        teacher: teacher.trim(),
        time: time.trim()
      };

      const [result] = await pool.execute(
        `INSERT INTO class (
          nama_class, 
          deskripsi, 
          hari, 
          teacher, 
          time, 
          created_at
        ) VALUES (?, ?, ?, ?, ?, NOW())`,
        [
          sanitizedData.nama_class,
          sanitizedData.deskripsi,
          sanitizedData.hari,
          sanitizedData.teacher,
          sanitizedData.time
        ]
      );

      res.status(201).json({
        message: "Class created successfully",
        id: result.insertId,
        data: sanitizedData
      });
    } catch (error) {
      console.error("Error creating class:", error);
      
      // Handle specific database errors
      if (error.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({
          message: "Class with this name already exists",
          error: error.message
        });
      }

      res.status(500).json({
        message: "Failed to create class",
        error: error.message
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
