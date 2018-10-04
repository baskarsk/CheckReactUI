import * as types from '../../actions/common/actionTypes';
import initialState from '../common/initialState';

export default function feedbackReducer(state=initialState.feedbackList,action)
{
	switch(action.type)
	{
		case types.GET_FEEDBACK_SUCCESS:
			return action.feedback;
			break;
		case types.DELETE_FEEDBACK_SUCCESS:
			return Object.assign({});
			break;		
		default:
			return state;
	}
}
