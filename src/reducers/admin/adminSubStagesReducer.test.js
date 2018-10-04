import expect from 'expect';
import adminSubStagesReducer from './adminSubStagesReducer';
import * as adminSubStagesActions from '../../actions/admin/adminSubStagesAction';
import initialState from '../common/initialState';

describe('Admin SubStage Reducer ', () => {
  describe('Get list of substage  success scenario', () =>{
    it('it should get the available substage and store the values in store.', () => {
      const subStageList = [{"id":79,"name":"Cloud Learnings","stage":{"id":7,"name":"ASSIMILATE"}},{"id":82,"name":"PCF","stage":{"id":4,"name":"DISCOVER"}},{"id":85,"name":"Cloudlift","stage":{"id":10,"name":"LEARN"}},{"id":88,"name":"The Agile Platform","stage":{"id":10,"name":"LEARN"}},{"id":100,"name":"Cloud Fundamentals","stage":{"id":4,"name":"DISCOVER"}},{"id":103,"name":"Cloud Computing ","stage":{"id":10,"name":"LEARN"}},{"id":106,"name":"Digital Engineering Arena","stage":{"id":4,"name":"DISCOVER"}},{"id":109,"name":"Cloud Native Developement","stage":{"id":7,"name":"ASSIMILATE"}},{"id":112,"name":"Cloud Deployment","stage":{"id":7,"name":"ASSIMILATE"}}]
      const adminSubStagesAction = adminSubStagesActions.loadAdminSubStagesSuccess(subStageList);
      const newStateValue = adminSubStagesReducer(initialState, adminSubStagesAction);
      expect(newStateValue).toEqual(subStageList);
    });
  });  


  /*describe('Create substage success scenario', () =>{
    it('it should create a new substage and store the values in store.', () => {
      const subStageData = {
        "id": 79,
        "name": "Cloud Learnings",
        "stage": {
          "id": 7,
          "name": "ASSIMILATE"
        }
      }
      const adminSubStagesAction = adminSubStagesActions.createAdminSubStageSuccess(subStageData);
      const newStateValue = adminSubStagesReducer(initialState, adminSubStagesAction);
      expect(newStateValue).toEqual(subStageData);
    });
  });

  describe('update substage success scenario', () =>{
    it('it should update the existing substage and store the values in store.', () => {
      const subStageData = {
        "id": 79,
        "name": "Cloud Learnings",
        "stage": {
          "id": 7,
          "name": "ASSIMILATE"
        }
      }
      const adminSubStagesAction = adminSubStagesActions.updateAdminSubStageSuccess(subStageData);
      const newStateValue = adminSubStagesReducer(initialState, adminSubStagesAction);
      expect(newStateValue).toEqual(subStageData);
    });
  });


  describe('delete substage success scenario', () =>{
    it('it should delete the substage by subStageId and store the values in store.', () => {
      const subStageId = 4
      const adminSubStagesAction = adminSubStagesActions.deleteAdminSubStageSuccess(subStageId);
      const newStateValue = adminSubStagesReducer(initialState, adminSubStagesAction);
      expect(newStateValue).toEqual(subStageId);
    });
  });*/


  describe('Remove substage success scenario', () =>{
    it('it should remove the substage details from store.', () => {
      const subStageList = [];
      const adminSubStagesAction = adminSubStagesActions.removeAdminSubStagesSuccess(subStageList);
      const newStateValue = adminSubStagesReducer(initialState, adminSubStagesAction);
      expect(newStateValue).toEqual(subStageList);
    });
  });  
});
