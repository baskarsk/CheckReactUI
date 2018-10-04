
/**
 * Main Reducer File where all the reducers are defined.
 * File Name : index.js
 * Path : src/reducers/common
 * Created Date : 14th Nov 2017
 *
 */

 import {combineReducers} from 'redux';
 import login from '../login/loginReducer';
 import userInfo from '../user/userReducer';
 import content from '../content/contentReducer';
 import stage from '../stage/stageReducer';
 import currentStage from '../stage/currentStageReducer';
 import user from '../admin/userReducer';
 import userList from '../admin/userListReducer';
 import role from '../admin/roleReducer';
 import roleList from '../admin/roleListReducer';
 import adminStages from '../admin/adminStagesReducer';
 import adminSubStages from '../admin/adminSubStagesReducer';
 import adminContents from '../admin/adminContentsReducer';
 import contentStatus from '../contentStatus/contentStatusReducer';
 import feedbackList from '../admin/feedbackReducer';

/**
 * Root Reducer is defined.
 */
 const rootReducer = combineReducers({
	 login,
	 userInfo,
	 content,
	 stage,
	 currentStage,
	 user,
	 userList,
	 role,
	 roleList,
	 adminStages,
	 adminSubStages,
	 adminContents,
	 contentStatus,
	 feedbackList
});

export default rootReducer;
