import expect from 'expect';
import currentStageReducer from './currentStageReducer';
import * as currentStageActions from '../../actions/stage/currentStageActions';
import initialState from '../common/initialState';
import lodash from 'lodash';

describe('Current Stage Reducer ', () => {
  describe('Load subStage and conent details for current stage success scenario', () =>{
    it('it should store the list of substages and contents details of current stage.', () => {
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
        }
      ]

      const subStageDetails = lodash.groupBy(contentDetails,'subStageName');
      const currentStageAction = currentStageActions.loadCurrentStageSuccess(subStageDetails);
       const newStateValue = currentStageReducer(initialState, currentStageAction);
       expect(newStateValue).toEqual(subStageDetails);
    });
  });
  
  describe('Remove current stage details success scenario', () =>{
    it('it should remove the current stage details from store', () => {
      const subStageDetails = {};
      const currentStageAction = currentStageActions.removeCurrentStageSuccess(subStageDetails);
      const newStateValue = currentStageReducer(initialState, currentStageAction);
      expect(newStateValue).toEqual(subStageDetails);
    });
  });  
});
