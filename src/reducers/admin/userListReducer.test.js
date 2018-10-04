import expect from 'expect';
import userListReducer from './userListReducer';
import * as userActions from '../../actions/admin/userAction';
import initialState from '../common/initialState';

describe('User List Reducer ', () => {
  describe('Get list of user  success scenario', () =>{
    it('it should get the user and store the values in store.', () => {
      const userList = [{"id":205,"password":"$2a$10$rYvuFJItY.RfqfNEsT7kHOgfsAmORtuDyqBx6yszwb.nUw5vOe7kq","emailId":"nithya.madhavan@cognizant.com ","userName":"nithya.madhavan@cognizant.com ","firstName":"Nithya","lastName":"M","language":null,"admin":true},{"id":217,"password":"$2a$10$nJeMHhKgXyAQuJzNv.rQOecNyh8BUD0sXnO8V1uOogs3nXp/4pmMi","emailId":"jesudoss.jayakumar@cognizant.com","userName":"jesudoss.jayakumar@cognizant.com","firstName":"Jesudoss","lastName":"Jayakumar","language":null,"admin":false},{"id":220,"password":"$2a$10$Zlcry53nJky5fJPWe5x0VeyV15CGLl9Cydg1Y6WTm18ZWUeHjlYba","emailId":"divya.n4@cognizant.com","userName":"divya.n4@cognizant.com","firstName":"Divya","lastName":"N","language":null,"admin":false},{"id":241,"password":"$2a$10$u.OM7YmUm8n7jqDFSCCh6uocekGWH9WPMGaSxKlRwWunEbpNT2x3m","emailId":"Sandhya@cognizant.com","userName":"Sandhya@cognizant.com","firstName":"Sandhya","lastName":"S","language":null,"admin":true},{"id":247,"password":"$2a$10$s62ppDwrxjrCv4.sXOeAl.eQTu67zqiQ89QNALmJVdQHPJmR78Hji","emailId":"selva.natarajan@cognizant.com","userName":"selva.natarajan@cognizant.com","firstName":"Selva","lastName":"N","language":null,"admin":false},{"id":250,"password":"$2a$10$aAsJ1pAsQKrYvO04caxSQeF6O4J5Uj7fTNNb2niYnVw3b8hr4yAn2","emailId":"Drishya.Pillai@cognizant.com","userName":"Drishya.Pillai@cognizant.com","firstName":"Drishya","lastName":"Pillai","language":null,"admin":false}]
      const userAction = userActions.loadUserSuccess(userList);
      const newStateValue = userListReducer(initialState, userAction);
      expect(newStateValue).toEqual(userList);
    });
  });  
});
