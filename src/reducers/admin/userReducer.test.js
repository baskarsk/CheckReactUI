import expect from 'expect';
import userReducer from './userReducer';
import * as userActions from '../../actions/admin/userAction';
import initialState from '../common/initialState';

describe('User Reducer ', () => {
  describe('Get user info success scenario', () =>{
    it('it should get the specific user information and store the values in store.', () => {
      const userDetails = {
        "id": 205,
        "emailId": "nithya.madhavan@cognizant.com ",
        "userName": "nithya.madhavan@cognizant.com ",
        "firstName": "Nithya",
        "lastName": "M",
        "language": null,
        "role_id": 4,
        "role_name": "Senior Manager",
        "admin": true
      }
      const userAction = userActions.getUserSuccess(userDetails);
      const newStateValue = userReducer(initialState, userAction);
      expect(newStateValue).toEqual(userDetails);
    });
  });

  describe('Create new user success scenario', () =>{
    it('it should create a new user and store the create user info in store.', () => {
      const userDetails = {
        "emailId": "nithya.madhavan@cognizant.com ",
        "userName": "nithya.madhavan@cognizant.com ",
        "firstName": "Nithya",
        "lastName": "M",
        "language": null,
        "role_id": 4,
        "role_name": "Senior Manager",
        "admin": true
      }
      const userAction = userActions.createUserSuccess(userDetails);
      const newStateValue = userReducer(initialState, userAction);
      expect(newStateValue).toEqual(userDetails);
    });
  });

  describe('Update existing user success scenario', () =>{
    it('it should update the existing user and store the user info in store.', () => {
      const userDetails = {
        "id": 205,
        "emailId": "nithya.madhavan@cognizant.com ",
        "userName": "nithya.madhavan@cognizant.com ",
        "firstName": "Nithya",
        "lastName": "M",
        "language": null,
        "role_id": 4,
        "role_name": "Senior Manager",
        "admin": true
      }
      const userAction = userActions.udpateUserSuccess(userDetails);
      const newStateValue = userReducer(initialState, userAction);
      expect(newStateValue).toEqual(userDetails);
    });
  });

  describe('Delete user success scenario', () =>{
    it('it should remove specific user by user id and update the user list store value', () => {
      const userDetails = {};
      const userAction = userActions.deleteUserSuccess();
       const newStateValue = userReducer(initialState, userAction);
       expect(newStateValue).toEqual(userDetails);
    });
  });  
});
