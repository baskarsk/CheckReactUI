import expect from 'expect';
import * as userActions from './userActions';
import * as types from '../common/actionTypes';
import initialState from '../../reducers/common/initialState';

import thunk from 'redux-thunk';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';


describe('UserInfo Action', () => {

  describe('Get UserInfo Success action creator', () => {
    it('should get the user details for logged in user', () => {
      const userDetails = {
        "id": 205,
        "password": "$2a$10$rYvuFJItY.RfqfNEsT7kHOgfsAmORtuDyqBx6yszwb.nUw5vOe7kq",
        "emailId": "nithya.madhavan@cognizant.com ",
        "userName": "nithya.madhavan@cognizant.com ",
        "firstName": "Nithya",
        "lastName": "M",
        "language": null,
        "admin": true
      }   
      const expectedAction = {
        type: types.USER_INFO_SUCCESS,
        userInfo: userDetails  
      }; 

      const actutalAction = userActions.userInfoSuccess(userDetails);
      expect(actutalAction).toEqual(expectedAction);
      expect(actutalAction.type).toEqual(expectedAction.type);
      expect(actutalAction.userInfo).toEqual(expectedAction.userInfo);
    });
  });
	
  describe('Remove UserInfo action creator', () => {
    describe('Remove the  UserInfo of logged in user', () => {
      it('should romove the user details when user logout', () => {
        const userDetails = {};       
        const expectedAction = {
          type: types.REMOVE_USER_INFO_SUCCESS,
          userInfo: userDetails  
        };

        const actutalAction = userActions.removeUserInfoSuccess(userDetails);
        expect(actutalAction).toEqual(expectedAction);
        expect(actutalAction.type).toEqual(expectedAction.type);
        expect(actutalAction.userInfo).toEqual(expectedAction.userInfo);
      });
    });
  });


	const middleware = [thunk];
	const mockStore = configureMockStore(middleware);

	describe('UserInfo Success', () => {
    afterEach(() => {
      nock.cleanAll();
    });

    it('should call the userInfo and update the store value ', (done) => {

      const userDetails = {
        "id": 205,
        "password": "$2a$10$rYvuFJItY.RfqfNEsT7kHOgfsAmORtuDyqBx6yszwb.nUw5vOe7kq",
        "emailId": "nithya.madhavan@cognizant.com ",
        "userName": "nithya.madhavan@cognizant.com ",
        "firstName": "Nithya",
        "lastName": "M",
        "language": null,
        "admin": true
      } 
      
      var expectedActions = {
        type: types.USER_INFO_SUCCESS, 
        userInfo: userDetails
      };
      
      const store = mockStore(initialState, expectedActions);
      expectedActions = store.dispatch(expectedActions);
      const actualActions = userActions.userInfoSuccess(userDetails);
      expect(expectedActions).toEqual(actualActions);
      expect(expectedActions.type).toEqual(actualActions.type);
      expect(expectedActions.userInfo).toEqual(actualActions.userInfo);
      done();
    });
  });

  describe('Remove UserInfo', () => {
    afterEach(() => {
      nock.cleanAll();
    });

    const userDetails ={};
    
    it('should remove the userinfo details and update the store value ', (done) => {
      var expectedActions = {
        type: types.REMOVE_USER_INFO_SUCCESS, 
        userInfo: userDetails
      };
      
      const store = mockStore(initialState, expectedActions);
      expectedActions = store.dispatch(expectedActions);
      const actualActions = userActions.removeUserInfoSuccess(userDetails);
      expect(expectedActions).toEqual(actualActions);
      expect(expectedActions.type).toEqual(actualActions.type);
      expect(expectedActions.userInfo).toEqual(actualActions.userInfo);
      done();
    });
  });
});
