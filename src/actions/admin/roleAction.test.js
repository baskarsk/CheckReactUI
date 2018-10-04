import expect from 'expect';
import * as roleAction from './roleAction';
import * as types from '../common/actionTypes';
import initialState from '../../reducers/common/initialState';

import thunk from 'redux-thunk';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';


describe('Roles Action', () => {

  describe('load roles Success action creator', () => {
    it('should load the list of available roles with details', () => {
      const availableRoles = [
        {
          "id": 4,
          "name": "Manager",
          "status": "active",
          "description": "Manager",
          "users": [
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
        },
        {
          "id": 31,
          "name": "Developer",
          "status": "Active",
          "description": "Developer",
          "users": [
            
          ]
        },
        {
          "id": 37,
          "name": "Architect",
          "status": "Active",
          "description": "Architect",
          "users": [
            {
              "id": 31,
              "password": "$2a$10$BGImKDFlrKERwclYpGFoj.8f0M9w/0U8GZv60a0geZA5sruQrobFW",
              "emailId": "Baskar.Saravanan@cognizant.com",
              "userName": "Baskar.Saravanan@cognizant.com",
              "firstName": "Baskar",
              "lastName": "S",
              "language": null,
              "admin": true
            }
          ]
        },
        {
          "id": 76,
          "name": "CSE",
          "status": "Active",
          "description": "This is where all sales leaders would be added to.",
          "users": [
            
          ]
        },
        {
          "id": 79,
          "name": "Product Managers",
          "status": "Active",
          "description": "This is where all product managers of CDE would be added",
          "users": [
            
          ]
        },
        {
          "id": 88,
          "name": "Full stack developer",
          "status": "Active",
          "description": "Full stack developer",
          "users": [
            
          ]
        }
      ]
      const expectedAction = {
        type: types.LOAD_ROLES_SUCCESS,
        roleList: availableRoles  
      }; 

      const actutalAction = roleAction.loadRoleSuccess(availableRoles);
      expect(actutalAction).toEqual(expectedAction);
      expect(actutalAction.type).toEqual(expectedAction.type);
      expect(actutalAction.roleList).toEqual(expectedAction.roleList);
    });
  });
	
  describe('Get current role details action creator', () => {
    describe('Get current role info by id', () => {
      it('should load current role informations', () => {
        const roleInfo = {
          "id": 37,
          "name": "Architect",
          "status": "Active",
          "description": "Architect",
          "users": [
            {
              "id": 31,
              "password": "$2a$10$BGImKDFlrKERwclYpGFoj.8f0M9w/0U8GZv60a0geZA5sruQrobFW",
              "emailId": "Baskar.Saravanan@cognizant.com",
              "userName": "Baskar.Saravanan@cognizant.com",
              "firstName": "Baskar",
              "lastName": "S",
              "language": null,
              "admin": true
            }
          ]
        }       
        const expectedAction = {
          type: types.GET_ROLE_SUCCESS,
          roleData: roleInfo  
        };

        const actutalAction = roleAction.getRoleSuccess(roleInfo);
        expect(actutalAction).toEqual(expectedAction);
        expect(actutalAction.type).toEqual(expectedAction.type);
        expect(actutalAction.roleData).toEqual(expectedAction.roleData);
      });
    });
  });

  describe('Create new role action creator', () => {
    describe('create new role', () => {
      it('should create a role with provide information', () => {
        const roleInfo = {
          "name": "Architect",
          "status": "Active",
          "description": "Architect"
        };       
        const expectedAction = {
          type: types.CREATE_ROLE_SUCCESS,
          createdRoleData: roleInfo  
        };

        const actutalAction = roleAction.createRoleSuccess(roleInfo);
        expect(actutalAction).toEqual(expectedAction);
        expect(actutalAction.type).toEqual(expectedAction.type);
        expect(actutalAction.createdRoleData).toEqual(expectedAction.createdRoleData);
      });
    });
  });

  describe('Update role details action creator', () => {
    describe('Update existing role info', () => {
      it('should update the role information with provide information', () => {
        const roleInfo = {
          "id": 37,
          "name": "Architect",
          "status": "Active",
          "description": "Architect role",
          "users": [
            {
              "id": 31,
              "password": "$2a$10$BGImKDFlrKERwclYpGFoj.8f0M9w/0U8GZv60a0geZA5sruQrobFW",
              "emailId": "Baskar.Saravanan@cognizant.com",
              "userName": "Baskar.Saravanan@cognizant.com",
              "firstName": "Baskar",
              "lastName": "S",
              "language": null,
              "admin": true
            }
          ]
        }       
        const expectedAction = {
          type: types.UPDATE_ROLE_SUCCESS,
          updatedRoleData: roleInfo  
        };

        const actutalAction = roleAction.updateRoleSuccess(roleInfo);
        expect(actutalAction).toEqual(expectedAction);
        expect(actutalAction.type).toEqual(expectedAction.type);
        expect(actutalAction.updatedRoleData).toEqual(expectedAction.updatedRoleData);
      });
    });
  });

  describe('Delete role action creator', () => {
    describe('Delete role info', () => {
      it('should delete role information by user Id', () => {
              
        const expectedAction = {
          type: types.DELETE_ROLE_SUCCESS,
        };

        const actutalAction = roleAction.deleteRoleSuccess();
        expect(actutalAction).toEqual(expectedAction);
        expect(actutalAction.type).toEqual(expectedAction.type);
      });
    });
  });

	const middleware = [thunk];
	const mockStore = configureMockStore(middleware);

	describe('load list of role success', () => {
    afterEach(() => {
      nock.cleanAll();
    });

    const availableRoles = [
      {
        "id": 4,
        "name": "Manager",
        "status": "active",
        "description": "Manager",
        "users": [
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
      },
      {
        "id": 31,
        "name": "Developer",
        "status": "Active",
        "description": "Developer",
        "users": [
          
        ]
      },
      {
        "id": 37,
        "name": "Architect",
        "status": "Active",
        "description": "Architect",
        "users": [
          {
            "id": 31,
            "password": "$2a$10$BGImKDFlrKERwclYpGFoj.8f0M9w/0U8GZv60a0geZA5sruQrobFW",
            "emailId": "Baskar.Saravanan@cognizant.com",
            "userName": "Baskar.Saravanan@cognizant.com",
            "firstName": "Baskar",
            "lastName": "S",
            "language": null,
            "admin": true
          }
        ]
      },
      {
        "id": 76,
        "name": "CSE",
        "status": "Active",
        "description": "This is where all sales leaders would be added to.",
        "users": [
          
        ]
      },
      {
        "id": 79,
        "name": "Product Managers",
        "status": "Active",
        "description": "This is where all product managers of CDE would be added",
        "users": [
          
        ]
      },
      {
        "id": 88,
        "name": "Full stack developer",
        "status": "Active",
        "description": "Full stack developer",
        "users": [
          
        ]
      }
    ]
      
    it('should call the get all roles api and update the store value ', (done) => {

      var expectedActions = {
        type: types.LOAD_ROLES_SUCCESS, 
        roleList: availableRoles
      };
      
      const store = mockStore(initialState, expectedActions);
      expectedActions = store.dispatch(expectedActions);
      const actualActions = roleAction.loadRoleSuccess(availableRoles);
      expect(expectedActions).toEqual(actualActions);
      expect(expectedActions.type).toEqual(actualActions.type);
      expect(expectedActions.roleList).toEqual(actualActions.roleList);
      done();
    });
  });

  describe('Get specific role details by role id', () => {
    afterEach(() => {
      nock.cleanAll();
    });

    const roleInfo = {
      "id": 37,
      "name": "Architect",
      "status": "Active",
      "description": "Architect",
      "users": [
        {
          "id": 31,
          "password": "$2a$10$BGImKDFlrKERwclYpGFoj.8f0M9w/0U8GZv60a0geZA5sruQrobFW",
          "emailId": "Baskar.Saravanan@cognizant.com",
          "userName": "Baskar.Saravanan@cognizant.com",
          "firstName": "Baskar",
          "lastName": "S",
          "language": null,
          "admin": true
        }
      ]
    }
    
    it('should call the getRoleById api and update the store value ', (done) => {
      var expectedActions = {
        type: types.GET_ROLE_SUCCESS, 
        roleData: roleInfo
      };
      
      const store = mockStore(initialState, expectedActions);
      expectedActions = store.dispatch(expectedActions);
      const actualActions = roleAction.getRoleSuccess(roleInfo);
      expect(expectedActions).toEqual(actualActions);
      expect(expectedActions.type).toEqual(actualActions.type);
      expect(expectedActions.roleData).toEqual(actualActions.roleData);
      done();
    });
  });

  describe('Create new role action', () => {
    afterEach(() => {
      nock.cleanAll();
    });

    const roleInfo = {
      "name": "Architect",
      "status": "Active",
      "description": "Architect"      
    }
    
    it('should call the create role api and update the store value ', (done) => {
      var expectedActions = {
        type: types.CREATE_ROLE_SUCCESS, 
        createdRoleData: roleInfo
      };
      
      const store = mockStore(initialState, expectedActions);
      expectedActions = store.dispatch(expectedActions);
      const actualActions = roleAction.createRoleSuccess(roleInfo);
      expect(expectedActions).toEqual(actualActions);
      expect(expectedActions.type).toEqual(actualActions.type);
      expect(expectedActions.createdRoleData).toEqual(actualActions.createdRoleData);
      done();
    });
  });

  describe('Update role action', () => {
    afterEach(() => {
      nock.cleanAll();
    });

    const roleInfo = {
      "id": 37,
      "name": "Architect",
      "status": "Active",
      "description": "Architect details",
      "users": [
        {
          "id": 31,
          "password": "$2a$10$BGImKDFlrKERwclYpGFoj.8f0M9w/0U8GZv60a0geZA5sruQrobFW",
          "emailId": "Baskar.Saravanan@cognizant.com",
          "userName": "Baskar.Saravanan@cognizant.com",
          "firstName": "Baskar",
          "lastName": "S",
          "language": null,
          "admin": true
        }
      ]
    }
    
    it('should call the updateRoleByRoleId api and update the store value ', (done) => {
      var expectedActions = {
        type: types.UPDATE_ROLE_SUCCESS, 
        updatedRoleData: roleInfo
      };
      
      const store = mockStore(initialState, expectedActions);
      expectedActions = store.dispatch(expectedActions);
      const actualActions = roleAction.updateRoleSuccess(roleInfo);
      expect(expectedActions).toEqual(actualActions);
      expect(expectedActions.type).toEqual(actualActions.type);
      expect(expectedActions.updatedRoleData).toEqual(actualActions.updatedRoleData);
      done();
    });
  });

  describe('Delete role action', () => {
    afterEach(() => {
      nock.cleanAll();
    });

    it('should call the deteleRoleByRoleId api and update the store value ', (done) => {
      var expectedActions = {
        type: types.DELETE_ROLE_SUCCESS, 
      };
      
      const store = mockStore(initialState, expectedActions);
      expectedActions = store.dispatch(expectedActions);
      const actualActions = roleAction.deleteRoleSuccess();
      expect(expectedActions).toEqual(actualActions);
      expect(expectedActions.type).toEqual(actualActions.type);
      done();
    });
  });
});