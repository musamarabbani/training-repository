const config = {
	HOST: 'localhost',
	USER: 'postgres',
	PASSWORD: 'root',
	DB: 'postgres',
	DIALECT: 'postgres',
	pool: {
		max: 5,
		min: 0,
		idle: 10000,
	},
};

export default config;
