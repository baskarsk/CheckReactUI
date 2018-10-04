/**
 * Footer of the app.
 * @author : Bala
 * File Name : footer.js
 * Created Date : 15th Nov 2017
 */

import React, {PropTypes} from 'react';
import {Link, IndexLink} from 'react-router';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import config from '../../config';


import * as contentActions from '../../actions/content/contentActions';
import * as stageActions from '../../actions/stage/stageActions';
import * as currentStageActions from '../../actions/stage/currentStageActions';

class Footer extends React.Component{
	constructor(props, context){
		super(props, context);
		this.renderFooterNav = this.renderFooterNav.bind(this);
		this.redirectPage = this.redirectPage.bind(this);
	}

	redirectPage(e){
		let linkElement = e.currentTarget;
		let redirectLink =  $(linkElement).attr("data-link");
		if(location.pathname != redirectLink){
			let that = this;
			let currentStage = (redirectLink).replace("/","").toUpperCase();
			this.props.actions.loadStages(userLoginDetails.userName,this.props.loginDetails.accessToken).then(() => {
				setTimeout(function(){
					let curentStageData = that.props.stageDetails[currentStage];
					that.props.actions.loadCurrentStages(curentStageData);
				},50);
				setTimeout(function(){
					that.context.router.push(redirectLink);
					$("html, body").animate({scrollTop:0}, 500, 'swing');
					let subStageGroupBy =  that.props.currentStageDetails;
					let SubStageNames = Object.keys(subStageGroupBy);
					let currentContent = subStageGroupBy[SubStageNames[0]];
					if(currentContent != undefined){
						
						that.props.actions.loadContent(currentContent[0]['id'],that.props.loginDetails.accessToken);
					}
					$("html, body").animate({scrollTop:0}, 500, 'swing');
				},100);
			})
		}
	}

	renderFooterNav(){
		let nextSection = this.props.footerLink;
		let userDetails = this.props.userDetails;
		if(nextSection != "" && Object.keys(userDetails).length > 0 ){
			return (
				<div className="NextSection">
					<span className="fLink" data-link={"/"+nextSection.toLowerCase()} onClick={this.redirectPage}><span className="VerticalAlign">Take me to {nextSection}</span><span className="VerticalAlign"><img src={require('../../images/left_arrow_large.png')} alt="" /></span></span>
				</div>
			)
		} else {
			return "";
		}
	}

	
	render() {
		
		return (<div>
					<footer>
						<div className="container">
							<ul >
								{/*<li><img src={require('../../images/yammer.png')} alt="Yammer" /></li>
								<li><img src={require('../../images/icon.png')} alt="Icon" /></li>
								<li><img src={require('../../images/map.png')} alt="Map" /></li>
								<li><img src={require('../../images/support.png')} alt="Support" /></li>
								<li><Link to={"/approvedfeedbacks"}><img src={require('../../images/feedBack.png')} id= "feedbackIcon" alt="Feedback" /></Link></li>*/}
								<li><img src={require('../../images/Outlook.png')} id= "outlookIcon" alt="Outlook" /></li>								
								<li><a href={"mailto:"+config.emailId} id= "emailId" >{config.emailId} </a></li>
								
								
								
							</ul>
							{
								this.props.footerLink ? this.renderFooterNav() : ""
							}
						</div>
					</footer>
				</div>
		);
	}
}
function mapStateToProps (state, ownProps) {
	return {
		loginDetails : state.login,
		userDetails: state.user,
		contentDetails : state.content,
		stageDetails : state.stage,
		currentStageDetails : state.currentStage
  }
}

function mapDispatchToProps (dispatch) {
	return {
		  actions : bindActionCreators(Object.assign({},contentActions,stageActions,currentStageActions),dispatch)
  };
}

Footer.propTypes = {
	footerLink : PropTypes.string
};

Footer.contextTypes = {
	router: React.PropTypes.object.isRequired
};

export default connect(mapStateToProps,mapDispatchToProps)(Footer);
