/**
 * This is the file where the action for fetching  the screen content status
 * @author : Bala
 * File Name : contentStatusAction
 * Path : src/actions/contentStatus
 * Created Date : 13th Dec 2017
 */

import * as types from '../common/actionTypes';
import entitiesApi  from '../../entities/entitiesApi';
import config from '../../config';


export function loadContentsStatusSuccess(contentsStatusDetails) {
	return {
		type: types.LOAD_CONTENTS_STATUS_SUCCESS,
		contentsStatusDetails
	};
}

export function createContentStatusSuccess(contentsStatusDetails) {
	return {
		type: types.LOAD_CONTENTS_STATUS_SUCCESS,
		contentsStatusDetails		
	};
}

export function updateContentStatusSuccess(contentsStatusDetails) {
	return {
		type: types.LOAD_CONTENTS_STATUS_SUCCESS,
		contentsStatusDetails		
	};
}

export function loadContentStatus(userId,AccessToken) {
    return function(dispatch) {
    	let myinit = {
        	headers:{'Accept':'application/json','Content-Type': 'application/json','Authorization' : AccessToken},
        	method:'GET'
			}
      let url=config.domainUrl+'content-status/'+userId;
    
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
					dispatch(loadContentsStatusSuccess(data));					
				}
			}).catch(function(error) {
				throw (error);
			});
    };
}

export function createContentStatus(contentStatusObj,AccessToken) {
    return function(dispatch) {
    	let myinit = {
        	headers:{'Accept':'application/json','Content-Type': 'application/json','Authorization' : AccessToken},
			method:'POST',
			body: JSON.stringify({
				'user': contentStatusObj.user,
				'content': contentStatusObj.content,
				'status': contentStatusObj.status
			})
		}

      	let url=config.domainUrl+'content-status/';
    
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
					dispatch(updateContentStatusSuccess(data));					
				}
			}).catch(function(error) {
				throw (error);
			});
    };
}

export function updateContentStatus(contentStatusObj,AccessToken) {
    return function(dispatch) {
    	let myinit = {
        	headers:{'Accept':'application/json','Content-Type': 'application/json','Authorization' : AccessToken},
			method:'POST',
			body: JSON.stringify({
				'id' : contentStatusObj.id,
				'user': {
					id : contentStatusObj.user_id
				},
				'content': {
					id : contentStatusObj.content_id
				},
				'status': contentStatusObj.status
			})
		}

      	let url=config.domainUrl+'content-status/';
    
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
					
					
		//Matomo Integration for tracking Course Completion ("MARK AS COMPLETED")
		   _paq.push(['trackEvent', 'MarkAsCompletedButton', 'CourseCompletion']);
					
					dispatch(createContentStatusSuccess(data));				
				}
			}).catch(function(error) {
				throw (error);
			});
    };
}
