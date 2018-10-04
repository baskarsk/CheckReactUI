import * as types from '../../actions/common/actionTypes';
import initialState from '../common/initialState';

export default function userReducer(state=initialState.userInfo,action)
{
	switch(action.type)
	{
		case types.USER_INFO_SUCCESS:
			return action.userInfo;
			break;
		case types.REMOVE_USER_INFO_SUCCESS:
			return action.userInfo
			break;
		case types.LOGOUT_SUCCESS:
			return {};
			break;
		default:
			return state;
	}
}