	import * as types from '../../actions/common/actionTypes';
import initialState from '../common/initialState';

export default function userReducer(state=initialState.userList,action)
{
	switch(action.type)
	{
		case types.LOAD_USER_SUCCESS:
			return action.userList;
			break;
		case types.LOGOUT_SUCCESS:
			return [];
			break;
		default:
			return state;
	}
}
