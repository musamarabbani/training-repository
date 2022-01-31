import { take, takeEvery, put, call } from 'redux-saga/effects';

function* loginWorkerSaga() {
	console.log('loginWorkerSaga');
	yield put({ type: 'ACTION_FROM_WORKER' });
}

function* logoutWorkerSaga() {
	console.log('LOGOUT_PASS');
	yield put({ type: 'LOGOUT_PASS' });
}
// watcher saga
function* rootSaga() {
	// yield takeEvery('HELLO', workerSaga);
	yield take('LOGIN');
	yield call(loginWorkerSaga);
	yield take('LOGOUT');
	yield call(logoutWorkerSaga);
}

export default rootSaga;
