class appError extends Error {
  constructor(err, message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.error = err;
    this.status = `${statusCode}`.startsWith("4")
      ? "operational error"
      : "server error";
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = appError;
