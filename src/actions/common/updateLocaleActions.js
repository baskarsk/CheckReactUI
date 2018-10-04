/**
 * This has the action items for load framework information page for the user selected platform.
 * @author : NagoorMeeral.Mydheen
 * File Name : updateLocaleAction.js
 * Path : src/actions/
 * Created Date : 15th June 2016
 */

import  * as types from './actionTypes';
import * as sessionStorageDataActions from '../common/sessionStorageDataActions';
let sessionStorageObj;
import $ from 'jquery';
export function updateLocaleSuccess (locale) {
	return {type : types.UPDATE_LOCALE,locale};
}

export function changeLocale() {
	sessionStorageObj = sessionStorageDataActions.getSessionData();
	return function(dispatch) {
		dispatch(updateLocaleSuccess(sessionStorageObj.locale));
	}
}
