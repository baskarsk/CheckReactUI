/**
 * This is the file where the action for fetching  the available contents for admin page.
 * @author : Bala
 * File Name : adminContentsAction
 * Path : src/actions/admin/
 * Created Date : 30th Nov 2017
 */

import * as types from '../common/actionTypes';
import entitiesApi  from '../../entities/entitiesApi';
import config from '../../config';

export function loadAdminContentsSuccess(contentList) {
	return {
		type: types.LOAD_ADMIN_CONTENT_SUCCESS,
		contentList
	};
}

export function removeAdminContentsSuccess(contentList) {
	return {
		type: types.REMOVE_ADMIN_CONTENT_SUCCESS,
		contentList
	};
}

export function createAdminContentSuccess(newContent) {
	return {
		type: types.CREATE_ADMIN_CONTENT_SUCCESS,
		newContent
	};
}

export function updateAdminContentSuccess(updatedContent) {
	return {
		type: types.UPDATE_ADMIN_CONTENT_SUCCESS,
		updatedContent
	};
}

export function deleteAdminContentSuccess(deletedContentId) {
	return {
		type: types.DELETE_ADMIN_CONTENT_SUCCESS,
		deletedContentId
	};
}
export function updateOrderedContentSuccess(updatedContent) {
	return {
		type: types.UPDATE_ORDERED_CONTENT_SUCCESS,
		updatedContent
	};
}

export function countAdminContentSuccess(count) {
	return {
		type: types.COUNT_ADMIN_CONTENT_SUCCESS,
		count
	};
}

export function loadAdminContents(userName,AccessToken) {
    return function(dispatch) {
    	let myinit = {
        	headers:{'Accept':'application/json','Content-Type': 'application/json','Authorization' : AccessToken},
        	method:'GET'
		}
        let url=config.domainUrl+'contents/?name='+userName;
    
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
					dispatch(loadAdminContentsSuccess(data));					
				}
			}).catch(function(error) {
				throw (error);
			});
    };
}

export function removeAdminContents() {
	return function(dispatch) {
			dispatch(removeAdminContentsSuccess([]));
	}
}

export function createAdminContent(currentContent,AccessToken) {
   return function(dispatch) {
    	let myinit = {
        	headers:{'Accept':'application/json','Content-Type': 'application/json','Authorization' : AccessToken},
			method:'POST',
			body : JSON.stringify({
				'name': currentContent.name,
				'title': currentContent.title,
				'header': currentContent.header,
				'description': currentContent.description,
				'displayOrder': currentContent.displayOrder,
				'footer': currentContent.footer,
				'subStage': currentContent.subStage,
				'roles': currentContent.roles,
				'documents': currentContent.documents,
				
			})
		}
		 let url=config.domainUrl+'contents/';
		
    
		return entitiesApi(url,myinit).then(function(response) {
				if (response.status >= 200 && response.status < 300) {
					alert('Content Successfully Created');
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
					dispatch(createAdminContentSuccess(data));					
				}
			}).catch(function(error) {
				throw (error);
			});
    };
}

export function updateAdminContent(currentContent,AccessToken) {

    return function(dispatch) {
    	let myinit = {
        	headers:{'Accept':'application/json','Content-Type': 'application/json','Authorization' : AccessToken},
			method:'PUT',
			body : JSON.stringify({
				'id': currentContent.id,
				'name': currentContent.name,
				'title': currentContent.title,
				'header': currentContent.header,
				'description': currentContent.description,
				'displayOrder': currentContent.displayOrder,
				'footer': currentContent.footer,
				'subStage': currentContent.subStage,
				'roles': currentContent.roles,
				'documents': currentContent.documents
			})
		}
     	let url=config.domainUrl+'contents/'+currentContent.id;
    
		return entitiesApi(url,myinit).then(function(response) {
				if (response.status >= 200 && response.status < 300) {
					alert('Content Successfully Updated');
					  
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
					dispatch(updateAdminContentSuccess(data));					
				}
			}).catch(function(error) {
				throw (error);
			});
    };
}

export function deleteAdminContent(currentContentId,AccessToken) {
	return function(dispatch) {
    	let myinit = {
        	headers:{'Accept':'application/json','Content-Type': 'application/json','Authorization' : AccessToken},
			method:'DELETE'
		}
        let url=config.domainUrl+'contents/'+currentContentId;
    
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
					dispatch(deleteAdminContentSuccess(currentContentId));					
				}
			}).catch(function(error) {
				throw (error);
			});
    };
}
export function updateOrderedContent(updateObjArr,AccessToken) {
	console.log(JSON.stringify(updateObjArr));
    return function(dispatch) {
    	let myinit = {
        	headers:{'Accept':'application/json','Content-Type': 'application/json','Authorization' : AccessToken},
			method:'PUT',
			body : JSON.stringify(updateObjArr)
		}
		 let url=config.domainUrl + 'contents';    

		return entitiesApi(url,myinit).then(function(response) {
				if (response.status >= 200 && response.status < 300) {
					alert('Re-ordered Content Successfully Updated');
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
					dispatch(updateOrderedContentSuccess(data));					
				}
			}).catch(function(error) {
				throw (error);
			});
    };
}

export function countAdminContent(currentSubstageId,AccessToken) {
    return function(dispatch) {
    	let myinit = {
        	headers:{'Accept':'application/json','Content-Type': 'application/json','Authorization' : AccessToken},
        	method:'GET'
		}
		let url=config.domainUrl+'contents/substage/' + currentSubstageId;
	
   
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
					dispatch(countAdminContentSuccess(data));					
				}
			}).catch(function(error) {
				throw (error);
			});
    };
}