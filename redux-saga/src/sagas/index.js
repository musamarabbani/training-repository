import { take, takeEvery, put, call } from 'redux-saga/effects';

function* workerSaga() {
	console.log('Im workerSaga');
	console.log(put({ type: 'ACTION_FROM_WORKER' }));
	yield put({ type: 'ACTION_FROM_WORKER' });
}

// watcher saga
function* rootSaga() {
	// yield takeEvery('HELLO', workerSaga);
	yield take('HELLO');
	yield call(workerSaga);
	console.log('root saga');
}

export default rootSaga;
