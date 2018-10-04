import expect from 'expect';
import contentReducer from './contentReducer';
import * as contentActions from '../../actions/content/contentActions';
import initialState from '../common/initialState';

describe('Content Reducer ', () => {
  describe('Load content details success scenario', () =>{
    it('it should store the content details in store', () => {
      const contentDetails = {
        "id": 169,
        "name": "ManagerContent",
        "title": "ManagerContent",
        "header": "ManagerContent",
        "description": "ManagerContent",
        "subStage": {
          "id": 85,
          "name": "Cloudlift"
        },
        "documents": [
          {
            "id": 187,
            "type": "PPT",
            "url": "https://cognizantglobal.box.com/s/ol3p74wt7wcx9zldpxn41kw5a23bafgb"
          }
        ],
        "roles": [
          {
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
        ],
        "footer": "ManagerContent",
        "createdOn": null
      }
      const contentAction = contentActions.loadContentSuccess(contentDetails);
       const newStateValue = contentReducer(initialState, contentAction);
       expect(newStateValue).toEqual(contentDetails);
    });
  });
  describe('Remove content success scenario', () =>{
    it('it should remove the content details from store', () => {
      const contentDetails = {};
      const contentAction = contentActions.removeContentSuccess(contentDetails);
       const newStateValue = contentReducer(initialState, contentAction);
       expect(newStateValue).toEqual(contentDetails);
    });
  });  
});
