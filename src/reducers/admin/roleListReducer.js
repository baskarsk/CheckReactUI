import * as types from '../../actions/common/actionTypes';
import initialState from '../common/initialState';

export default function roleReducer(state=initialState.roleList,action)
{
	switch(action.type)
	{
		case types.LOAD_ROLES_SUCCESS:
			return action.roleList;
			break;
		case types.LOGOUT_SUCCESS:
			return [];
			break;
		default:
			return state;
	}
}
