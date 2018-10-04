import * as types from '../../actions/common/actionTypes';
import initialState from '../common/initialState';

export default function contentReducer(state=initialState.contentDetails,action)
{
	switch(action.type)
	{
		case types.LOAD_CONTENT_SUCCESS:
		    return action.contentDetails;
			break;
		case types.REMOVE_CONTENT_SUCCESS:
			return action.contentDetails
			break;
		case types.LOGOUT_SUCCESS:
			return {};
			break;
		default:
			return state;
	}
}