import expect from 'expect';
import roleReducer from './roleReducer';
import * as roleActions from '../../actions/admin/roleAction';
import initialState from '../common/initialState';

describe('Role Reducer ', () => {
  describe('Get role info success scenario', () =>{
    it('it should get the specific role information and store the values in store.', () => {
      const roleDetails = {
        "id": 4,
        "name": "Senior Manager",
        "status": "active",
        "description": "Senior Manager",
        "users": [
          {
            "id": 205,
            "password": "$2a$10$rYvuFJItY.RfqfNEsT7kHOgfsAmORtuDyqBx6yszwb.nUw5vOe7kq",
            "emailId": "nithya.madhavan@cognizant.com ",
            "userName": "nithya.madhavan@cognizant.com ",
            "firstName": "Nithya",
            "lastName": "M",
            "language": null,
            "admin": true
          }
        ]
      }
      const roleAction = roleActions.getRoleSuccess(roleDetails);
      const newStateValue = roleReducer(initialState, roleAction);
      expect(newStateValue).toEqual(roleDetails);
    });
  });

  describe('Create new role success scenario', () =>{
    it('it should create a new role and store the create role info in store.', () => {
      const roleDetails = {
        "name": "Senior Manager",
        "status": "active",
        "description": "Senior Manager"
      }
      const roleAction = roleActions.createRoleSuccess(roleDetails);
      const newStateValue = roleReducer(initialState, roleAction);
      expect(newStateValue).toEqual(roleDetails);
    });
  });

  describe('Update existing role success scenario', () =>{
    it('it should update the existing role and store the role info in store.', () => {
      const roleDetails = {
        "id": 4,
        "name": "Senior Manager",
        "status": "active",
        "description": "Senior Manager",
        "users": [
          {
            "id": 205,
            "password": "$2a$10$rYvuFJItY.RfqfNEsT7kHOgfsAmORtuDyqBx6yszwb.nUw5vOe7kq",
            "emailId": "nithya.madhavan@cognizant.com ",
            "userName": "nithya.madhavan@cognizant.com ",
            "firstName": "Nithya",
            "lastName": "M",
            "language": null,
            "admin": true
          }
        ]
      }
      const roleAction = roleActions.updateRoleSuccess(roleDetails);
      const newStateValue = roleReducer(initialState, roleAction);
      expect(newStateValue).toEqual(roleDetails);
    });
  });

  describe('Delete role success scenario', () =>{
    it('it should remove specific role by role id and update the role list store value', () => {
      const roleDetails = {};
      const roleAction = roleActions.deleteRoleSuccess();
       const newStateValue = roleReducer(initialState, roleAction);
       expect(newStateValue).toEqual(roleDetails);
    });
  });  
});
