export class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

const errorMiddleware = (err, req, res, next) => {
  console.log("Error Middleware Invoked", err);
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal server error";

  if (err.name === "CastError") {
    message = `Invalid: Resource not found at ${err.path}`;
    statusCode = 404;
  }

  res.status(statusCode).json({
    success: false,
    message,
  });
};

export default errorMiddleware;
