/**
 * This is the file where the action for login authentication
 * @author : Bala
 * File Name : loginAction
 * Path : src/actions/
 * Created Date : 15th Nov 2017
 */

import * as types from '../common/actionTypes';
import entitiesApi  from '../../entities/entitiesApi';
import config from '../../config';

import * as sessionStorageDataActions from '../common/sessionStorageDataActions';


export function userInfoSuccess(userInfo) {
	return {
		type: types.USER_INFO_SUCCESS,
		userInfo
	};
}
export function removeUserInfoSuccess(userInfo) {
	return {
		type: types.REMOVE_USER_INFO_SUCCESS,
		userInfo
	};
}
export function removeUserInfo() {
	return function(dispatch) {
		let clearUserInfo = {};
		dispatch(removeUserInfoSuccess(clearUserInfo));		
	}
}

export function loadUserInfo(contextPassed,userName,accessToken) {
    return function(dispatch) {
    	let myinit = {
        	headers:{'Accept':'application/json','Content-Type': 'application/json','Authorization':accessToken},
			method:'GET'
		}
		
		let url=config.domainUrl+'user/'+userName+'/';

		return entitiesApi(url,myinit).then(function(response) {
				if (response.status >= 200 && response.status < 300) {
						return response;
				} else {
					let error = new Error(response.status);
					error.response = response;
					throw error;
				}
			})
			.then(function(response) {
				return response.json();
			})
			.then(function(data) {
				if(data.errorCode){
					console.log('show the error msg to the user.')
				} else{
					dispatch(userInfoSuccess(data));
					contextPassed.context.router.push('/');
				}
			}).catch(function(error) {
				throw (error);
			});
    };
}
