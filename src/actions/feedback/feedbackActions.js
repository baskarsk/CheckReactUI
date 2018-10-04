/**
 * This is the file with the actions for submitting and fetching the feedback. 
 * @author : Drishya
 * File Name : feedbackAction
 * Path : src/actions/feedback
 * Created Date : 28 Nov 2017
 */

import * as types from '../common/actionTypes';
import entitiesApi  from '../../entities/entitiesApi';
import config from '../../config';


export function saveFeedBackSuccess() {
	return {
		type: types.SAVE_FEEDBACK_SUCCESS
	};
}

export function getFeedBackSuccess(feedback) {
	return {
		type: types.GET_FEEDBACK_SUCCESS,
		feedback
	};
}
export function deleteFeedBackSuccess() {
	return {
		type: types.DELETE_FEEDBACK_SUCCESS
	};
}

export function AddFeedback(feedbackObj, AccessToken){
return function (dispatch){
	let myinit = {
		headers:{'Accept':'application/json','Content-Type': 'application/json','Authorization' : AccessToken},
		method:'POST',
		body: JSON.stringify(feedbackObj)
		}
		let url= config.domainUrl + 'feedback'
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
			return response;
		})
		.then(function(data) {
			if(data.errorCode){
				console.log('show the error msg to the user.')
			} else{
				
		//Matomo for tracking feedback by users		
		_paq.push(['trackEvent', 'Feedback_From_User', 'SaveFeedbackButton', 'BODHA']);
				
				dispatch(saveFeedBackSuccess(data));					
			}
		}).catch(function(error) {
			throw (error);
		});
}
}
export function ApproveFeedback(feedbackObj, AccessToken){
return function (dispatch){
	let myinit = {
		headers:{'Accept':'application/json','Content-Type': 'application/json','Authorization' : AccessToken},
		method:'PUT',
		body: JSON.stringify(feedbackObj)
	}
		let url= config.domainUrl + 'feedback/'+feedbackObj.id
		return entitiesApi(url,myinit).then(function(response) {
			if (response.status >= 200 && response.status < 300) {
					return response;
					
			} else {
				let error = new Error(response.status);
				error.response = response;
				console.log("Error: "+error)
				throw error;
			}
		})
		.then(function(response) {
			return response;
		})
		.then(function(data) {
			if(data.errorCode){
				console.log('show the error msg to the user.')
			} else{
				dispatch(saveFeedBackSuccess(data));
				dispatch(GetFeedback(AccessToken));			}
		}).catch(function(error) {
			throw (error);
		});
}
}
export function DeleteFeedback(feedbackObj, AccessToken){
return function (dispatch){
	let myinit = {
		headers:{'Accept':'application/json','Content-Type': 'application/json','Authorization' : AccessToken},
		method:'DELETE'
	}
		let url= config.domainUrl + 'feedback/'+feedbackObj.id
		return entitiesApi(url,myinit).then(function(response) {
			if (response.status >= 200 && response.status < 300) {
				window.location.reload();
				return response;
					
			} else {
				let error = new Error(response.status);
				error.response = response;
				console.log("Error: "+error)
				throw error;
			}
		})
		.then(function(response) {
			return response;
		})
		.then(function(data) {
			if(data.errorCode){
				console.log('show the error msg to the user.')
			} else{
				dispatch(deleteFeedBackSuccess());	
				dispatch(GetFeedback(accessToken));				
			}
		}).catch(function(error) {
			throw (error);
		});
}
}
export function GetFeedback(AccessToken){
	return function (dispatch){
	let myinit = {
		headers:{'Accept':'application/json','Content-Type': 'application/json','Authorization' : AccessToken},
		method:'GET'
		}

		let url= config.domainUrl + 'feedback/all'
		
		
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
				dispatch(getFeedBackSuccess(data));	 				
			}
		}).catch(function(error) {
			throw (error);
		});
	}
}

export function GetAdminApprovedFeedback(AccessToken){
		return function (dispatch){
		let myinit = {
			headers:{'Accept':'application/json','Content-Type': 'application/json','Authorization' : AccessToken},
			method:'GET'
			}
	
			let url= config.domainUrl + 'feedback';
			
			
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
					dispatch(getFeedBackSuccess(data));	 				
				}
			}).catch(function(error) {
				throw (error);
			});
		}
}


export function GetAdminApprovedFeedbackOfAUser(userId,AccessToken){
		return function (dispatch){
		let myinit = {
			headers:{'Accept':'application/json','Content-Type': 'application/json','Authorization' : AccessToken},
			method:'GET'
			}
	
			let url= config.domainUrl + 'feedback/all/'+userId;
			
			
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
					dispatch(getFeedBackSuccess(data));	 				
				}
			}).catch(function(error) {
				throw (error);
			});
		}
	}

