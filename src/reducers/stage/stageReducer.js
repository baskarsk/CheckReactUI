import * as types from '../../actions/common/actionTypes';
import initialState from '../common/initialState';

export default function stageReducer(state=initialState.stageDetails,action)
{
	switch(action.type)
	{
		case types.LOAD_STAGE_SUCCESS:
			return action.stageDetails;
			break;
		case types.REMOVE_STAGE_SUCCESS:
			return action.stageDetails
			break;
		case types.LOGOUT_SUCCESS:
			return {};
			break;
		default:
			return state;
	}
}