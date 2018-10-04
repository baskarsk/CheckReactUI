/**
 * This is the entry point of the code.
 * @author : Bala
 * File Name : main.js
 * Created Date : 14th Nov 2017
 */

import 'babel-polyfill';
import jquery from 'jquery';
import React from 'react';
import {render} from 'react-dom';
import configureStore from './store/configureStore';
import {Provider} from 'react-redux';
import {Router, browserHistory} from 'react-router';
import routes from './routes';
import './css/style.css';
import $ from 'jquery';
import 'bxslider';
import './css/jquery.bxslider.css';
import throttle from 'lodash/throttle';
import {saveState} from './store/retainState';
import _lodash from 'lodash';
import * as sessionStorageDataActions from './actions/common/sessionStorageDataActions';

const store = configureStore();

store.subscribe(throttle(()=>{
	saveState(store.getState());
}, 1000));

render (
	<Provider store={store}>
		<Router history={browserHistory}>
			{
				routes
			}
		</Router>
	</Provider>,
	document.getElementById('app')
);
