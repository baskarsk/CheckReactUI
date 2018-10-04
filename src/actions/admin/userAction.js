/**
 * This is the file where actions related to user are present
 * @author : Anandi Yogeesan
 * File Name : userAction
 * Path : src/actions/content
 * Created Date : 27th Nov 2017
 */

import * as types from '../common/actionTypes';
import entitiesApi  from '../../entities/entitiesApi';
import config from '../../config';


export function loadUserSuccess(userList) {
	return {
		type: types.LOAD_USER_SUCCESS,
		userList
	};
}

export function loadUsers(accessToken){
	return function(dispatch){
		let myinit = {
				headers:{
								'Content-Type':'application/json',
								'Authorization':accessToken
							},
				method:'GET'
			}
		let url=config.domainUrl+'user';
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
				dispatch(loadUserSuccess(data));
			}
		}).catch(function(error) {
			throw (error);
		});
	};
}

export function getUserSuccess(userData) {
	return {
		type: types.GET_USER_SUCCESS,
		userData
	};
}

export function getUser(userName, accessToken){
	return function(dispatch){
		let myinit = {
				headers:{
								'Content-Type':'application/json',
								'Authorization':accessToken
							},
				method:'GET'
			}
		let url=config.domainUrl+'user/userName/'+userName+'/';
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
				console.log('Loading particular user failed!')
			} else{
				dispatch(getUserSuccess(data));
			}
		}).catch(function(error) {
			throw (error);
		});
	};
}

export function createUserSuccess(createdUserData) {
	return {
		type: types.CREATE_USER_SUCCESS,
		createdUserData
	};
}

export function createUser(userObj, accessToken){
	return function(dispatch){
		let myinit = {
				headers:{
								'Content-Type':'application/json',
								'Authorization':accessToken
							},
				method:'POST',
				body: JSON.stringify(userObj)
			}
		let url=config.domainUrl+'user/sign-up';
		return entitiesApi(url,myinit).then(function(response) {
			if (response.status >= 200 && response.status < 300) {
				//alert('User Successfully Created');
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
			if(data.status == "Failed"){
				alert(data.description);
			}else{
				alert('User Successfully Created');
			}
			if(data.errorCode){
				console.log('Role creation failed')
			} else{
				dispatch(createUserSuccess(data));
				dispatch(loadUsers(accessToken));
			}
		}).catch(function(error) {
			throw (error);
		});
	};
}

export function udpateUserSuccess(updatedUserData) {
	return {
		type: types.UPDATE_USER_SUCCESS,
		updatedUserData
	};
}

export function udpateUser(userId, userObj, accessToken){
	return function(dispatch){
		let myinit = {
				headers:{
								'Content-Type':'application/json',
								'Authorization':accessToken
							},
				method:'PUT',
				body: JSON.stringify(userObj)
			}
		let url=config.domainUrl+'user/'+userId;
		return entitiesApi(url,myinit).then(function(response) {
			if (response.status >= 200 && response.status < 300) {
				alert('User Successfully Updated');
					return response;
			} else {
				let error = new Error(response.status);
				error.response = response;
				throw error;
			}
		})
		.then(function(response) {
			if(Object.keys(response).length!=0){
				return response.json();
			}else{
				return {};
			}
		})
		.then(function(data) {
			if(data.errorCode){
				console.log('Role update failed')
			} else{
				dispatch(udpateUserSuccess(data));
				dispatch(loadUsers(accessToken));
			}
		}).catch(function(error) {
			throw (error);
		});
	};
}

export function deleteUserSuccess() {
	return {
		type: types.DELETE_USER_SUCCESS
	};
}

export function deleteUser(userId, accessToken){
	return function(dispatch){
		let myinit = {
				headers:{
								'Content-Type':'application/json',
								'Authorization':accessToken
							},
				method:'DELETE'
			}
		let url=config.domainUrl+'user/'+userId;
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
				console.log('Deleting user failed!')
			} else{
				dispatch(deleteUserSuccess());
				dispatch(loadUsers(accessToken));
			}
		}).catch(function(error) {
			throw (error);
		});
	};
}
