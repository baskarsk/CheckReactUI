import * as types from '../../actions/common/actionTypes';
import initialState from '../common/initialState';

export default function roleReducer(state=initialState.role,action)
{
	switch(action.type)
	{
		case types.GET_ROLE_SUCCESS:
			return action.roleData;
			break;
		case types.CREATE_ROLE_SUCCESS:
			return action.createdRoleData;
			break;
		case types.UPDATE_ROLE_SUCCESS:
			return action.updatedRoleData;
			break;
		case types.DELETE_ROLE_SUCCESS:
			return Object.assign({});
			break;
		case types.LOGOUT_SUCCESS:
			return {};
			break;
		default:
			return state;
	}
}
