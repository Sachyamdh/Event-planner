const AppError = require("../middleware/errorHandler");

const handleCastError = (err) => {
  const message = `Invalid ${err.path}:${err.value}`;
  return new AppError(err, message, 400);
};

const handleValidationErrorDB = (err) => {
  console.log("yeta airako chaina");
  const message = `Invalid input data. ${errors.join(". ")}`;
  return new AppError("Validation Error", message, 400);
};

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err.error,
    message: err.message,
    stack: err.stack,
  });
};

const handleJWTError = (err) =>
  new AppError(err, "Invalid Token please enter again", 401);

const handleExpiryError = (err) => new AppError(err, "Login Timeout", 401);

const handleDuplicateEntry = async (err) => {
  const value = err.message.match(/(["'])(\\?.)*?\1/)[0];
  const message = `Duplcate field value: x, Please use another value`;
  throw new AppError(err.error, message, 400);
};

const sendErrorProduction = (err, res) => {
  //operational, trusted error: send message. These are errors from our hard code
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }
  //programming or other errors send minimum message. These are errors from our third party app
  else {
    console.error("Error", err);
    res.status(500).json({
      status: "error",
      message: "Something went wrong",
    });
  }
};

module.exports = async (err, req, res, next) => {
  let { ...error } = err;
  console.log(error.error.name,error.error.message);
  err.statusCode = error.statusCode || 500;
  err.status = error.status || "error";
  if (process.env.NODE_ENV === "dev") {
    sendErrorDev(error, res);
  } else if (process.env.NODE_ENV === "production") {
    if (err.statusCode === 500) {
      sendErrorProduction(error, res);
    }
  }
  //  else {
  //   //       if (err.name === "CastError") error = handleCastError(err.error);
  //   //       if (err.code === 11000) error = handleDuplicateEntry(err.error);
  //   //       if (err.error.name === "SequelizeValidationError")
  //   //         err = handleValidationErrorDB(err.error);
  //   //       //   if (error.error.name === "JsonWebTokenError")
  //   //       //     error = handleJWTError(err.error);
  //   //       //   if (error.error.name === "TokenExpiredError")
  //   //       //     error = handleExpiryError(err.error);
  //   //       //   sendErrorProduction(error, res);
  //       }
  //   }
};
