import expect from 'expect';
import * as adminStagesAction from './adminStagesAction';
import * as types from '../common/actionTypes';
import initialState from '../../reducers/common/initialState';

import thunk from 'redux-thunk';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';


describe('Admin stage Action', () => {

  describe('Admin stage Success action creator', () => {
    it('should load the list of stage', () => {
      const stageDetails = [
        {
          "id": 4,
          "name": "LEARN"
        },
        {
          "id": 7,
          "name": "DISCOVER"
        },
        {
          "id": 10,
          "name": "ASSIMILATE"
        }
      ]
      const expectedAction = {
        type: types.LOAD_ADMIN_STAGES_SUCCESS,
        stageList: stageDetails  
      }; 

      const actutalAction = adminStagesAction.loadAdminStagesSuccess(stageDetails);
      expect(actutalAction).toEqual(expectedAction);
      expect(actutalAction.type).toEqual(expectedAction.type);
      expect(actutalAction.stageList).toEqual(expectedAction.stageList);
    });
  });
	
  describe('Remove admin stages Success action creator', () => {
    describe('Remove admin stages', () => {
      it('should remove the admin stage from store', () => {
        const stageDetails = [];       
        const expectedAction = {
          type: types.REMOVE_ADMIN_STAGES_SUCCESS,
          stageList: stageDetails  
        };

        const actutalAction = adminStagesAction.removeAdminStagesSuccess(stageDetails);
        expect(actutalAction).toEqual(expectedAction);
        expect(actutalAction.type).toEqual(expectedAction.type);
        expect(actutalAction.stageList).toEqual(expectedAction.stageList);
      });
    });
  });


	const middleware = [thunk];
	const mockStore = configureMockStore(middleware);

	describe('load admin stages action', () => {
    afterEach(() => {
      nock.cleanAll();
    });

    const stageDetails = [
      {
        "id": 4,
        "name": "LEARN"
      },
      {
        "id": 7,
        "name": "DISCOVER"
      },
      {
        "id": 10,
        "name": "ASSIMILATE"
      }
    ]
      
    it('should call the getStages api and update the store value ', (done) => {

      var expectedActions = {
        type: types.LOAD_ADMIN_STAGES_SUCCESS, 
        stageList: stageDetails
      };
      
      const store = mockStore(initialState, expectedActions);
      expectedActions = store.dispatch(expectedActions);
      const actualActions = adminStagesAction.loadAdminStagesSuccess(stageDetails);
      expect(expectedActions).toEqual(actualActions);
      expect(expectedActions.type).toEqual(actualActions.type);
      expect(expectedActions.stageList).toEqual(actualActions.stageList);
      done();
    });
  });

  describe('Remove admin stages', () => {
    afterEach(() => {
      nock.cleanAll();
    });

    const stageDetails =[];
    
    it('should remove admin stages form state and update the store value ', (done) => {
      var expectedActions = {
        type: types.REMOVE_ADMIN_STAGES_SUCCESS, 
        stageList: stageDetails
      };
      
      const store = mockStore(initialState, expectedActions);
      expectedActions = store.dispatch(expectedActions);
      const actualActions = adminStagesAction.removeAdminStagesSuccess(stageDetails);
      expect(expectedActions).toEqual(actualActions);
      expect(expectedActions.type).toEqual(actualActions.type);
      expect(expectedActions.stageList).toEqual(actualActions.stageList);
      done();
    });
  });
});
