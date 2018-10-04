/**
 * This is the file with the action for login authentication.
 * @author : Bala
 * File Name : loginAction
 * Path : src/actions/
 * Created Date : 15th Nov 2017
 */

import * as types from '../common/actionTypes';
import entitiesApi  from '../../entities/entitiesApi';
import config from '../../config';

import * as sessionStorageDataActions from '../common/sessionStorageDataActions';


export function loginSuccess(loginInfo) {

	//Matomo Integration for tracking User ID upon successful login
	_paq.push(['trackPageView']);
        _paq.push(['enableLinkTracking']);

	return {
		type: types.LOGIN_SUCCESS,
		loginInfo
	};
}
export function logoutSuccess(loginInfo) {
	return {
		type: types.LOGOUT_SUCCESS,
		loginInfo
	};
}
export function loadLogout(contextPassed) {
	return function(dispatch) {
		let clearLoginInfo = {};
		dispatch(logoutSuccess(clearLoginInfo));
		contextPassed.context.router.push('/');
		sessionStorage.removeItem('userName');
	}
}

export function loadLogin(userName,pwd) {
    return function(dispatch) {
    	let myinit = {
        	headers:{'Accept':'application/json','Content-Type': 'application/json'},
			method:'POST',
			body: JSON.stringify({
				'userName': userName,
				'password': pwd
			})
		}
		
		let url=config.domainUrl+'login';

		return entitiesApi(url,myinit).then(function(response) {
				if (response.status >= 200 && response.status < 300) {
						return response;
				} else {
					let error = new Error(response.status);
					error.response = response;
					throw error;
				}
			})
			.then(function(data) {
				if(data.errorCode){
					console.log('show the error msg to the user.')
				} else{
					let tokenDetails = {};
					tokenDetails.accessToken =  data.headers.get('Authorization');
					
	//Matomo Integration for tracking User ID upon successful login		
					_paq.push(['setUserId', userName]);
				        _paq.push(['trackEvent', 'Successful_Login', 'LoginButton', 'BODHA']);
					
					dispatch(loginSuccess(tokenDetails));
					$(".LoginDetials").css("display","none");
				}
			}).catch(function(error) {
	//Matomo Integration for tracking unsuccessful logins	
		_paq.push(['trackEvent', 'Unsuccessful_Login', 'LoginButton', 'BODHA']);
				$(".ErrorTxt").text("Please enter the valid username / password.");
				throw (error);
			});
    };
}
