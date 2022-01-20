import express from 'express';
import cors from 'cors';
import db from './models/index';
import tutorialRoutes from './controllers';

const PORT = process.env.port || 8081;
var corsOptions = { origin: 'http://localhost:8081' };
const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// database connection setup

db.sequelize.sync({ logging: console.log, force: false }).then(() => {
	console.log('Drop and now not re-sync db.');
});

app.use('/tutorial', tutorialRoutes);

app.listen(PORT, () => {
	console.log('server is listening on port ', PORT);
});
