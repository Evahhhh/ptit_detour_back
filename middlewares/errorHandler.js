const ErrorResponse = require("../util/errorResponse");

module.exports.notFound = (req, res, next) => {
  const error = new ErrorResponse(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

module.exports.errorHandler = (err, req, res, next) => {
  console.log(err.message.red);
  console.log(err.stack.red);

  const statusCode = err.statusCode ? err.statusCode : 500;

  res.status(statusCode).json({
    errors: {
      body: [err.message],
    },
  });
};
