/**
 * This is the file where the action for fetching  the available stages.
 * @author : Bala
 * File Name : stageAction
 * Path : src/actions/admin/
 * Created Date : 28th Nov 2017
 */

import * as types from '../common/actionTypes';
import entitiesApi  from '../../entities/entitiesApi';
import config from '../../config';


export function loadAdminStagesSuccess(stageList) {
	return {
		type: types.LOAD_ADMIN_STAGES_SUCCESS,
		stageList
	};
}

export function removeAdminStagesSuccess(stageList) {
	return {
		type: types.REMOVE_ADMIN_STAGES_SUCCESS,
		stageList
	};
}

export function loadAdminStages(AccessToken) {
    return function(dispatch) {
    	let myinit = {
        	headers:{'Accept':'application/json','Content-Type': 'application/json','Authorization' : AccessToken},
        	method:'GET'
			}
      let url=config.domainUrl+'stages/';
    
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
					dispatch(loadAdminStagesSuccess(data));					
				}
			}).catch(function(error) {
				throw (error);
			});
    };
}

export function removeAdminStages() {
	return function(dispatch) {
			dispatch(removeAdminStagesSuccess([]));
	}
}