import { takeEvery, select, call } from 'redux-saga/effects';
import { IMAGES } from '../constants';
import { fetchImages } from '../api';

const getPage = (state) => state.nextPage;

function* handleImagesLoad() {
	try {
		const page = yield select(getPage);
		const images = yield call(fetchImages, page);
		console.log('page ==>', page);
	} catch (err) {}
}

function* watchImagesLoad() {
	yield takeEvery(IMAGES.LOAD, handleImagesLoad);
}

export default watchImagesLoad;
