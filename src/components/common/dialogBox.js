/**
 * This has all the markups of the dialog box  used in the app.
 * @author :Shruthi S Bhatt
 * File Name : dialodBox.js
 * Path : src/components/
 * Created Date : 25th June 2016
 */
import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import * as sessionStorageDataActions from '../../actions/common/sessionStorageDataActions';
let sessionStorageObj;

const DialogBox = ({content,liID,alert,onSave,name,content2,errType,loader,longError}) => {
	sessionStorageObj = sessionStorageDataActions.getSessionData();
  function closeDialog(){
	  $(".bg_div").css('display','none');
	 	ReactDOM.unmountComponentAtNode(document.getElementById('divForDialog'));
    if(loader){
        $('.innerLoader').css('display','block');
      }
	 }
  return (
    <div className="clearfix dialog_Div HeaderItemloadAnim hideDialogBox AlertDiv">
      <div className="Alertleft fleft">
             <img src={require("../../images/alert.png")}/>
      </div>
      <div className="AlertRight fleft">
					{longError && <p className="longErrMsg">{longError}</p>}
          {content2 && <p className="apiErr">{content2}</p>}
          {errType && <p className="apiErr"> {errType} </p>}
          <h5>{content}</h5>
          { alert &&   <div className="AlertBtnDiv"><button onClick={closeDialog} id="ok_btn" className="waves-effect waves-light fright Btncls Button">OK</button></div>}
          { !alert && <div className="AlertBtnDiv"><button className="waves-effect waves-light btn Button" onClick={onSave} id="save_btn" data-id={liID} data-name={name} className="waves-effect waves-light fright Btncls Button">Save</button><button onClick={closeDialog} id="cancel_btn" className="waves-effect waves-light btn Button">Cancel</button></div> }
      </div>
  </div>
  );
};

DialogBox.propTypes = {

};

export default DialogBox;
