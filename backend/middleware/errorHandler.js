const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  // PostgreSQL errors
  if (err.code) {
    switch (err.code) {
      case '23505': // Unique violation
        return res.status(400).json({
          success: false,
          error: 'Duplicate entry. This record already exists.'
        });
      case '23503': // Foreign key violation
        return res.status(400).json({
          success: false,
          error: 'Invalid reference. Related record does not exist.'
        });
      case '22P02': // Invalid text representation
        return res.status(400).json({
          success: false,
          error: 'Invalid input format.'
        });
      default:
        break;
    }
  }

  // Default error response
  const statusCode = err.statusCode || 500;
  const message = process.env.NODE_ENV === 'production'
    ? 'An unexpected error occurred'
    : err.message;

  res.status(statusCode).json({
    success: false,
    error: message,
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack })
  });
};

module.exports = errorHandler;