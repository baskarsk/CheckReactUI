import expect from 'expect';
import * as updateLocaleActions from './updateLocaleActions';
import * as types from '../common/actionTypes';
import initialState from '../../reducers/common/initialState';
import $ from 'jquery';
import thunk from 'redux-thunk';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';

describe('update Locale Action', () => {
  	describe('updateLocaleSuccess', () => {
    	it('should update the selected locale', () => {
     		const locale ='en';
	      	const expectedAction = {
	       		type: types.UPDATE_LOCALE,
	       		locale: locale	
	      	};

		    const actutalAction = updateLocaleActions.updateLocaleSuccess(locale);
		    expect(actutalAction).toEqual(expectedAction);
		    expect(actutalAction.type).toEqual(expectedAction.type);
		    expect(actutalAction.locale).toEqual(expectedAction.locale);
    	});
  	});
	const middleware = [thunk];
// 	const mockStore = configureMockStore(middleware);

// 	describe('update selected locale', () => {
// 	  	afterEach(() => {
// 		    nock.cleanAll();
// 		});

// 	  	const locale = 'en';

// 	 	it('should call the vaidate appName Api and update the store value ', (done) => {
		    
// 		    var expectedActions = {
// 		    	type: types.VALIDATE_APPNAME_SUCCESS, 
// 		    	response: status
// 		    };
		    
// 		    const store = mockStore(initialState, expectedActions);
// 		    expectedActions = store.dispatch(expectedActions);
// 		   	const actualActions = validateAppnameActions.regionSuccess(status);
// 		   	expect(expectedActions).toEqual(actualActions);
// 		   	expect(expectedActions.type).toEqual(actualActions.type);
// 		    expect(expectedActions.response).toEqual(actualActions.response);
// 		    done();
// 	  	});
// 	});
});
// 	


