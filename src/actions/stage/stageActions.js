/**
 * This is the file with the action for fetching  the screen stage and substage content details.
 * @author : Bala
 * File Name : stageAction
 * Path : src/actions/stage
 * Created Date : 23th Nov 2017
 */

import * as types from '../common/actionTypes';
import entitiesApi  from '../../entities/entitiesApi';
import config from '../../config';
import lodash from 'lodash';


export function loadStageSuccess(stageDetails) {
	return {
		type: types.LOAD_STAGE_SUCCESS,
		stageDetails
	};
}

export function removeStageSuccess(stageDetails) {
	return {
		type: types.REMOVE_STAGE_SUCCESS,
		stageDetails
	};
}

export function loadStages(UserId,AccessToken) {
    return function(dispatch) {
    	let myinit = {
        	headers:{'Accept':'application/json','Content-Type': 'application/json','Authorization' : AccessToken},
        	method:'GET'
		}
        let url=config.domainUrl+'contents?name='+UserId;

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
                    let groupedData = lodash.groupBy(data,'stageName');
                    dispatch(loadStageSuccess(groupedData));	
					
//Matomo for tracking the navigation via stages in header tab	
      _paq.push(['trackEvent', 'NavigationThroughStages', 'StagesInHeader', 'BODHA']);
  				}
			}).catch(function(error) {
				throw (error);
			});
    };
}

export function removeStages() {
    return function(dispatch) {
        dispatch(removeStageSuccess({}));
    }
}
