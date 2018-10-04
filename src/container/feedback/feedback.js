/**
 * This is the page which takes the feedback from the user.
 * @author : Drishya
 * File Name : feedbackFromUser.js
 * Path : src/components/feedback
 * Created Date : 28 Nov 2017
 */

import React from 'react';
import  PropTypes  from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import lodash from 'lodash';
import Header from '../../components/common/header';
import Footer from '../../components/common/footer';
import * as stageActions from '../../actions/stage/stageActions';
import * as userActions from '../../actions/user/userActions';
import * as currentStageActions from '../../actions/stage/currentStageActions';
import { createAdminContent } from '../../actions/admin/adminContentsAction';
import * as feedbackActions from '../../actions/feedback/feedbackActions';

import { log } from 'util';


let defaultFeedback = {
	id : "",
	description: ""
}


class Feedback extends React.Component {
	constructor(props,context) {
		super(props,context);
		this.cancelFeedback = this.cancelFeedback.bind(this);
		this.createFeedback = this.createFeedback.bind(this);
			
	}
	
	
	createFeedback(){
		
		let feedBackObj = {};
		let feedBackVal = $("#feedBackText").val();
		let accessToken = this.props.loginDetails.accessToken;
		let userId= this.props.userDetails.id;
		feedBackObj["feedback"]= feedBackVal;
		feedBackObj["created_date"]= new Date();
		feedBackObj["isFeedback"]= null;
		feedBackObj["feedback_head"]= $("#feedBackHead").val();
		feedBackObj["user"]= {
				'id' : userId
			};
		
		
			   this.props.actions.AddFeedback(feedBackObj,accessToken);
		
			   console.log("Value of current feedback is", feedBackObj)

		       this.context.router.push("/");            
	}

	cancelFeedback(){
		this.context.router.push("/");
	}
	

	render() {
		let userDetails =  this.props.userDetails;
		
		return (
			<div>
				<Header />
				<div className="MainContentFeedback">
				<section>
					<div className="FeedbackContainer container">
						<div className="ProgressTrackFdk">
							<div className="ProgreeStepFdk HeadTxtFdk">
								<p className="ProgressState">
									<Link to="/feedback/feedbackFromUser">
					            	<span className="ProgreesStepImage HeadTxt"><img className="EditIcon" src={require('../../images/feedback1.png')} alt="" /></span><span className="VerticalAlign ProgressTxt">Enter Your Feedback</span>
									</Link>
								</p>
							</div>
							<div className="ProgreeStep HeadTxt">
								<p className="ProgressState">
									<Link to="/feedback/approvedfeedbacks">
					            	<span className="ProgreesStepImage HeadTxtFdk"><img className="EditIcon" src={require('../../images/feedback1.png')} alt="" /></span><span className="VerticalAlign ProgressTxt">Most recent Feedbacks</span>
									</Link>
								</p>
							</div>
							
						</div>
						
						<div className="ProgressContentFdk EquHeight">
                             {
								this.props.children
							 }
						</div>
					</div>	
				</section>
			</div>
					
				<Footer footerLink="Discover"/>
			</div>
		);
	}
}
function mapStateToProps (state, ownProps) {
	return {
		loginDetails: state.login,
		userDetails: state.userInfo,
		contentDetails : state.content,
		feedbackDetails: state.feedback,
		stageDetails : state.stage,
		currentStageDetails : state.currentStage
  }
}
function mapDispatchToProps(dispatch) {
	return {
		actions:bindActionCreators(Object.assign({},feedbackActions,stageActions,currentStageActions,userActions),dispatch)
	}
}
Feedback.propTypes={ 
	
};
Feedback.contextTypes = {
	router: React.PropTypes.object.isRequired
};
export default connect(mapStateToProps,mapDispatchToProps)(Feedback);
