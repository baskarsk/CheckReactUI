import expect from 'expect';
import contentStatusReducer from './contentStatusReducer';
import * as contentStatusActions from '../../actions/contentStatus/contentStatusActions';
import initialState from '../common/initialState';

describe('Content Status Reducer ', () => {
  describe('Load content Status details success scenario', () =>{
    it('it should store the content status details in store', () => {
      const contentStatusDetails = [{"id":106,"user_id":220,"content_id":166,"status":"INPROGRESS"}]
      const contentStatusAction = contentStatusActions.loadContentsStatusSuccess(contentStatusDetails);
       const newStateValue = contentStatusReducer(initialState, contentStatusAction);
       expect(newStateValue).toEqual(contentStatusDetails);
    });
  }); 
});
