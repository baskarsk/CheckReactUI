import {createStore, applyMiddleware, compose} from 'redux';
import rootReducer from '../reducers/common/index';
import thunk from 'redux-thunk';
import {loadState} from './retainState';

export default function configureStore(initialState){
	let retainedState = loadState();
	return createStore(
		rootReducer,
		retainedState,
		applyMiddleware(thunk)
	);
}
