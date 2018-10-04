import * as types from '../../actions/common/actionTypes';
import initialState from '../common/initialState';

export default function updateLocaleReducer(state=initialState.locale,action)
{
	switch(action.type)
	{
		case types.UPDATE_LOCALE:
			return action.locale;
			break;
		default:
			return state;
	}
}
