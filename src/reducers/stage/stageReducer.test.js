import expect from 'expect';
import stageReducer from './stageReducer';
import * as stageActions from '../../actions/stage/stageActions';
import initialState from '../common/initialState';
import lodash from 'lodash';

describe('Stage Reducer ', () => {
  describe('Load content with stage information success scenario', () =>{
    it('it should store the content list based on stages.', () => {
      const contentDetails = [
        {
          "id": 166,
          "name": "Devops content",
          "subStageName": "Cloud Learnings",
          "stageName": "ASSIMILATE"
        },
        {
          "id": 193,
          "name": "Environment Setup",
          "subStageName": "Cloud Learnings",
          "stageName": "ASSIMILATE"
        },
        {
          "id": 169,
          "name": "ManagerContent",
          "subStageName": "Cloudlift",
          "stageName": "LEARN"
        }
      ]
      const stageDetails = lodash.groupBy(contentDetails,'stageName');
      const stageAction = stageActions.loadStageSuccess(stageDetails);
       const newStateValue = stageReducer(initialState, stageAction);
       expect(newStateValue).toEqual(stageDetails);
    });
  });
  
  describe('Remove content information success scenario', () =>{
    it('it should remove the content details from store', () => {
      const stageDetails = {};
      const stageAction = stageActions.removeStageSuccess(stageDetails);
       const newStateValue = stageReducer(initialState, stageAction);
       expect(newStateValue).toEqual(stageDetails);
    });
  });  
});
