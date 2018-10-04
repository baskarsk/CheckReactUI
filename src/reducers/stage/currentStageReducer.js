import * as types from '../../actions/common/actionTypes';
import initialState from '../common/initialState';

export default function currentStageReducer(state=initialState.currentStageDetails,action)
{
	switch(action.type)
	{
		case types.LOAD_CURRENT_STAGE_SUCCESS:
			return action.currentStageDetails;
			break;
		case types.REMOVE_CURRENT_STAGE_SUCCESS:
			return action.currentStageDetails
			break;
		case types.LOGOUT_SUCCESS:
			return {};
			break;
		default:
			return state;
	}
}