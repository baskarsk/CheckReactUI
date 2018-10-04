/**
 * This is the file where the action for fetching  the screen stage and substage content details
 * @author : Bala
 * File Name : currentStageAction
 * Path : src/actions/stage
 * Created Date : 23th Nov 2017
 */

import * as types from '../common/actionTypes';
import entitiesApi  from '../../entities/entitiesApi';
import config from '../../config';
import lodash from 'lodash';


export function loadCurrentStageSuccess(currentStageDetails) {
	return {
		type: types.LOAD_CURRENT_STAGE_SUCCESS,
		currentStageDetails
	};
}

export function removeCurrentStageSuccess(currentStageDetails) {
	return {
		type: types.REMOVE_CURRENT_STAGE_SUCCESS,
		currentStageDetails
	};
}

export function loadCurrentStages(currentStage) {
    return function(dispatch) {
    	let groupedData = lodash.groupBy(currentStage,'subStageName');
        dispatch(loadCurrentStageSuccess(groupedData));
    };
}

export function removeCurrentStages() {
    return function(dispatch) {
        dispatch(removeCurrentStageSuccess({}));
    }
}