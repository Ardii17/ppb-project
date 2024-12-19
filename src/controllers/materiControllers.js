const pool = require("../config/database");
const ResponseHandler = require("../utils/responseHandler");
const fs = require("fs").promises;
const path = require("path");

class MateriController {
  // Upload File dengan Validasi
  static async uploadMateri(req, res) {
    try {
      const { class_id, judul, deskripsi } = req.body;
      const file = req.file;

      if (!file) {
        return ResponseHandler.error(res, "File tidak ditemukan", 400);
      }

      const allowedTypes = ["pdf", "ppt", "pptx", "doc", "docx", "jpg", "png"];
      const fileExt = path.extname(file.originalname).toLowerCase().slice(1);

      if (!allowedTypes.includes(fileExt)) {
        await fs.unlink(file.path);
        return ResponseHandler.error(res, "Tipe file tidak diizinkan", 400);
      }

      const [result] = await pool.query(
        "INSERT INTO materi (class_id, judul, deskripsi, nama_file, tipe_file, ukuran_file, file_path) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [
          class_id,
          judul,
          deskripsi,
          file.originalname,
          fileExt,
          file.size,
          file.path,
        ]
      );

      ResponseHandler.success(
        res,
        { id: result.insertId },
        "Materi berhasil diunggah",
        201
      );
    } catch (error) {
      ResponseHandler.error(res, error.message);
    }
  }

  // Pencarian Materi dengan Filter Kompleks
  static async searchMateri(req, res) {
    try {
      const { keyword, class_id, tipe_file } = req.query;

      let query = `
        SELECT m.*, c.nama_class 
        FROM materi m
        JOIN class c ON m.class_id = c.id
        WHERE 1=1
      `;
      const params = [];

      if (keyword) {
        query += " AND (m.judul LIKE ? OR m.deskripsi LIKE ?)";
        params.push(`%${keyword}%`, `%${keyword}%`);
      }

      if (class_id) {
        query += " AND m.class_id = ?";
        params.push(class_id);
      }

      if (tipe_file) {
        query += " AND m.tipe_file = ?";
        params.push(tipe_file);
      }

      const [materi] = await pool.query(query, params);
      ResponseHandler.success(res, materi);
    } catch (error) {
      ResponseHandler.error(res, error.message);
    }
  }
}

module.exports = MateriController;
