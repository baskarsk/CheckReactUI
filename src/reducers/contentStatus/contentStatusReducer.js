import * as types from '../../actions/common/actionTypes';
import initialState from '../common/initialState';

export default function userReducer(state=initialState.contentStatus,action)
{
	switch(action.type)
	{
		case types.LOAD_CONTENTS_STATUS_SUCCESS:
			return action.contentsStatusDetails;
			break;
		case types.CREATE_CONTENT_STATUS_SUCCESS:
			return state;
			break;
		case types.UPDATE_CONTENT_STATUS_SUCCESS:
			return state;
			break;
		case types.LOGOUT_SUCCESS:
			return [];
			break;
		default:
			return state;
	}
}