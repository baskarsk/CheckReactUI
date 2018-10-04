import expect from 'expect';
import userReducer from './userReducer';
import * as userActions from '../../actions/user/userActions';
import initialState from '../common/initialState';

describe('User Reducer ', () => {
  describe('Load user information success scenario', () =>{
    it('it should store the loggin in user details in store', () => {
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
      const userAction = userActions.userInfoSuccess(userDetails);
       const newStateValue = userReducer(initialState, userAction);
       expect(newStateValue).toEqual(userDetails);
    });
  });
  
  describe('Remove user information success scenario', () =>{
    it('it should remove the logged in user details', () => {
      const userDetails = {};
      const userAction = userActions.removeUserInfoSuccess(userDetails);
       const newStateValue = userReducer(initialState, userAction);
       expect(newStateValue).toEqual(userDetails);
    });
  });  
});
