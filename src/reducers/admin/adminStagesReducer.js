import * as types from '../../actions/common/actionTypes';
import initialState from '../common/initialState';

export default function adminStageReducer(state=initialState.adminStages,action)
{
	switch(action.type)
	{
		case types.LOAD_ADMIN_STAGES_SUCCESS:
            return action.stageList;
            break;
        
        case types.REMOVE_ADMIN_STAGES_SUCCESS:
            return action.stageList;
            break;
            
		case types.LOGOUT_SUCCESS:
			return [];
			break;
			
		default:
			return state;
	}
}
