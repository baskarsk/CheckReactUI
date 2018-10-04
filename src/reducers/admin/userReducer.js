import * as types from '../../actions/common/actionTypes';
import initialState from '../common/initialState';

export default function userReducer(state=initialState.user,action)
{
	switch(action.type)
	{
		case types.GET_USER_SUCCESS:
			return action.userData;
			break;
		case types.CREATE_USER_SUCCESS:
			return action.createdUserData;
			break;
		case types.UPDATE_USER_SUCCESS:
			return action.updatedUserData;
			break;
		case types.DELETE_USER_SUCCESS:
			return Object.assign({});
			break;
		case types.LOGOUT_SUCCESS:
			return {};
			break;
		default:
			return state;
	}
}
