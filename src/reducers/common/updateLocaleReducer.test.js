import expect from 'expect';
import updateLocaleReducer from './updateLocaleReducer';
import * as updateLocaleActions from '../../actions/common/updateLocaleActions';
import initialState from '../common/initialState';
 import $ from 'jquery';
describe('updateLocale reducer', () => {

(function (glob) {
    function mockStorage() {
        var storage = {};
        return {
            setItem: function(key, value) {
                storage[key] = value || '';
            },
            getItem: function(key) {
                return storage[key];
            },
            removeItem: function(key) {
                delete storage[key];
            },
            get length () {
                return Object.keys(storage).length;
            },
            key: function(i) {
                var keys = Object.keys(storage);
                return keys[i] || null;
            }
        };
    }
    glob.localStorage = mockStorage();
    glob.sessionStorage = mockStorage();
}(typeof window !== 'undefined' ? window : global));


	it('it should update the selected Locale', () => {
		const locale = 'en';

		const updateLocaleAction = updateLocaleActions.updateLocaleSuccess(locale);
   	    const newStateValue = updateLocaleReducer(initialState, updateLocaleAction);
    	expect(newStateValue).toEqual(locale);

  	});
});
