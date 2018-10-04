import expect from 'expect';
import * as currentStageActions from './currentStageActions';
import * as types from '../common/actionTypes';
import initialState from '../../reducers/common/initialState';

import thunk from 'redux-thunk';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';


describe('Current Stage Actions', () => {
  describe('Load current stage Success action creator', () => {
    it('should load the current stage details with substage information', () => {
      const currentStageInfo = { 
        "Cloud Learnings": [
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
      }

      const expectedAction = {
        type: types.LOAD_CURRENT_STAGE_SUCCESS,
        currentStageDetails: currentStageInfo  
      }; 

      const actutalAction = currentStageActions.loadCurrentStageSuccess(currentStageInfo);
      expect(actutalAction).toEqual(expectedAction);
      expect(actutalAction.type).toEqual(expectedAction.type);
      expect(actutalAction.currentStageDetails).toEqual(expectedAction.currentStageDetails);
    });
  });
	
  describe('Remove current stage success action creator', () => {
    describe('Remove current Stage', () => {
      it('should remove current stage details', () => {
        const currentStageInfo = {};       
        const expectedAction = {
          type: types.REMOVE_CURRENT_STAGE_SUCCESS,
          currentStageDetails: currentStageInfo  
        };

        const actutalAction = currentStageActions.removeCurrentStageSuccess(currentStageInfo);
        expect(actutalAction).toEqual(expectedAction);
        expect(actutalAction.type).toEqual(expectedAction.type);
        expect(actutalAction.currentStageDetails).toEqual(expectedAction.currentStageDetails);
      });
    });
  });


	const middleware = [thunk];
	const mockStore = configureMockStore(middleware);

	describe('Load current stage details success', () => {
    afterEach(() => {
      nock.cleanAll();
    });

    it('should call the action with current stage details to update the store value ', (done) => {

      const currentStageInfo = { 
        "Cloud Learnings": [
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
      }

      var expectedActions = {
        type: types.LOAD_CURRENT_STAGE_SUCCESS, 
        currentStageDetails: currentStageInfo
      };
      
      const store = mockStore(initialState, expectedActions);
      expectedActions = store.dispatch(expectedActions);
      const actualActions = currentStageActions.loadCurrentStageSuccess(currentStageInfo);
      expect(expectedActions).toEqual(actualActions);
      expect(expectedActions.type).toEqual(actualActions.type);
      expect(expectedActions.currentStageDetails).toEqual(actualActions.currentStageDetails);
      done();
    });
  });

  describe('Remove current stage info', () => {
    afterEach(() => {
      nock.cleanAll();
    });

    const currentStageInfo = {};
    
    it('should remove teh current stage infomation and update the store value ', (done) => {
      var expectedActions = {
        type: types.REMOVE_CURRENT_STAGE_SUCCESS, 
        currentStageDetails: currentStageInfo
      };
      
      const store = mockStore(initialState, expectedActions);
      expectedActions = store.dispatch(expectedActions);
      const actualActions = currentStageActions.removeCurrentStageSuccess(currentStageInfo);
      expect(expectedActions).toEqual(actualActions);
      expect(expectedActions.type).toEqual(actualActions.type);
      expect(expectedActions.currentStageDetails).toEqual(actualActions.currentStageDetails);
      done();
    });
  });
});
