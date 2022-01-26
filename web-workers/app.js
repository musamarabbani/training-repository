const http = require('http');
const fibonacci = require('./fibonacci');
const path = require('path');
const { fork } = require('child_process');

const port = 3000;
http
	.createServer((req, res) => {
		const url = new URL(req.url, `http://${req.headers.host}`);
		console.log('Incoming request to:', url.pathname);

		if (url.pathname === '/fibonacci') {
			const n = Number(url.searchParams.get('n'));
			console.log('Calculating fibonacci for', n);
			// const result = fibonacci(n);
			const childProcess = fork(path.join(__dirname + '/fibonacci-fork.js'));
			childProcess.on('message', (message) => {
				res.writeHead(200);
				return res.end(`Result: ${message}`);
			});
			childProcess.send(n);
		} else {
			res.writeHead(200);
			return res.end('Hello World!');
		}
	})
	.listen(port, () => console.log(`Listening on port ${port}...`));
