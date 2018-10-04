import * as types from '../../actions/common/actionTypes';
import initialState from '../common/initialState';

export default function loginReducer(state=initialState.loginInfo,action)
{
	switch(action.type)
	{
		case types.LOGIN_SUCCESS:
			return action.loginInfo;
			break;
		case types.LOGIN_ERR_MESSAGE:
			return action.loginInfo
			break;
			case types.LOGOUT_SUCCESS:
			return {};
			break;
		default:
			return state;
	}
}