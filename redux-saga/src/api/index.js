import axios from 'axios';

const key = 'vGqrVdkNaGth_IqRANV6MyeRxEORRF0n82IEOLsOvs4';
const URL = 'https://api.unsplash.com/photos/';

const fetchImages = async (page) => {
	try {
		let response = await axios.get(
			`${URL}?client_id=${key}&per_page=24&page=${page}`
		);
		let data = response.data;
		if (response.status >= 400) throw new Error(data.errors);

		return data;
	} catch (err) {
		throw new Error(err.response.data.errors);
	}
};

const fetchImageStats = async (imageId) => {
	try {
		let response = await axios.get(
			`${URL}/${imageId}/statistics/?client_id=${key}`
		);
		let data = response.data;
		console.log('imageStats response ==>', response);
		if (response.status >= 400) throw new Error(data.errors);

		return data;
	} catch (err) {
		throw new Error(err.response.data.errors);
	}
};

export { fetchImages, fetchImageStats };
