const express = require('express');
const dotenv = require('dotenv');
const logger = require('morgan');

dotenv.config({ path: './.env' });
const apiRoutes = require('./routes');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', apiRoutes);

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log('server is running on port ', port);
});
