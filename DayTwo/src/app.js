import express from 'express';

const app = express();
const port = 4000;

app.get('/', (req, res) => {
	console.log('this is home api end point.');
	res.send('success');
});

app.listen(port, (err) => {
	if (err) console.log('something went wrong');
	console.log('server is running on port 4000');
});
