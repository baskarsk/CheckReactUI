import expect from 'expect';
import * as userAction from './userAction';
import * as types from '../common/actionTypes';
import initialState from '../../reducers/common/initialState';

import thunk from 'redux-thunk';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';


describe('User Action', () => {

  describe('load users Success action creator', () => {
    it('should load the list of available user with details', () => {
      const availableUsers = [
        {
          "id": 22,
          "password": "$2a$10$rADu.CVRet4X7nTsv.c72OKMJ1lEba5lzTibWmA6JIvXH2qVjfAMu",
          "emailId": "sriram.v@cognizant.com",
          "userName": "sriram.v@cognizant.com",
          "firstName": "Sriram",
          "lastName": "V",
          "language": null,
          "admin": true
        },
        {
          "id": 31,
          "password": "$2a$10$BGImKDFlrKERwclYpGFoj.8f0M9w/0U8GZv60a0geZA5sruQrobFW",
          "emailId": "Baskar.Saravanan@cognizant.com",
          "userName": "Baskar.Saravanan@cognizant.com",
          "firstName": "Baskar",
          "lastName": "S",
          "language": null,
          "admin": true
        },
        {
          "id": 124,
          "password": "$2a$10$iU9xcT2Xd87vKdu9egj.ReXj7f3En6HQpN8yJuR39OwhByJMLEkX.",
          "emailId": "nithya.madhavan@cognizant.com",
          "userName": "nithya.madhavan@cognizant.com",
          "firstName": "Nithya",
          "lastName": "Madhavan",
          "language": null,
          "admin": true
        },
        {
          "id": 136,
          "password": "$2a$10$nm7amRZGwLnkFXUNLKa/hOm//WxR6anALLZXfaMB0SN21710wOxHq",
          "emailId": "Selva.natarajan@cognizant.com",
          "userName": "Selva.natarajan@cognizant.com",
          "firstName": "Selva",
          "lastName": "N",
          "language": null,
          "admin": false
        },
        {
          "id": 160,
          "password": "$2a$10$zUtMyzCn/f7zHXXQKL1LAeDUesWhDgSzotWDUbrTMHPpjADpg3bhG",
          "emailId": "manisha.yarlagadda@cognizant.com",
          "userName": "manisha.yarlagadda@cognizant.com",
          "firstName": "Manisha",
          "lastName": "yarlagadda",
          "language": null,
          "admin": true
        }
      ] 
      const expectedAction = {
        type: types.LOAD_USER_SUCCESS,
        userList: availableUsers  
      }; 

      const actutalAction = userAction.loadUserSuccess(availableUsers);
      expect(actutalAction).toEqual(expectedAction);
      expect(actutalAction.type).toEqual(expectedAction.type);
      expect(actutalAction.userList).toEqual(expectedAction.userList);
    });
  });
	
  describe('Get current user details action creator', () => {
    describe('Get current user info by id', () => {
      it('should load current user informations', () => {
        const userInfo = {
          "id": 160,
          "password": "$2a$10$zUtMyzCn/f7zHXXQKL1LAeDUesWhDgSzotWDUbrTMHPpjADpg3bhG",
          "emailId": "manisha.yarlagadda@cognizant.com",
          "userName": "manisha.yarlagadda@cognizant.com",
          "firstName": "Manisha",
          "lastName": "yarlagadda",
          "language": null,
          "admin": true
        };       
        const expectedAction = {
          type: types.GET_USER_SUCCESS,
          userData: userInfo  
        };

        const actutalAction = userAction.getUserSuccess(userInfo);
        expect(actutalAction).toEqual(expectedAction);
        expect(actutalAction.type).toEqual(expectedAction.type);
        expect(actutalAction.userData).toEqual(expectedAction.userData);
      });
    });
  });

  describe('Create new user action creator', () => {
    describe('create new user', () => {
      it('should create a user with provide information', () => {
        const userInfo = {
          "password": "password",
          "emailId": "manisha.yarlagadda@cognizant.com",
          "userName": "manisha.yarlagadda@cognizant.com",
          "firstName": "Manisha",
          "lastName": "yarlagadda",
          "language": null,
          "admin": true
        };       
        const expectedAction = {
          type: types.CREATE_USER_SUCCESS,
          createdUserData: userInfo  
        };

        const actutalAction = userAction.createUserSuccess(userInfo);
        expect(actutalAction).toEqual(expectedAction);
        expect(actutalAction.type).toEqual(expectedAction.type);
        expect(actutalAction.createdUserData).toEqual(expectedAction.createdUserData);
      });
    });
  });

  describe('Update user details action creator', () => {
    describe('Update existing user info', () => {
      it('should update the user information with provide information', () => {
        const userInfo = {
          "id" : 165,
          "password": "$2a$10$zUtMyzCn/f7zHXXQKL1LAeDUesWhDgSzotWDUbrTMHPpjADpg3bhG",
          "emailId": "manisha.yarlagadda@cognizant.com",
          "userName": "manisha.yarlagadda@cognizant.com",
          "firstName": "Manisha",
          "lastName": "Y",
          "language": null,
          "admin": true
        };       
        const expectedAction = {
          type: types.UPDATE_USER_SUCCESS,
          updatedUserData: userInfo  
        };

        const actutalAction = userAction.udpateUserSuccess(userInfo);
        expect(actutalAction).toEqual(expectedAction);
        expect(actutalAction.type).toEqual(expectedAction.type);
        expect(actutalAction.updatedUserData).toEqual(expectedAction.updatedUserData);
      });
    });
  });

  describe('Delete user action creator', () => {
    describe('Delete user info', () => {
      it('should delete user information by user Id', () => {
              
        const expectedAction = {
          type: types.DELETE_USER_SUCCESS,
        };

        const actutalAction = userAction.deleteUserSuccess();
        expect(actutalAction).toEqual(expectedAction);
        expect(actutalAction.type).toEqual(expectedAction.type);
      });
    });
  });

	const middleware = [thunk];
	const mockStore = configureMockStore(middleware);

	describe('load conent based on ID success', () => {
    afterEach(() => {
      nock.cleanAll();
    });

    const availableUsers = [
      {
        "id": 22,
        "password": "$2a$10$rADu.CVRet4X7nTsv.c72OKMJ1lEba5lzTibWmA6JIvXH2qVjfAMu",
        "emailId": "sriram.v@cognizant.com",
        "userName": "sriram.v@cognizant.com",
        "firstName": "Sriram",
        "lastName": "V",
        "language": null,
        "admin": true
      },
      {
        "id": 31,
        "password": "$2a$10$BGImKDFlrKERwclYpGFoj.8f0M9w/0U8GZv60a0geZA5sruQrobFW",
        "emailId": "Baskar.Saravanan@cognizant.com",
        "userName": "Baskar.Saravanan@cognizant.com",
        "firstName": "Baskar",
        "lastName": "S",
        "language": null,
        "admin": true
      },
      {
        "id": 124,
        "password": "$2a$10$iU9xcT2Xd87vKdu9egj.ReXj7f3En6HQpN8yJuR39OwhByJMLEkX.",
        "emailId": "nithya.madhavan@cognizant.com",
        "userName": "nithya.madhavan@cognizant.com",
        "firstName": "Nithya",
        "lastName": "Madhavan",
        "language": null,
        "admin": true
      },
      {
        "id": 136,
        "password": "$2a$10$nm7amRZGwLnkFXUNLKa/hOm//WxR6anALLZXfaMB0SN21710wOxHq",
        "emailId": "Selva.natarajan@cognizant.com",
        "userName": "Selva.natarajan@cognizant.com",
        "firstName": "Selva",
        "lastName": "N",
        "language": null,
        "admin": false
      },
      {
        "id": 160,
        "password": "$2a$10$zUtMyzCn/f7zHXXQKL1LAeDUesWhDgSzotWDUbrTMHPpjADpg3bhG",
        "emailId": "manisha.yarlagadda@cognizant.com",
        "userName": "manisha.yarlagadda@cognizant.com",
        "firstName": "Manisha",
        "lastName": "yarlagadda",
        "language": null,
        "admin": true
      }
    ] 
      
    it('should call the get all user api and update the store value ', (done) => {

      var expectedActions = {
        type: types.LOAD_USER_SUCCESS, 
        userList: availableUsers
      };
      
      const store = mockStore(initialState, expectedActions);
      expectedActions = store.dispatch(expectedActions);
      const actualActions = userAction.loadUserSuccess(availableUsers);
      expect(expectedActions).toEqual(actualActions);
      expect(expectedActions.type).toEqual(actualActions.type);
      expect(expectedActions.userList).toEqual(actualActions.userList);
      done();
    });
  });

  describe('Get specific user details by user id', () => {
    afterEach(() => {
      nock.cleanAll();
    });

    const userInfo = {
      "id": 160,
      "password": "$2a$10$zUtMyzCn/f7zHXXQKL1LAeDUesWhDgSzotWDUbrTMHPpjADpg3bhG",
      "emailId": "manisha.yarlagadda@cognizant.com",
      "userName": "manisha.yarlagadda@cognizant.com",
      "firstName": "Manisha",
      "lastName": "yarlagadda",
      "language": null,
      "admin": true
    }
    
    it('should call the getUserById api and update the store value ', (done) => {
      var expectedActions = {
        type: types.GET_USER_SUCCESS, 
        userData: userInfo
      };
      
      const store = mockStore(initialState, expectedActions);
      expectedActions = store.dispatch(expectedActions);
      const actualActions = userAction.getUserSuccess(userInfo);
      expect(expectedActions).toEqual(actualActions);
      expect(expectedActions.type).toEqual(actualActions.type);
      expect(expectedActions.userData).toEqual(actualActions.userData);
      done();
    });
  });

  describe('Create new user action', () => {
    afterEach(() => {
      nock.cleanAll();
    });

    const userInfo = {
      "password": "password",
      "emailId": "manisha.yarlagadda@cognizant.com",
      "userName": "manisha.yarlagadda@cognizant.com",
      "firstName": "Manisha",
      "lastName": "yarlagadda",
      "language": null,
      "admin": true
    }
    
    it('should call the create user api and update the store value ', (done) => {
      var expectedActions = {
        type: types.CREATE_USER_SUCCESS, 
        createdUserData: userInfo
      };
      
      const store = mockStore(initialState, expectedActions);
      expectedActions = store.dispatch(expectedActions);
      const actualActions = userAction.createUserSuccess(userInfo);
      expect(expectedActions).toEqual(actualActions);
      expect(expectedActions.type).toEqual(actualActions.type);
      expect(expectedActions.createdUserData).toEqual(actualActions.createdUserData);
      done();
    });
  });

  describe('Update user action', () => {
    afterEach(() => {
      nock.cleanAll();
    });

    const userInfo = {
      "id" : 165,
      "password": "$2a$10$zUtMyzCn/f7zHXXQKL1LAeDUesWhDgSzotWDUbrTMHPpjADpg3bhG",
      "emailId": "manisha.yarlagadda@cognizant.com",
      "userName": "manisha.yarlagadda@cognizant.com",
      "firstName": "Manisha",
      "lastName": "Y",
      "language": null,
      "admin": true
    }
    
    it('should call the updateUserByUserId api and update the store value ', (done) => {
      var expectedActions = {
        type: types.UPDATE_USER_SUCCESS, 
        updatedUserData: userInfo
      };
      
      const store = mockStore(initialState, expectedActions);
      expectedActions = store.dispatch(expectedActions);
      const actualActions = userAction.udpateUserSuccess(userInfo);
      expect(expectedActions).toEqual(actualActions);
      expect(expectedActions.type).toEqual(actualActions.type);
      expect(expectedActions.updatedUserData).toEqual(actualActions.updatedUserData);
      done();
    });
  });

  describe('Delete user action', () => {
    afterEach(() => {
      nock.cleanAll();
    });

    it('should call the deteleUserByUserId api and update the store value ', (done) => {
      var expectedActions = {
        type: types.DELETE_USER_SUCCESS, 
      };
      
      const store = mockStore(initialState, expectedActions);
      expectedActions = store.dispatch(expectedActions);
      const actualActions = userAction.deleteUserSuccess();
      expect(expectedActions).toEqual(actualActions);
      expect(expectedActions.type).toEqual(actualActions.type);
      done();
    });
  });
});
