import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import imagesReducer from './ImagesReducer';
import loadingReducer from './loadingReducer';

const rootReducer = combineReducers({
	isLoading: loadingReducer,
	images: imagesReducer,
	error: errorReducer,
});

export default rootReducer;
