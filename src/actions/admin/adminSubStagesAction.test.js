import expect from 'expect';
import * as adminSubStagesAction from './adminSubStagesAction';
import * as types from '../common/actionTypes';
import initialState from '../../reducers/common/initialState';

import thunk from 'redux-thunk';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';


describe('Admin SubStages Action', () => {

  describe('load substages Success action creator', () => {
    it('should load the list of available substages with details', () => {
      const availableSubStages = [
        {
          "id": 4,
          "name": "CDE- A glimpse of Onboarding",
          "stage": {
            "id": 7,
            "name": "DISCOVER"
          }
        },
        {
          "id": 13,
          "name": "Dev Ops Architecture",
          "stage": {
            "id": 10,
            "name": "ASSIMILATE"
          }
        },
        {
          "id": 34,
          "name": "CloudLift",
          "stage": {
            "id": 10,
            "name": "ASSIMILATE"
          }
        },
        {
          "id": 49,
          "name": "PaaS Principles",
          "stage": {
            "id": 4,
            "name": "LEARN"
          }
        },
        {
          "id": 52,
          "name": "CDE Test substage",
          "stage": {
            "id": 10,
            "name": "ASSIMILATE"
          }
        }
      ]
      
      const expectedAction = {
        type: types.LOAD_ADMIN_SUBSTAGES_SUCCESS,
        subStageList: availableSubStages  
      }; 

      const actutalAction = adminSubStagesAction.loadAdminSubStagesSuccess(availableSubStages);
      expect(actutalAction).toEqual(expectedAction);
      expect(actutalAction.type).toEqual(expectedAction.type);
      expect(actutalAction.subStageList).toEqual(expectedAction.subStageList);
    });
  });
	
  describe('Create new substage action creator', () => {
    describe('create new substage', () => {
      it('should create a substage with provide information', () => {
        const subStageInfo = {
          "name": "CDE Test substage",
          "stage": {
            "id": 10,
          }
        }
    
        const expectedAction = {
          type: types.CREATE_ADMIN_SUBSTAGE_SUCCESS,
          newSubStage: subStageInfo  
        };

        const actutalAction = adminSubStagesAction.createAdminSubStageSuccess(subStageInfo);
        expect(actutalAction).toEqual(expectedAction);
        expect(actutalAction.type).toEqual(expectedAction.type);
        expect(actutalAction.newSubStage).toEqual(expectedAction.newSubStage);
      });
    });
  });

  describe('Update substage details action creator', () => {
    describe('Update existing substage info', () => {
      it('should update the substage information with provide information', () => {
        const subStageInfo = {
          "id": 52,
          "name": "CDE Test substage",
          "stage": {
            "id": 10,
            "name": "ASSIMILATE"
          }
        }       
        const expectedAction = {
          type: types.UPDATE_ADMIN_SUBSTAGE_SUCCESS,
          updatedSubStage: subStageInfo  
        };

        const actutalAction = adminSubStagesAction.updateAdminSubStageSuccess(subStageInfo);
        expect(actutalAction).toEqual(expectedAction);
        expect(actutalAction.type).toEqual(expectedAction.type);
        expect(actutalAction.updatedSubStage).toEqual(expectedAction.updatedSubStage);
      });
    });
  });

  describe('Delete substage action creator', () => {
    describe('Delete substage info', () => {
      it('should delete substage information by substage Id', () => {
              
        const expectedAction = {
          type: types.DELETE_ADMIN_SUBSTAGE_SUCCESS,
          deletedSubStageId : 125
        };

        const actutalAction = adminSubStagesAction.deleteAdminSubStageSuccess(125);
        expect(actutalAction).toEqual(expectedAction);
        expect(actutalAction.type).toEqual(expectedAction.type);
        expect(actutalAction.deletedSubStageId).toEqual(expectedAction.deletedSubStageId);
      });
    });
  });

	const middleware = [thunk];
	const mockStore = configureMockStore(middleware);

	describe('load list of substages success', () => {
    afterEach(() => {
      nock.cleanAll();
    });

    const availableSubStages = [
      {
        "id": 4,
        "name": "CDE- A glimpse of Onboarding",
        "stage": {
          "id": 7,
          "name": "DISCOVER"
        }
      },
      {
        "id": 13,
        "name": "Dev Ops Architecture",
        "stage": {
          "id": 10,
          "name": "ASSIMILATE"
        }
      },
      {
        "id": 34,
        "name": "CloudLift",
        "stage": {
          "id": 10,
          "name": "ASSIMILATE"
        }
      },
      {
        "id": 49,
        "name": "PaaS Principles",
        "stage": {
          "id": 4,
          "name": "LEARN"
        }
      },
      {
        "id": 52,
        "name": "CDE Test substage",
        "stage": {
          "id": 10,
          "name": "ASSIMILATE"
        }
      }
    ]
      
    it('should call the get all substage api and update the store value ', (done) => {

      var expectedActions = {
        type: types.LOAD_ADMIN_SUBSTAGES_SUCCESS, 
        subStageList: availableSubStages
      };
      
      const store = mockStore(initialState, expectedActions);
      expectedActions = store.dispatch(expectedActions);
      const actualActions = adminSubStagesAction.loadAdminSubStagesSuccess(availableSubStages);
      expect(expectedActions).toEqual(actualActions);
      expect(expectedActions.type).toEqual(actualActions.type);
      expect(expectedActions.subStageList).toEqual(actualActions.subStageList);
      done();
    });
  });

  describe('Create new substage action', () => {
    afterEach(() => {
      nock.cleanAll();
    });

    const subStageInfo = {
      "name": "CDE Test substage",
      "stage": {
        "id": 10
      }
    }
    
    it('should call the create substage api and update the store value ', (done) => {
      var expectedActions = {
        type: types.CREATE_ADMIN_SUBSTAGE_SUCCESS, 
        newSubStage: subStageInfo
      };
      
      const store = mockStore(initialState, expectedActions);
      expectedActions = store.dispatch(expectedActions);
      const actualActions = adminSubStagesAction.createAdminSubStageSuccess(subStageInfo);
      expect(expectedActions).toEqual(actualActions);
      expect(expectedActions.type).toEqual(actualActions.type);
      expect(expectedActions.newSubStage).toEqual(actualActions.newSubStage);
      done();
    });
  });

  describe('Update substage action', () => {
    afterEach(() => {
      nock.cleanAll();
    });

    const subStageInfo = {
      "id": 52,
      "name": "CDE Test substage",
      "stage": {
        "id": 10,
        "name": "ASSIMILATE"
      }
    }
    
    it('should call the updateSubStageBySubStageId api and update the store value ', (done) => {
      var expectedActions = {
        type: types.UPDATE_ADMIN_SUBSTAGE_SUCCESS, 
        updatedSubStage: subStageInfo
      };
      
      const store = mockStore(initialState, expectedActions);
      expectedActions = store.dispatch(expectedActions);
      const actualActions = adminSubStagesAction.updateAdminSubStageSuccess(subStageInfo);
      expect(expectedActions).toEqual(actualActions);
      expect(expectedActions.type).toEqual(actualActions.type);
      expect(expectedActions.updatedSubStage).toEqual(actualActions.updatedSubStage);
      done();
    });
  });

  describe('Delete substage action', () => {
    afterEach(() => {
      nock.cleanAll();
    });

    it('should call the deteleSubStageBySubStageId api and update the store value ', (done) => {
      var expectedActions = {
        type: types.DELETE_ADMIN_SUBSTAGE_SUCCESS, 
        deletedSubStageId : 125
      };
      
      const store = mockStore(initialState, expectedActions);
      expectedActions = store.dispatch(expectedActions);
      const actualActions = adminSubStagesAction.deleteAdminSubStageSuccess(125);
      expect(expectedActions).toEqual(actualActions);
      expect(expectedActions.type).toEqual(actualActions.type);
      expect(expectedActions.deletedSubStageId).toEqual(actualActions.deletedSubStageId);
      done();
    });
  });
});