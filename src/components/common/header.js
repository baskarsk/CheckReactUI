/**
 * Header of the app.
 * @author : Bala
 * File Name : header.js
 *  * Path : src/components/common/
 * Created Date : 15th Nov 2017
 */

import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import lodash from 'lodash';

import config from '../../config';
import * as loginActions from '../../actions/login/loginActions';
import * as contentActions from '../../actions/content/contentActions';
import * as userActions from '../../actions/user/userActions';
import * as stageActions from '../../actions/stage/stageActions';
import * as currentStageActions from '../../actions/stage/currentStageActions';
import LoginPresent from '../login/loginPresent';

class Header extends React.Component{
	constructor(props, context){
		super(props, context);
		this.redirectPage = this.redirectPage.bind(this);
	}
	
	componentDidMount(){
		$('.MobileIcon').on('click', function(e){
			$('.MobileShow').toggle();
			e.stopPropagation();
		});
	
		let userLoginDetails = this.props.userDetails;
		if(Object.keys(userLoginDetails).length == 0){
			this.context.router.push("/");
		}
		$("html, body").animate({scrollTop:0}, 500, 'swing');
	}

	redirectPage(e){
		let userLoginDetails = this.props.userDetails;
		if(Object.keys(userLoginDetails).length != 0){
			let linkElement = e.target;
			let redirectLink =  $(linkElement).attr("data-link");

	
			if((redirectLink.indexOf("admin") != -1)||(redirectLink.indexOf("feedback") != -1)){
				this.context.router.push(redirectLink);
			} else{
				if(location.pathname != redirectLink){
					let that = this;
					let currentStage = (redirectLink).replace("/","").toUpperCase();
					this.props.actions.loadStages(userLoginDetails.userName,this.props.loginDetails.accessToken).then(() => {
						setTimeout(function(){
							let curentStageData = that.props.stageDetails[currentStage];
							that.props.actions.loadCurrentStages(curentStageData);
						},50)						
						setTimeout(function(){
							that.context.router.push(redirectLink);
							let subStageGroupBy =  that.props.currentStageDetails;
							let SubStageNames = Object.keys(subStageGroupBy);
							let currentContent = subStageGroupBy[SubStageNames[0]];
						
							let currentContentItem = lodash.orderBy(currentContent,["displayOrder"],["asc"]);	
							if(currentContentItem != undefined){
								that.props.actions.loadContent(currentContentItem[0]['id'],that.props.loginDetails.accessToken);
							} else{
								that.props.actions.removeContent(); 
							}
						},100);
					})													
				}
			}
		} else {
			if(! $('.LoginTxt').hasClass('Active')){
				$('.LoginTxt').trigger('click');
				$(".ErrorTxt").text("Please login to view content.");
			}
		}

	}
	
	render() {
		let userLoginDetails = this.props.userDetails;
		let displayUserName = Object.keys(userLoginDetails).length != 0 ? "block" : "none";
		let displayLogin = Object.keys(userLoginDetails).length != 0  ? "none" : "block";
		let menuDisplay = this.props.isMenuHidden;
		let menuStyle = {
			display: !this.props.isMenuHidden?'block':'none'
		};

		
		return (<div>
					<header> 	
						<div className="PotalInfo">
							<div className="container">
								<img src={require('../../images/logo.png')} alt ="BODHA" title="BODHA" />
								<LoginPresent />
							</div>
						</div>
						<nav>
							<div className="container">
								<div className="HomeLink">
									<Link to="/" title="Home"><img src={require('../../images/home.png')} alt="Home" /></Link>
								</div>
								<div className="menuLinks menuLinksMob" style={menuStyle}>
									<img src={require('../../images/Menu.png')} alt="" style={{"display":"none"}} className="MobileIcon" />
									<ul className="MobileShow">

										
										<li style={{"display" : userLoginDetails.admin ? "list-item" : "none"}} className={ (location.pathname).indexOf("admin") !=  -1 ?  "Menuli Active" : "Menuli"}><span className="aLink" data-link="/admin/role" onClick={this.redirectPage}>ADMIN</span></li>
										<li className={ location.pathname == "/discover" ?  "Menuli Active" : "Menuli"}><span className="aLink" data-link="/discover" onClick={this.redirectPage}>DISCOVER</span></li>
										<li className={ location.pathname == "/assimilate" ?  "Menuli Active" : "Menuli"}><span className="aLink" data-link="/assimilate" onClick={this.redirectPage}>ASSIMILATE</span></li>
										<li className={ location.pathname == "/learn" ?  "Menuli Active" : "Menuli"}><span className="aLink" data-link="/learn" onClick={this.redirectPage}>LEARN</span></li>
										<li style={{"display" : !(userLoginDetails.admin) ? "list-item" : "none"}} className={ (location.pathname).indexOf("feedback") !=  -1 ?  "Menuli Active" : "Menuli"}><span className="aLink" data-link="/feedback/feedbackFromUser" onClick={this.redirectPage}>FEEDBACK</span></li>
										


									</ul>
								</div>
							</div>
						</nav>
					</header>
				</div>
		);
	}
}


function mapStateToProps (state, ownProps) {
	return {
		loginDetails: state.login,
		userDetails: state.userInfo,
		contentDetails : state.content,
		stageDetails : state.stage,
		currentStageDetails : state.currentStage
  }
}
  
function mapDispatchToProps (dispatch) {
	return {
		  actions : bindActionCreators(Object.assign({},loginActions,contentActions,stageActions,currentStageActions,userActions),dispatch)
  };
}

Header.propTypes = {

};

Header.contextTypes = {
	router: React.PropTypes.object.isRequired
};

export default connect(mapStateToProps,mapDispatchToProps)(Header);
