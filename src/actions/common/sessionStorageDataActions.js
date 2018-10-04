
/**
 * This has all the actions to get and set sessionStorage content for Bodha application
 * @author :
 * File Name : sessionStorageDataActions.js
 * Path : src/actions/
 * Created Date :November 2016
 */

export  function setSessionData(sessionStorageObj) {
  window.sessionStorage.setItem("Bodha",JSON.stringify(sessionStorageObj));
}
export  function getSessionData() {
  let  sessionStorageObj=window.sessionStorage.getItem("Bodha");
  if(sessionStorageObj == undefined){
    sessionStorageObj={"locale":"en"};
  }else{
    sessionStorageObj=JSON.parse(sessionStorageObj)
  }
  return sessionStorageObj;
}
