import expect from 'expect';
import * as loginActions from './loginActions';
import * as types from '../common/actionTypes';
import initialState from '../../reducers/common/initialState';

import thunk from 'redux-thunk';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';


describe('Login Action', () => {

  describe('Login Success action creator', () => {
    it('should authenticate the logged in user', () => {
      const loginDetails = {}; 
      loginDetails.userName = "nithya.madhavan@cognizant.com";
      loginDetails.password = "password";    
      const expectedAction = {
        type: types.LOGIN_SUCCESS,
        loginInfo: loginDetails  
      }; 

      const actutalAction = loginActions.loginSuccess(loginDetails);
      expect(actutalAction).toEqual(expectedAction);
      expect(actutalAction.type).toEqual(expectedAction.type);
      expect(actutalAction.loginInfo).toEqual(expectedAction.loginInfo);
    });
  });
	
  describe('Logout Success action creator', () => {
    describe('Logout User', () => {
      it('should logout the  user', () => {
        const loginDetails = {};       
        const expectedAction = {
          type: types.LOGOUT_SUCCESS,
          loginInfo: loginDetails  
        };

        const actutalAction = loginActions.logoutSuccess(loginDetails);
        expect(actutalAction).toEqual(expectedAction);
        expect(actutalAction.type).toEqual(expectedAction.type);
        expect(actutalAction.loginInfo).toEqual(expectedAction.loginInfo);
      });
    });
  });


	const middleware = [thunk];
	const mockStore = configureMockStore(middleware);

	describe('login success', () => {
    afterEach(() => {
      nock.cleanAll();
    });

    const login = {};
    login.userName = "nithya.madhavan@cognizant.com";
    login.password = "password";
      
    it('should call the login api and update the store value ', (done) => {

      const tokenDetails = {};
      tokenDetails.accessToken = "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJuaXRoeWEubWFkaGF2YW5AY29nbml6YW50LmNvbSAiLCJleHAiOjE1MTM5MTk1NTR9.cNy7JFE6cwOAswlW7kzExv1FNC2JUvcW-xstE0kT7FpkbPQb5es8JM_2XM20nuM2Wd50HzOTs8SJ7M3q3Ak50g"
      
      var expectedActions = {
        type: types.LOGIN_SUCCESS, 
        loginInfo: tokenDetails
      };
      
      const store = mockStore(initialState, expectedActions);
      expectedActions = store.dispatch(expectedActions);
      const actualActions = loginActions.loginSuccess(tokenDetails);
      expect(expectedActions).toEqual(actualActions);
      expect(expectedActions.type).toEqual(actualActions.type);
      expect(expectedActions.loginInfo).toEqual(actualActions.loginInfo);
      done();
    });
  });

  describe('Logout User', () => {
    afterEach(() => {
      nock.cleanAll();
    });

    const login ={};
    
    it('should logout the user and update the store value ', (done) => {
      var expectedActions = {
        type: types.LOGOUT_SUCCESS, 
        loginInfo: login
      };
      
      const store = mockStore(initialState, expectedActions);
      expectedActions = store.dispatch(expectedActions);
      const actualActions = loginActions.logoutSuccess(login);
      expect(expectedActions).toEqual(actualActions);
      expect(expectedActions.type).toEqual(actualActions.type);
      expect(expectedActions.loginInfo).toEqual(actualActions.loginInfo);
      done();
    });
  });
});
