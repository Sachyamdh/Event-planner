const AppError = require("../middleware/errorHandler");

//creating a try Catch block to catch errors in our server
const tryCatch = (controller) => async (req, res, next) => {
  try {
    await controller(req, res, next);
  } catch (err) {

    return next(new AppError(err, err.message, 404));
  }
};

module.exports = tryCatch;
