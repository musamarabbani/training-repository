const cron = require('node-cron');

// Schedule tasks to be run on the server.
cron.schedule('* * * * * *', function () {
  console.log('running a task every second');
});

cron.schedule('* * 26 * *', () => {
  console.log('---------------------');
  console.log('Running Cron Job');
  fs.unlink('./error.log', (err) => {
    if (err) throw err;
    console.log('Error file successfully deleted');
  });
});

module.exports = { cron };
