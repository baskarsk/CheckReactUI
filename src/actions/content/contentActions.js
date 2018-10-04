/**
 * This is the file where the action for fetching  the screen content
 * @author : Bala
 * File Name : contentAction
 * Path : src/actions/content
 * Created Date : 20th Nov 2017
 */

import * as types from '../common/actionTypes';
import entitiesApi  from '../../entities/entitiesApi';
import config from '../../config';


export function loadContentSuccess(contentDetails) {
	return {
		type: types.LOAD_CONTENT_SUCCESS,
		contentDetails
	};
}

export function removeContentSuccess(contentDetails) {
	return {
		type: types.REMOVE_CONTENT_SUCCESS,
		contentDetails
	};
}

export function loadContent(contentId,AccessToken) {
	
    return function(dispatch) {
    	let myinit = {
        	headers:{'Accept':'application/json','Content-Type': 'application/json','Authorization' : AccessToken},
        	method:'GET'
			}
      let url=config.domainUrl+'contents/'+contentId;
    
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
					dispatch(loadContentSuccess(data));					
				}
			}).catch(function(error) {
				throw (error);
			});
    };
}


export function removeContent() {
	return function(dispatch) {
			dispatch(removeContentSuccess({}));
	}
}



