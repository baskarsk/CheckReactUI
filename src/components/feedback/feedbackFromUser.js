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

import Header from '../common/header';
import Footer from '../common/footer';
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


class FeedbackPresent extends React.Component {
	constructor(props,context) {
		super(props,context);
		this.cancelFeedback = this.cancelFeedback.bind(this);
		this.createFeedback = this.createFeedback.bind(this);
			
	}
	
	componentDidMount(){
		$(".ProgreeStep.HeadTxt").removeClass("active");
		$(".ProgreeStepFdk.HeadTxtFdk").addClass("active");
		
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
							<div>
								<h4 className="ProceesTopicTitle"/>
								<p style={{"margin-left": "8px","font-weight":"bold"}}>Feedback</p>
								<div className="RoleColumn">
								<div className="RoleInput">
								<select name="feedback" id="feedBackHead"> 
    										<option value="Poor">Poor</option>
    										<option value="Average">Average</option>
    										<option value="Very Good">Very Good</option>
    										<option value="Excellent">Excellent</option>
  								</select>
								</div>
								<p style={{"margin-top": "15px","font-weight":"bold"}}>Comments</p>
								</div>

								<div className="RoleInput">
									<textarea rows="10" cols="91" name="feedback"  id="feedBackText"  ></textarea>
									
								</div>
								<div className="FormBtnforFdbck">
									<button className="Save" onClick={this.createFeedback} >Save</button>
									<button className="Cancel" onClick={this.cancelFeedback}>Cancel</button>
								</div>
							</div>
						</div>
		);
	}
}
function mapStateToProps (state, ownProps) {
	return {
		loginDetails: state.login,
		userDetails: state.userInfo
  }
}
function mapDispatchToProps(dispatch) {
	return {
		actions:bindActionCreators(Object.assign({},feedbackActions,stageActions,currentStageActions,userActions),dispatch)
	}
}
FeedbackPresent.propTypes={ 
	
};
FeedbackPresent.contextTypes = {
	router: React.PropTypes.object.isRequired
};
export default connect(mapStateToProps,mapDispatchToProps)(FeedbackPresent);
