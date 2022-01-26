const http = require('http');
const fibonacciWorker = require('./fibonacci-worker');
const path = require('path');
const { fork } = require('child_process');

const port = 3000;
http
	.createServer(async (req, res) => {
		const url = new URL(req.url, `http://${req.headers.host}`);
		console.log('Incoming request to:', url.pathname);

		if (url.pathname === '/fibonacci') {
			const n = Number(url.searchParams.get('n'));
			console.log('Calculating fibonacci for', n);
			fibonacciWorker(n)
				.then((result) => {
					console.log('worker response ==>', result);
					res.writeHead(200);
					return res.end(`Result: ${result}\n`);
				})
				.catch((err) => {
					console.log('worker file error', err);
				});
		} else {
			res.writeHead(200);
			return res.end('Hello World!');
		}
	})
	.listen(port, () => console.log(`Listening on port ${port}...`));

// Also try to learn workerpool npm package to achieve the above functionality with workers
//  https://www.npmjs.com/package/workerpool
