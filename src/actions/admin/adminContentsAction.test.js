import expect from 'expect';
import * as adminContentsAction from './adminContentsAction';
import * as types from '../common/actionTypes';
import initialState from '../../reducers/common/initialState';

import thunk from 'redux-thunk';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';


describe('Admin content Action', () => {

  describe('load content Success action creator', () => {
    it('should load the list of available contents with details', () => {
      const availableContents = [
        {
          "id": 166,
          "name": "Devops content",
          "subStageName": "Cloud Learnings",
          "stageName": "ASSIMILATE"
        },
        {
          "id": 193,
          "name": "Environment Setup",
          "subStageName": "Cloud Learnings",
          "stageName": "ASSIMILATE"
        },
        {
          "id": 169,
          "name": "ManagerContent",
          "subStageName": "Cloudlift",
          "stageName": "LEARN"
        }
      ]
      
      const expectedAction = {
        type: types.LOAD_ADMIN_CONTENT_SUCCESS,
        contentList: availableContents  
      }; 

      const actutalAction = adminContentsAction.loadAdminContentsSuccess(availableContents);
      expect(actutalAction).toEqual(expectedAction);
      expect(actutalAction.type).toEqual(expectedAction.type);
      expect(actutalAction.contentList).toEqual(expectedAction.contentList);
    });
  });
	
  describe('Create new content action creator', () => {
    describe('create new content', () => {
      it('should create a content with provide information', () => {
        const contentInfo = {
          "name": "Devops content",
          "title": "Devops content",
          "header": "Devops content",
          "description": "Devops content",
          "subStage": {
            "id": 79,
            "name": "Cloud Learnings"
          },
          "documents": [
            {
              "type": "PDF",
              "url": "https://cognizantglobal.box.com/s/5m2ygz2fkigscvjomlcl1jxklf9rs8n9"
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
          "footer": "Devops content",
        }
    
        const expectedAction = {
          type: types.CREATE_ADMIN_CONTENT_SUCCESS,
          newContent: contentInfo  
        };

        const actutalAction = adminContentsAction.createAdminContentSuccess(contentInfo);
        expect(actutalAction).toEqual(expectedAction);
        expect(actutalAction.type).toEqual(expectedAction.type);
        expect(actutalAction.newContent).toEqual(expectedAction.newContent);
      });
    });
  });

  describe('Update content details action creator', () => {
    describe('Update existing content info', () => {
      it('should update the content information with provide information', () => {
        const contentInfo = {
          "id": 166,
          "name": "Devops content",
          "title": "Devops content",
          "header": "Devops content",
          "description": "Devops content",
          "subStage": {
            "id": 79,
            "name": "Cloud Learnings"
          },
          "documents": [
            {
              "id": 184,
              "type": "PDF",
              "url": "https://cognizantglobal.box.com/s/5m2ygz2fkigscvjomlcl1jxklf9rs8n9"
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
          "footer": "Devops content",
          "createdOn": null
        }

        const expectedAction = {
          type: types.UPDATE_ADMIN_CONTENT_SUCCESS,
          updatedContent: contentInfo  
        };

        const actutalAction = adminContentsAction.updateAdminContentSuccess(contentInfo);
        expect(actutalAction).toEqual(expectedAction);
        expect(actutalAction.type).toEqual(expectedAction.type);
        expect(actutalAction.updatedContent).toEqual(expectedAction.updatedContent);
      });
    });
  });

  describe('Delete content action creator', () => {
    describe('Delete content info', () => {
      it('should delete content information by content Id', () => {
              
        const expectedAction = {
          type: types.DELETE_ADMIN_CONTENT_SUCCESS,
          deletedContentId : 125
        };

        const actutalAction = adminContentsAction.deleteAdminContentSuccess(125);
        expect(actutalAction).toEqual(expectedAction);
        expect(actutalAction.type).toEqual(expectedAction.type);
        expect(actutalAction.deletedContentId).toEqual(expectedAction.deletedContentId);
      });
    });
  });

	const middleware = [thunk];
	const mockStore = configureMockStore(middleware);

	describe('load list of content success', () => {
    afterEach(() => {
      nock.cleanAll();
    });

    const availableContents = [
      {
        "id": 166,
        "name": "Devops content",
        "subStageName": "Cloud Learnings",
        "stageName": "ASSIMILATE"
      },
      {
        "id": 193,
        "name": "Environment Setup",
        "subStageName": "Cloud Learnings",
        "stageName": "ASSIMILATE"
      },
      {
        "id": 169,
        "name": "ManagerContent",
        "subStageName": "Cloudlift",
        "stageName": "LEARN"
      }
    ]
      
    it('should call the get all content api and update the store value ', (done) => {

      var expectedActions = {
        type: types.LOAD_ADMIN_CONTENT_SUCCESS, 
        contentList: availableContents
      };
      
      const store = mockStore(initialState, expectedActions);
      expectedActions = store.dispatch(expectedActions);
      const actualActions = adminContentsAction.loadAdminContentsSuccess(availableContents);
      expect(expectedActions).toEqual(actualActions);
      expect(expectedActions.type).toEqual(actualActions.type);
      expect(expectedActions.contentList).toEqual(actualActions.contentList);
      done();
    });
  });

  describe('Create new content action', () => {
    afterEach(() => {
      nock.cleanAll();
    });

    const contentInfo = {
      "name": "Devops content",
      "title": "Devops content",
      "header": "Devops content",
      "description": "Devops content",
      "subStage": {
        "id": 79,
        "name": "Cloud Learnings"
      },
      "documents": [
        {
          "type": "PDF",
          "url": "https://cognizantglobal.box.com/s/5m2ygz2fkigscvjomlcl1jxklf9rs8n9"
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
      "footer": "Devops content",
    }
    
    it('should call the create content api and update the store value ', (done) => {
      var expectedActions = {
        type: types.CREATE_ADMIN_CONTENT_SUCCESS, 
        newContent: contentInfo
      };
      
      const store = mockStore(initialState, expectedActions);
      expectedActions = store.dispatch(expectedActions);
      const actualActions = adminContentsAction.createAdminContentSuccess(contentInfo);
      expect(expectedActions).toEqual(actualActions);
      expect(expectedActions.type).toEqual(actualActions.type);
      expect(expectedActions.newContent).toEqual(actualActions.newContent);
      done();
    });
  });

  describe('Update content action', () => {
    afterEach(() => {
      nock.cleanAll();
    });

    const contentInfo = {
      "id": 125,
      "name": "Devops content",
      "title": "Devops content",
      "header": "Devops content",
      "description": "Devops content",
      "subStage": {
        "id": 79,
        "name": "Cloud Learnings"
      },
      "documents": [
        {
          "id":36,
          "type": "PDF",
          "url": "https://cognizantglobal.box.com/s/5m2ygz2fkigscvjomlcl1jxklf9rs8n9"
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
      "footer": "Devops content",
    }
    
    it('should call the updateContentByContentId api and update the store value ', (done) => {
      var expectedActions = {
        type: types.UPDATE_ADMIN_CONTENT_SUCCESS, 
        updatedContent: contentInfo
      };
      
      const store = mockStore(initialState, expectedActions);
      expectedActions = store.dispatch(expectedActions);
      const actualActions = adminContentsAction.updateAdminContentSuccess(contentInfo);
      expect(expectedActions).toEqual(actualActions);
      expect(expectedActions.type).toEqual(actualActions.type);
      expect(expectedActions.updatedContent).toEqual(actualActions.updatedContent);
      done();
    });
  });

  describe('Delete content action', () => {
    afterEach(() => {
      nock.cleanAll();
    });

    it('should call the deteleContentByContentId api and update the store value ', (done) => {
      var expectedActions = {
        type: types.DELETE_ADMIN_CONTENT_SUCCESS, 
        deletedContentId : 125
      };
      
      const store = mockStore(initialState, expectedActions);
      expectedActions = store.dispatch(expectedActions);
      const actualActions = adminContentsAction.deleteAdminContentSuccess(125);
      expect(expectedActions).toEqual(actualActions);
      expect(expectedActions.type).toEqual(actualActions.type);
      expect(expectedActions.deletedContentId).toEqual(actualActions.deletedContentId);
      done();
    });
  });
});