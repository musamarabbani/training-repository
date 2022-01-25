const showError = (message, error) =>
  res.status(400).json({
    message,
    errors: error.errors,
    status: 400,
  });

module.exports = { showError };
