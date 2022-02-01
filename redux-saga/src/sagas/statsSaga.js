import { call, fork, take, put } from 'redux-saga/effects';
import { IMAGES } from '../constants';
import { fetchImageStats } from '../api';
import { loadImageStats, setImageStats, setImageStatsError } from '../actions';

export function* handleStatsRequest(imageId) {
	for (let i = 0; i < 3; i++) {
		try {
			yield put(loadImageStats(imageId));
			const res = yield call(fetchImageStats, imageId);
			yield put(setImageStats(imageId, res.downloads.total));
			return true;
		} catch (err) {
			console.log('imageStats failure error ', err);
		}
	}
	yield put(setImageStatsError(imageId));
}
export default function* watchStatsRequest() {
	while (true) {
		const { images } = yield take(IMAGES.LOAD_SUCCESS);
		for (let i = 0; i < images.length; i++) {
			yield fork(handleStatsRequest, images[i].id);
		}
	}
}
