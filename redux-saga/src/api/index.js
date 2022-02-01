import axios from 'axios';

const key = 'vGqrVdkNaGth_IqRANV6MyeRxEORRF0n82IEOLsOvs4';
const URL = 'https://api.unsplash.com/photos/';
const fetchImages = async (page) => {
	let response = await axios.get(
		`${URL}?client_id=${key}&per_page=24&page=${page}`
	);
	let data = response.json();
	console.log('jsonData ==>', data);
	if (response.status >= 400) {
		console.log('response ==>', response);
		throw new Error(data.errors);
	}
	return data;
};

export { fetchImages };
