/**
 * This is the file where the action for fetching  the available sub-stages for admin page.
 * @author : Bala
 * File Name : adminSubStagesAction
 * Path : src/actions/admin/
 * Created Date : 28th Nov 2017
 */

import * as types from '../common/actionTypes';
import entitiesApi  from '../../entities/entitiesApi';
import config from '../../config';
import {loadStages} from '../stage/stageActions';

export function loadAdminSubStagesSuccess(subStageList) {
	return {
		type: types.LOAD_ADMIN_SUBSTAGES_SUCCESS,
		subStageList
	};
}

export function removeAdminSubStagesSuccess(subStageList) {
	return {
		type: types.REMOVE_ADMIN_SUBSTAGES_SUCCESS,
		subStageList
	};
}

export function createAdminSubStageSuccess(newSubStage) {
	return {
		type: types.CREATE_ADMIN_SUBSTAGE_SUCCESS,
		newSubStage
	};
}

export function updateAdminSubStageSuccess(updatedSubStage) {
	return {
		type: types.UPDATE_ADMIN_SUBSTAGE_SUCCESS,
		updatedSubStage
	};
}

export function deleteAdminSubStageSuccess(deletedSubStageId) {
	return {
		type: types.DELETE_ADMIN_SUBSTAGE_SUCCESS,
		deletedSubStageId
	};
}

export function loadAdminSubStages(AccessToken) {
    return function(dispatch) {
    	let myinit = {
        	headers:{'Accept':'application/json','Content-Type': 'application/json','Authorization' : AccessToken},
        	method:'GET'
			}
      let url=config.domainUrl+'sub-stages/';
    
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
					dispatch(loadAdminSubStagesSuccess(data));					
				}
			}).catch(function(error) {
				throw (error);
			});
    };
}

export function removeAdminSubStages() {
	return function(dispatch) {
			dispatch(removeAdminSubStagesSuccess([]));
	}
}

export function createAdminSubStage(currentSubStage,AccessToken,userName) {
	return function(dispatch) {
    	let myinit = {
        	headers:{'Accept':'application/json','Content-Type': 'application/json','Authorization' : AccessToken},
			method:'POST',
			body : JSON.stringify({
				"name": currentSubStage.name,
				"stage": {
					"id": currentSubStage.stage.id
				}
			})
		}
     	let url=config.domainUrl+'sub-stages/';
    
		return entitiesApi(url,myinit).then(function(response) {
				if (response.status >= 200 && response.status < 300) {
					alert('Substage Successfully Created');
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
					let newSubStage = {
						"id" : data.id,
						"name" : data.name,
						"stage": {
							"id": currentSubStage.stage.id,
							"name" : currentSubStage.stage.name
						}
					}
					dispatch(createAdminSubStageSuccess(newSubStage));
					dispatch(loadStages(userName,AccessToken));
				}
			}).catch(function(error) {
				throw (error);
			});
    };
}

export function updateAdminSubStage(currentSubStage,AccessToken,userName) {
	return function(dispatch) {
    	let myinit = {
        	headers:{'Accept':'application/json','Content-Type': 'application/json','Authorization' : AccessToken},
			method:'PUT',
			body : JSON.stringify({
				'id': currentSubStage.id,
				'name': currentSubStage.name,
				'stage': {
					"id": currentSubStage.stage.id,
					"name" : currentSubStage.stage.name,
				}
			})
		}
     	let url=config.domainUrl+'sub-stages/'+currentSubStage.id;
    
		return entitiesApi(url,myinit).then(function(response) {
				if (response.status >= 200 && response.status < 300) {
					alert('SubStage Successfully Updated');
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
					dispatch(updateAdminSubStageSuccess(currentSubStage));
					dispatch(loadStages(userName,AccessToken));
				}
			}).catch(function(error) {
				throw (error);
			});
    };
}

export function deleteAdminSubStage(currentSubStageId,AccessToken) {
	return function(dispatch) {
    	let myinit = {
        	headers:{'Accept':'application/json','Content-Type': 'application/json','Authorization' : AccessToken},
			method:'DELETE'
		}
        let url=config.domainUrl+'sub-stages/'+currentSubStageId;
    
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
					dispatch(deleteAdminSubStageSuccess(currentSubStageId));					
				}
			}).catch(function(error) {
				throw (error);
			});
    };
}
