import expect from 'expect';
import * as contentStatusActions from './contentStatusActions';
import * as types from '../common/actionTypes';
import initialState from '../../reducers/common/initialState';

import thunk from 'redux-thunk';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';


describe('Content Status Action', () => {

  describe('load content status Success action creator', () => {
    it('should load the list of content status details', () => {
      const contentStatusInfo = [{"id":106,"user_id":220,"content_id":166,"status":"INPROGRESS"}];   
      const expectedAction = {
        type: types.LOAD_CONTENTS_STATUS_SUCCESS,
        contentsStatusDetails: contentStatusInfo  
      }; 

      const actutalAction = contentStatusActions.loadContentsStatusSuccess(contentStatusInfo);
      expect(actutalAction).toEqual(expectedAction);
      expect(actutalAction.type).toEqual(expectedAction.type);
      expect(actutalAction.contentsStatusDetails).toEqual(expectedAction.contentsStatusDetails);
    });
  });
	
  const middleware = [thunk];
	const mockStore = configureMockStore(middleware);

	describe('load content Status Action', () => {
    afterEach(() => {
      nock.cleanAll();
    });

    const contentStatusInfo = [{"id":106,"user_id":220,"content_id":166,"status":"INPROGRESS"}]; 
      
    it('should call the load content status api and update the store value ', (done) => {

      var expectedActions = {
        type: types.LOAD_CONTENTS_STATUS_SUCCESS, 
        contentsStatusDetails: contentStatusInfo
      };
      
      const store = mockStore(initialState, expectedActions);
      expectedActions = store.dispatch(expectedActions);
      const actualActions = contentStatusActions.loadContentsStatusSuccess(contentStatusInfo);
      expect(expectedActions).toEqual(actualActions);
      expect(expectedActions.type).toEqual(actualActions.type);
      expect(expectedActions.contentsStatusDetails).toEqual(actualActions.contentsStatusDetails);
      done();
    });
  });
});
