class appError extends Error {
  constructor(err, message, statusCode) {
    super(message);

    this.error = err;
    this.message = message;
    this.status = `${statusCode}`.startsWith("4")
      ? "server error"
      : "operational error";
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = appError;
