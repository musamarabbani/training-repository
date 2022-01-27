const express = require('express');
const logger = require('./logger');

logger.info('info text');
logger.warn('warn text');
logger.error('error text');
logger.debug('debug text');
logger.error(new Error('womething went wrong'));
// console.log(new Error('something went wrong'));
const app = express();

app.listen(3000, () => {
	console.log('app is running on port ', 3000);
});
