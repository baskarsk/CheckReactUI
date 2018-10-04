/**
 * This is the page which takes the feedback from the user.
 * @author : Divya
 * File Name : feedbackFromAllUsers.js
 * Path : src/components/feedback
 * Created Date : 22 Jan 2018
 */

import React from 'react';
import  PropTypes  from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import lodash from 'lodash';
import * as FeedbackActions from '../../actions/feedback/feedbackActions';
import * as UserAction from '../../actions/user/userActions';
import Header from '../common/header';
import Footer from '../common/footer';
import { log } from 'util';




class AllFeedbacksOfAUserPresent extends React.Component {
	constructor(props,context) {
		super(props,context);
		this.renderFeedbackList = this.renderFeedbackList.bind(this);
		this.backToList = this.backToList.bind(this);
	/*	this.state = {
			feedbackObj : this.props.feedback
		}*/
			
	}

	componentDidMount(){
			this.props.actions.GetAdminApprovedFeedbackOfAUser(this.props.userId,this.props.accessToken).then(()=>{
				console.log("this.props.Feedback",this.props.Feedback)
				});

				
		}

		backToList(){
			this.context.router.push("/feedback/approvedfeedbacks");
		}

		renderFeedbackList(){
			let feedbackList = this.props.Feedback;
			let feedBackTags = [];
			feedbackList.map((feedback) => {
				let cts = feedback[7],
				cdate = (new Date(cts)).toLocaleDateString();
				feedBackTags.push(											
					<div key={"description"+ feedback[0] } className="RowView">
					
					<div >
						<p style = {{"float": "right","font-size":"11px"}}>Reviewed on :{cdate}</p>
						<p className = "FeedBackHighlights">{feedback[2]} </p>
						<p className = "FeedBacktextHighlights" >{feedback[1]}</p>									
					</div >
				</div>
			)
		})
		
		return feedBackTags;
		}
	
	render() {
		let feedbackList = this.props.Feedback;
		console.log("feedbackList",feedbackList)
		console.log("Value of path param"+this.props.userName);
		let userName = feedbackList[0][5]+" "+feedbackList[0][6];
		return (
			<div>
						<div className="Feedback">
							<div className="TableViewforFeedback">
							<div className = "FeedbackPerUser">
									<div  className="FeedbackIconPerUser" >
							        	<img src={require('../../images/userContact.png')} id= "userContactIcon" alt="UserContactIcon"/>
									</div>
									<div className="HeaderForFeedBackListPerUser">
										<p>Recent reviews of {userName} </p>
									</div>
							</div>								
									{this.renderFeedbackList()}	
													
						</div>
						<button className="Back" onClick={this.backToList} >Back</button>
					</div>
				</div>
                
		);
		
	}
}
function mapStateToProps (state, ownProps) {
	console.log("Value of ownprops",ownProps.params.userId)
	return {
		Feedback: state.feedbackList,
		accessToken: state.login.accessToken,
		userInfo :state.userInfo,
		userId: ownProps.params.userId
		
  }
}
function mapDispatchToProps(dispatch) {
	return {
		actions:bindActionCreators(Object.assign({},FeedbackActions,UserAction),dispatch)
	}
}
AllFeedbacksOfAUserPresent.propTypes={ 
	
};
AllFeedbacksOfAUserPresent.contextTypes = {
	router: React.PropTypes.object.isRequired
};
export default connect(mapStateToProps,mapDispatchToProps)(AllFeedbacksOfAUserPresent);