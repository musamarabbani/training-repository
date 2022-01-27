const { createLogger, format, transports } = require('winston');
const { combine, level, timestamp, printf, errors } = format;

function buildDevLogger() {
	const logFormat = printf(({ level, message, timestamp, stack }) => {
		return `${timestamp} ${level}: ${stack || message}`;
	});

	return createLogger({
		format: combine(
			format.colorize(),
			timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
			errors({ stack: true }),
			logFormat
		),
		level: 'debug',
		transports: [
			new transports.File({
				filename: './logs/error.log',
				level: 'error',
			}),
			new transports.File({
				filename: './logs/debug.log',
				level: 'debug',
			}),
		],
	});
}

module.exports = buildDevLogger;
