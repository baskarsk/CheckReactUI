import lodash from 'lodash';
import * as types from '../../actions/common/actionTypes';
import initialState from '../common/initialState';

export default function subStageReducer(state=initialState.adminContents,action)
{
    let currentContentList = {};
    switch(action.type)
	{
        case types.LOAD_ADMIN_CONTENT_SUCCESS:
            return action.contentList;
            break;
        
        case types.REMOVE_ADMIN_CONTENT_SUCCESS:
            return action.contentList;
            break;
        
        case types.CREATE_ADMIN_CONTENT_SUCCESS:
            currentContentList = state;
            currentContentList.push(action.newContent)
            return currentContentList;
            break;

        case types.UPDATE_ADMIN_CONTENT_SUCCESS:
            currentContentList = state;
            lodash.forEach(currentContentList, function(val,key) {
                if(val.id == action.updatedContent.id){
                   val.name = action.updatedContent.name;
                }
            });
            return currentContentList;
            break;

        case types.DELETE_ADMIN_CONTENT_SUCCESS:
            currentContentList = state;
            let updatedContents = lodash.filter(currentContentList, function(content) {
                return content.id != action.deletedContentId;
            });
            return updatedContents;
            break;
			
		case types.LOGOUT_SUCCESS:
			return [];
			break;
            
		default:
			return state;
	}
}
