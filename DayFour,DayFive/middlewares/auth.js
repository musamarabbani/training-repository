const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
	try {
		let token = req.headers['authorization'].split(' ')[1];
		let decode = jwt.verify(token, process.env.SECRET);
		req.user = decode;
		next();
	} catch (err) {
		return res.status(401).json({ message: 'could not authenticate' });
	}
};

module.exports = { auth };
