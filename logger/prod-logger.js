const { createLogger, format, transports } = require('winston');
const { combine, timestamp, errors } = format;

function buildProdLogger() {
	return createLogger({
		format: combine(format.colorize(), timestamp(), errors({ stack: true })),
		level: 'debug',
		transports: [
			new transports.File({
				filename: 'logs/error.log',
				level: 'error',
			}),
			new transports.File({
				filename: 'logs/debug.log',
				level: 'debug',
			}),
		],
	});
}

module.exports = buildProdLogger;
