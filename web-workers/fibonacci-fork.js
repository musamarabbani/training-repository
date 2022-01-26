function fibonacci(num) {
	if (num <= 1) return num;
	return fibonacci(num - 1) + fibonacci(num - 2);
}
process.on('message', (message) => {
	process.send(fibonacci(message));
	process.exit(0);
});
