const errorMiddleware = (
  err,
  req,
  res,
  next
) => {
  let statusCode = err.statusCode || 500;

  let message =
    err.message || "Internal Server Error";

  // Mongo duplicate key error

  if (err.code === 11000) {
    statusCode = 400;
    message = "Duplicate field value";
  }

  // Invalid Mongo ID

  if (err.name === "CastError") {
    statusCode = 400;
    message = "Invalid ID";
  }

  res.status(statusCode).json({
    success: false,
    message,
  });
};

export default errorMiddleware;