	/**
 * This is the file where actions related to user roles are present
 * @author : Anandi Yogeesan
 * File Name : roleAction
 * Path : src/actions/content
 * Created Date : 27th Nov 2017
 */

import * as types from '../common/actionTypes';
import entitiesApi  from '../../entities/entitiesApi';
import config from '../../config';
import $ from 'jquery';

export function loadRoleSuccess(roleList) {
	return {
		type: types.LOAD_ROLES_SUCCESS,
		roleList
	};
}

export function loadRoles(accessToken){
	return function(dispatch){
		let myinit = {
				headers:{
								'Content-Type':'application/json',
								'Authorization':accessToken
							},
				method:'GET'
			}
		let url=config.domainUrl+'role';
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
				dispatch(loadRoleSuccess(data));
			}
		}).catch(function(error) {
			throw (error);
		});
	};
}

export function getRoleSuccess(roleData) {
	return {
		type: types.GET_ROLE_SUCCESS,
		roleData
	};
}

export function getRole(roleId, accessToken){
	return function(dispatch){
		let myinit = {
				headers:{
								'Content-Type':'application/json',
								'Authorization':accessToken
							},
				method:'GET'
			}
		let url=config.domainUrl+'role/'+roleId;
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
				console.log('Loading particular role failed!')
			} else{
				dispatch(getRoleSuccess(data));
			}
		}).catch(function(error) {
			throw (error);
		});
	};
}

export function createRoleSuccess(createdRoleData) {
	return {
		type: types.CREATE_ROLE_SUCCESS,
		createdRoleData
	};
}

export function createRole(roleName, roleStatus, roleDesc, accessToken){
	return function(dispatch){
		let myinit = {
				headers:{
								'Content-Type':'application/json',
								'Authorization':accessToken
							},
				method:'POST',
				body: JSON.stringify({
					'name': roleName,
					'description': roleDesc,
					'status': roleStatus
				})
			}
		let url=config.domainUrl+'role';
		return entitiesApi(url,myinit).then(function(response) {
			if (response.status >= 200 && response.status < 300) {
                  alert("Role SuccessFully Created");
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
				console.log('Role creation failed')
			} else{
				dispatch(createRoleSuccess(data));
				dispatch(loadRoles(accessToken));
			}
		}).catch(function(error) {
			throw (error);
		});
	};
}

export function updateRoleSuccess(updatedRoleData) {
	return {
		type: types.UPDATE_ROLE_SUCCESS,
		updatedRoleData
	};
}

export function updateRole(roleId, roleName, roleStatus, roleDesc, accessToken){
	return function(dispatch){
		let myinit = {
				headers:{
								'Content-Type':'application/json',
								'Authorization':accessToken
							},
				method:'PUT',
				body: JSON.stringify({
					'id': roleId,
					'name': roleName,
					'description': roleDesc,
					'status': roleStatus
				})
			}
		let url=config.domainUrl+'role/'+roleId;
		return entitiesApi(url,myinit).then(function(response) {
			if (response.status >= 200 && response.status < 300) {
				  alert("Role SuccessFully Updated");
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
				console.log('Role creation failed')
			} else{
				dispatch(updateRoleSuccess(data));
				dispatch(loadRoles(accessToken));
			}
		}).catch(function(error) {
			throw (error);
		});
	};
}

export function deleteRoleSuccess() {
	return {
		type: types.DELETE_ROLE_SUCCESS
	};
}

export function deleteRole(roleId, accessToken){
	console.log("Role id passed to delete role action", roleId);
	return function(dispatch){
		let myinit = {
				headers:{
								'Content-Type':'application/json',
								'Authorization':accessToken
							},
				method:'DELETE'
			}
		let url=config.domainUrl+'role/'+roleId;
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
				console.log('Loading particular role failed!')
			} else{
				if(data.status == "Failed"){
					$(".contentAccRoleDelErr").css({"display":"block"});
				} else {
					dispatch(deleteRoleSuccess());
					dispatch(loadRoles(accessToken));
					$(".contentAccRoleDelErr").css({"display":"none"});
				}
			}
		}).catch(function(error) {
			throw (error);
		});
	};
}
