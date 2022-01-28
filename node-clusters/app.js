const express = require('express');
const cluster = require('cluster');
const os = require('os');

const app = express();

const cpuNumbers = os.cpus().length;
const port = process.env.PORT || 3000;

// console.log('cpus ==>', os.cpus());

app.get('/', (req, res) => {
	res.status(200).json({ message: 'processPid ==>' + process.pid });
	cluster.worker.kill();
});

if (cluster.isMaster) {
	for (let i = 0; i < cpuNumbers; i++) {
		cluster.fork();
	}
	cluster.on('exit', (worker, code, signal) => {
		console.log(`worker ${worker.process.pid} died`);
		cluster.fork();
	});
} else {
	app.listen(port, () => {
		console.log(
			'port is listening on port ',
			port,
			'and process ',
			process.pid
		);
	});
}

// app.listen(3000, () => {
// 	// now here we will not be listening on this port.
// 	// if we are on a master process, we will fork a new worker process and will listen on our worker process
// 	// we will create as many worker processes as we have number of CPUs
// 	// this cluster module follows the round robin approach
//  // we will use loadtest/apache benchmark to test
//  // we re using loadtest by given below command
//  // loadtest -n 1000 -c 100 http://localhost:3000/
//  // -n number of requests -c number of concurrency and third parameter is api endpoint which we watn to test
// 	console.log('app is running on port 3000 ==>', process.pid);
// });
