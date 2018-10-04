import expect from 'expect';
import * as stageActions from './stageActions';
import * as types from '../common/actionTypes';
import initialState from '../../reducers/common/initialState';

import thunk from 'redux-thunk';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';


describe('Stages Actions', () => {
  describe('Load available stages Success action creator', () => {
    it('should load the available stages with substage information', () => {
      const stagesInfo = {
        "ASSIMILATE": [
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
        ],
        "LEARN": [
          {
            "id": 169,
            "name": "ManagerContent",
            "subStageName": "Cloudlift",
            "stageName": "LEARN"
          }
        ]
      }

      const expectedAction = {
        type: types.LOAD_STAGE_SUCCESS,
        stageDetails: stagesInfo  
      }; 

      const actutalAction = stageActions.loadStageSuccess(stagesInfo);
      expect(actutalAction).toEqual(expectedAction);
      expect(actutalAction.type).toEqual(expectedAction.type);
      expect(actutalAction.stageDetails).toEqual(expectedAction.stageDetails);
    });
  });
	
  describe('Remove stages success action creator', () => {
    describe('Remove list of stage', () => {
      it('should remove available stage details from store', () => {
        const stagesInfo = {};       
        const expectedAction = {
          type: types.REMOVE_STAGE_SUCCESS,
          stageDetails: stagesInfo  
        };

        const actutalAction = stageActions.removeStageSuccess(stagesInfo);
        expect(actutalAction).toEqual(expectedAction);
        expect(actutalAction.type).toEqual(expectedAction.type);
        expect(actutalAction.stageDetails).toEqual(expectedAction.stageDetails);
      });
    });
  });


	const middleware = [thunk];
	const mockStore = configureMockStore(middleware);

	describe('Load available stages success', () => {
    afterEach(() => {
      nock.cleanAll();
    });

    it('should call the stage api to get the available stages with content and substage information and  update the store value ', (done) => {

      const stagesInfo = { 
        "ASSIMILATE": [
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
        ],
        "LEARN": [
          {
            "id": 169,
            "name": "ManagerContent",
            "subStageName": "Cloudlift",
            "stageName": "LEARN"
          }
        ]
      }

      var expectedActions = {
        type: types.LOAD_STAGE_SUCCESS, 
        stageDetails: stagesInfo
      };
      
      const store = mockStore(initialState, expectedActions);
      expectedActions = store.dispatch(expectedActions);
      const actualActions = stageActions.loadStageSuccess(stagesInfo);
      expect(expectedActions).toEqual(actualActions);
      expect(expectedActions.type).toEqual(actualActions.type);
      expect(expectedActions.stageDetails).toEqual(actualActions.stageDetails);
      done();
    });
  });

  describe('Remove stages', () => {
    afterEach(() => {
      nock.cleanAll();
    });

    const stagesInfo = {};
    
    it('should remove the available stages and update the store value ', (done) => {
      var expectedActions = {
        type: types.REMOVE_STAGE_SUCCESS, 
        stageDetails: stagesInfo
      };
      
      const store = mockStore(initialState, expectedActions);
      expectedActions = store.dispatch(expectedActions);
      const actualActions = stageActions.removeStageSuccess(stagesInfo);
      expect(expectedActions).toEqual(actualActions);
      expect(expectedActions.type).toEqual(actualActions.type);
      expect(expectedActions.stageDetails).toEqual(actualActions.stageDetails);
      done();
    });
  });
});
