import * as sessionStorageDataActions from '../actions/common/sessionStorageDataActions';
export const loadState = ()=>{
	let sessionStorageObj=sessionStorageDataActions.getSessionData();
	try{
		const parsedState = sessionStorageObj.bodha;
		if(parsedState === null){
			return undefined;
		}
		return parsedState;
	}
	catch(err){
		return undefined;
	}
}

export const saveState = (state)=>{ 
	let sessionStorageObj=sessionStorageDataActions.getSessionData();
  try{
		sessionStorageObj.bodha = state;
		sessionStorageDataActions.setSessionData(sessionStorageObj)
  }
  catch(err){
  
  }
}
