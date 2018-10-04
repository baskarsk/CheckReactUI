import lodash from 'lodash';
import * as types from '../../actions/common/actionTypes';
import initialState from '../common/initialState';

export default function subStageReducer(state=initialState.adminSubStages,action)
{
    let currentSubStageList = {};
    switch(action.type)
	{
        case types.LOAD_ADMIN_SUBSTAGES_SUCCESS:
            return action.subStageList;
            break;
        
        case types.REMOVE_ADMIN_SUBSTAGES_SUCCESS:
            return action.subStageList;
            break;
        
        case types.CREATE_ADMIN_SUBSTAGE_SUCCESS:
            currentSubStageList = state;
            currentSubStageList.push(action.newSubStage)
            return currentSubStageList;
            break;

        case types.UPDATE_ADMIN_SUBSTAGE_SUCCESS:
            currentSubStageList = state;
            lodash.forEach(currentSubStageList, function(val,key) {
                if(val.id === action.updatedSubStage.id){
                   val.name = action.updatedSubStage.name;
                   val.stage = action.updatedSubStage.stage;
                }
            });
            return currentSubStageList;
            break;

        case types.DELETE_ADMIN_SUBSTAGE_SUCCESS:
            currentSubStageList = state;
            let updatedSubStage = lodash.filter(currentSubStageList, function(subStage) {
                return subStage.id != action.deletedSubStageId;
            });
            return updatedSubStage;
            break;
            
		case types.LOGOUT_SUCCESS:
			return [];
			break;
			
		default:
			return state;
	}
}
