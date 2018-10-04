import expect from 'expect';
import loginReducer from './loginReducer';
import * as loginActions from '../../actions/login/loginActions';
import initialState from '../common/initialState';

describe('Login Reducer ', () => {
  describe('Login success scenario', () =>{
    it('it should store the accesstoken of logged in user on successful login', () => {
      const loginDetails = {};
      loginDetails.userName = "nithya.madhavan@cognizant.com";
      loginDetails.password = "password";
      const loginAction = loginActions.loginSuccess(loginDetails);
       const newStateValue = loginReducer(initialState, loginAction);
       expect(newStateValue).toEqual(loginDetails);
    });
  });
  describe('Logout success scenario', () =>{
    it('it should remove the accesstoken of logged in user on successful logout', () => {
      const loginDetails = {};
      const loginAction = loginActions.logoutSuccess(loginDetails);
       const newStateValue = loginReducer(initialState, loginAction);
       expect(newStateValue).toEqual(loginDetails);
    });
  });  
});
