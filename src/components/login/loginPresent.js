/**
 * Login component of the app.
 * @author : Bala
 * File Name : loginPresent.js
 * path : src/components/common/
 * Created Date : 15th Nov 2017
 */

import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import config from '../../config';
import * as loginActions from '../../actions/login/loginActions';
import * as contentActions from '../../actions/content/contentActions';
import * as userActions from '../../actions/user/userActions';
import * as stageActions from '../../actions/stage/stageActions';
import * as currentStageActions from '../../actions/stage/currentStageActions';
let userInfo = {};

class LoginPresent extends React.Component{
	constructor(props, context){
		super(props, context);
		this.login =  this.login.bind(this);
		this.updatePassword =  this.updatePassword.bind(this);
		this.updateUserName =  this.updateUserName.bind(this);
		this.enableLoginBtn = this.enableLoginBtn.bind(this);
		this.validateEmail = this.validateEmail.bind(this);
		this.enterKeyValidate = this.enterKeyValidate.bind(this);
		this.logout = this.logout.bind(this)
		userInfo.userName = "";
		userInfo.password = "";
	}
	componentDidMount(){
		$(".ErrorTxt").text("");
		document.getElementById('loginBtn').setAttribute("disabled", true);
				  
		$(document).click(function(e) {
			if($(window).width() <= 768){
				if (!$(e.target).is('.MobileShow, .MobileShow *')) {
					$(".MobileShow").hide();
				}
			}
			if (!$(e.target).is('.LoginDetials, .LoginDetials *, .aLink, .DivLink, .DivLink *')) {
				$(".LoginDetials").hide();
				$('.LoginTxt').removeClass('Active');
				$(".ErrorTxt").text("");
			}
		});

		$('.LoginTxt').click(function(e){
			if($('.LoginDetials').is(":visible")){
				$(this).removeClass('Active');
				$('.LoginDetials').hide();
			} else {
				$(this).addClass('Active');
				$('.LoginDetials').show();
			}
			e.stopPropagation();
        });
    }

	login(){
		this.props.actions.loadLogin(userInfo.userName,userInfo.password).then( () => {
			this.props.actions.loadUserInfo(this,userInfo.userName,this.props.loginDetails.accessToken).then( ()=> {
				let userLoginDetails = this.props.userDetails;
				this.props.actions.loadStages(userLoginDetails.userName,this.props.loginDetails.accessToken);
			})			
		});
	}

	logout(){
		this.props.actions.removeContent();
		this.props.actions.removeStages();
		this.props.actions.removeCurrentStages();
		this.props.actions.loadLogout(this);
		this.props.actions.removeUserInfo();
	}

	updatePassword(e){
		this.enableLoginBtn();
		userInfo.password = e.target.value;
	}

	updateUserName(e){
		this.enableLoginBtn();
		userInfo.userName = e.target.value;
	}

	validateEmail(email) {
		var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email);
	}

	enableLoginBtn(){
		let userNameValue = document.getElementById('userName').value;
		let passwordValue = document.getElementById('password').value;
		if(this.validateEmail(userNameValue)   && passwordValue.length >= 6){
			document.getElementById('loginBtn').removeAttribute("disabled");
		} else{
			document.getElementById('loginBtn').setAttribute("disabled", true);
		}
	}

	enterKeyValidate(e){
		let userNameValue = document.getElementById('userName').value;
		let passwordValue = document.getElementById('password').value;
		if(e.keyCode == 13 && this.validateEmail(userNameValue)   && passwordValue.length >= 6){
			this.login();
		}
	}

	render() {
		let userLoginDetails = this.props.userDetails;
		let displayUserName = Object.keys(userLoginDetails).length != 0 ? "block" : "none";
        let displayLogin = Object.keys(userLoginDetails).length != 0  ? "none" : "block";
        
		return (
            <div className="loginWrapper">
                <div className="PortalLogin">
                    <div className="LogedUser" style={{"display":displayUserName}}>
                        <p><span className="VerticalAlign">Welcome {userLoginDetails.firstName}</span><span className="VerticalAlign Logout"><img src={require('../../images/logoutIcon.png')} alt="Logout" onClick={this.logout}/></span></p>
                    </div>
                    <div className="LoginTxt" style={{"display":displayLogin}}>
                        <p><span className="VerticalAlign LoginArrow">Login</span></p>
                    </div>
                    <div className="LoginDetials" style={{"display":"none"}}>
                        <span className="ErrorTxt">Please Enter the Username and Password</span>
                        <form>
                            <div className="FormRow">
                                <div className="label">
                                    <label>Username</label>
                                </div>
                                <div className="input">
                                    <input type="text" name="username" id="userName" onChange={this.updateUserName} placeholder="Email address" onKeyUp={this.enterKeyValidate} defaultValue={userInfo.userName}/>
                                </div>
                                <div className="label">
                                    <label>Password</label>
                                </div>
                                <div className="input MarZro">
                                    <input type="password" name="Password" id="password" onChange={this.updatePassword} onKeyUp={this.enterKeyValidate} defaultValue={userInfo.password}/>
                                </div>
                                {/*<div className="ForgotPass">
                                    <p>Forgot your password?</p>
                                </div>*/}
                                <div className="SubBtn">
                                    <input type="button" value="LOGIN" id="loginBtn"  onClick={this.login}/>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
		);
	}
}


function mapStateToProps (state, ownProps) {
	return {
        userDetails: state.userInfo,
        loginDetails: state.login
  }
}
  
function mapDispatchToProps (dispatch) {
	return {
		  actions : bindActionCreators(Object.assign({},loginActions,contentActions,stageActions,currentStageActions,userActions),dispatch)
  };
}

LoginPresent.propTypes = {

};

LoginPresent.contextTypes = {
	router: React.PropTypes.object.isRequired
};

export default connect(mapStateToProps,mapDispatchToProps)(LoginPresent);
