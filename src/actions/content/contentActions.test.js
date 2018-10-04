import expect from 'expect';
import * as contentActions from './contentActions';
import * as types from '../common/actionTypes';
import initialState from '../../reducers/common/initialState';

import thunk from 'redux-thunk';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';


describe('Content Action', () => {

  describe('load content Success action creator', () => {
    it('should load the current content details', () => {
      const contentInfo = {
        "id": 157,
        "name": "CDE offerings & Solutions",
        "title": "CDE offerings & Solutions",
        "header": "CDE offerings & Solutions",
        "description": "Cognizant Digital Engineering enables clients to realize the transformation of cloud native application at-scale using insights about customer behavior to streamline existing portfolios and drive continuous innovation with 4 key offerings.",
        "subStage": {
          "id": 4,
          "name": "CDE- A glimpse of Onboarding"
        },
        "documents": [
          {
            "id": 166,
            "type": "PDF",
            "url": "https://www.cognizant.com/Resources/speeding-human-centered-technology-to-market.pdf"
          }
        ],
        "roles": [
          {
            "id": 31,
            "name": "Developer",
            "status": "Active",
            "description": "Developer",
            "users": [
              
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
            "id": 79,
            "name": "Product Managers",
            "status": "Active",
            "description": "This is where all product managers of CDE would be added",
            "users": [
              
            ]
          }
        ],
        "footer": "CDE offerings & Solutions",
        "createdOn": null
      }   
      const expectedAction = {
        type: types.LOAD_CONTENT_SUCCESS,
        contentDetails: contentInfo  
      }; 

      const actutalAction = contentActions.loadContentSuccess(contentInfo);
      expect(actutalAction).toEqual(expectedAction);
      expect(actutalAction.type).toEqual(expectedAction.type);
      expect(actutalAction.contentDetails).toEqual(expectedAction.contentDetails);
    });
  });
	
  describe('Remove content Success action creator', () => {
    describe('Remove content', () => {
      it('should remove content', () => {
        const contentInfo = {};       
        const expectedAction = {
          type: types.REMOVE_CONTENT_SUCCESS,
          contentDetails: contentInfo  
        };

        const actutalAction = contentActions.removeContentSuccess(contentInfo);
        expect(actutalAction).toEqual(expectedAction);
        expect(actutalAction.type).toEqual(expectedAction.type);
        expect(actutalAction.contentDetails).toEqual(expectedAction.contentDetails);
      });
    });
  });


	const middleware = [thunk];
	const mockStore = configureMockStore(middleware);

	describe('load conent based on ID success', () => {
    afterEach(() => {
      nock.cleanAll();
    });

    const contentInfo = {
      "id": 157,
      "name": "CDE offerings & Solutions",
      "title": "CDE offerings & Solutions",
      "header": "CDE offerings & Solutions",
      "description": "Cognizant Digital Engineering enables clients to realize the transformation of cloud native application at-scale using insights about customer behavior to streamline existing portfolios and drive continuous innovation with 4 key offerings.",
      "subStage": {
        "id": 4,
        "name": "CDE- A glimpse of Onboarding"
      },
      "documents": [
        {
          "id": 166,
          "type": "PDF",
          "url": "https://www.cognizant.com/Resources/speeding-human-centered-technology-to-market.pdf"
        }
      ],
      "roles": [
        {
          "id": 31,
          "name": "Developer",
          "status": "Active",
          "description": "Developer",
          "users": [
            
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
          "id": 79,
          "name": "Product Managers",
          "status": "Active",
          "description": "This is where all product managers of CDE would be added",
          "users": [
            
          ]
        }
      ],
      "footer": "CDE offerings & Solutions",
      "createdOn": null
    } 
      
    it('should call the login api and update the store value ', (done) => {

      var expectedActions = {
        type: types.LOAD_CONTENT_SUCCESS, 
        contentDetails: contentInfo
      };
      
      const store = mockStore(initialState, expectedActions);
      expectedActions = store.dispatch(expectedActions);
      const actualActions = contentActions.loadContentSuccess(contentInfo);
      expect(expectedActions).toEqual(actualActions);
      expect(expectedActions.type).toEqual(actualActions.type);
      expect(expectedActions.contentDetails).toEqual(actualActions.contentDetails);
      done();
    });
  });

  describe('Remove content Info', () => {
    afterEach(() => {
      nock.cleanAll();
    });

    const contentInfo ={};
    
    it('should remove the content state value and update the store value ', (done) => {
      var expectedActions = {
        type: types.REMOVE_CONTENT_SUCCESS, 
        contentDetails: contentInfo
      };
      
      const store = mockStore(initialState, expectedActions);
      expectedActions = store.dispatch(expectedActions);
      const actualActions = contentActions.removeContentSuccess(contentInfo);
      expect(expectedActions).toEqual(actualActions);
      expect(expectedActions.type).toEqual(actualActions.type);
      expect(expectedActions.contentDetails).toEqual(actualActions.contentDetails);
      done();
    });
  });
});
