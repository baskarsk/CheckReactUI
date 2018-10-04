import expect from 'expect';
import adminStagesReducer from './adminStagesReducer';
import * as adminStagesActions from '../../actions/admin/adminStagesAction';
import initialState from '../common/initialState';

describe('Admin Stage Reducer ', () => {
  describe('Get list of stage  success scenario', () =>{
    it('it should get the available stages and store the values in store.', () => {
      const stageList = [
        {
          "id": 4,
          "name": "DISCOVER"
        },
        {
          "id": 7,
          "name": "ASSIMILATE"
        },
        {
          "id": 10,
          "name": "LEARN"
        }
      ]
      const adminStagesAction = adminStagesActions.loadAdminStagesSuccess(stageList);
      const newStateValue = adminStagesReducer(initialState, adminStagesAction);
      expect(newStateValue).toEqual(stageList);
    });
  });  


  describe('Remove stage success scenario', () =>{
    it('it should remove the stage details from store.', () => {
      const stageList = [];
      const adminStagesAction = adminStagesActions.removeAdminStagesSuccess(stageList);
      const newStateValue = adminStagesReducer(initialState, adminStagesAction);
      expect(newStateValue).toEqual(stageList);
    });
  });  
});
