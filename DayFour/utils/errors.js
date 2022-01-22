const showError = (message, error) => {
	return res.status(400).json({
		message: message,
		errors: error.errors,
		status: 400,
	});
};

module.exports = { showError };
