import { takeEvery, select, call, put } from 'redux-saga/effects';
import { IMAGES } from '../constants';
import { fetchImages } from '../api';
import { setImages, setError } from '../actions';

const getPage = (state) => state.nextPage;

function* handleImagesLoad() {
	try {
		console.log('come here');
		const page = yield select(getPage);
		debugger;
		const images = yield call(fetchImages, page);
		yield put(setImages(images));
	} catch (error) {
		yield put(setError(error.toString()));
	}
}

function* watchImagesLoad() {
	console.log('called from herer');
	yield takeEvery(IMAGES.LOAD, handleImagesLoad);
}

export default watchImagesLoad;
