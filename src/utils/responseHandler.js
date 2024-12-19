class ResponseHandler {
  static success(res, data, message = "Berhasil", statusCode = 200) {
    return res.status(statusCode).json({
      success: true,
      message,
      data,
    });
  }

  static error(res, message = "Terjadi kesalahan", statusCode = 500) {
    return res.status(statusCode).json({
      success: false,
      message,
    });
  }
}

module.exports = ResponseHandler;
