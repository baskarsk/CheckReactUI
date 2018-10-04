/**
 * This is the page which takes the feedback from the user.
 * @author : Divya
 * File Name : feedbackFromAllUsers.js
 * Path : src/components/feedback
 * Created Date : 16 Jan 2018
 */

import React from 'react';
import  PropTypes  from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import lodash from 'lodash';
import * as feedbackActions from '../../actions/feedback/feedbackActions';
import Header from '../common/header';
import Footer from '../common/footer';
import { log } from 'util';




class AllFeedbacksPresent extends React.Component {
	constructor(props,context) {
		super(props,context);
	/*	this.state = {
			feedbackObj : this.props.feedback
		}*/
			
	}

	componentDidMount(){
		  this.props.actions.GetAdminApprovedFeedback(this.props.accessToken).then(()=>{
			  console.log("this.props.Feedback",this.props.Feedback)
		  });
		  $(".ProgreeStepFdk.HeadTxtFdk").removeClass("active");
		  $(".ProgreeStep.HeadTxt").addClass("active");
		}

	
	render() {
		let feedbackList = this.props.Feedback;
		console.log("feedbackList",feedbackList)
		
		return (
			<div>
						<div className="Feedback">
							<div className="HeaderForFeedBackList">
								<p>User</p>
							</div>
							<div className="HeaderForFeedBackList">
					 			 <p style={{"margin-left": "-93px"}}>Feedback</p>
							</div>						
									{feedbackList.map((feedback) => {
										var cts = feedback[6],
										cdate = (new Date(cts)).toLocaleDateString();
										return (
											
											<div key={"description"+ feedback[0] } className="RowViewFdbk">
											<div className="ColumnViewFeedbackList1">
												<img src={require('../../images/userContact.png')} id= "userContactIcon" alt="UserContactIcon" />
												<p className = "FeedBackHighlightsName">{feedback[4]} {feedback[5]}</p>
												<div className = "ReviewCounts">
												<Link to={`/feedback/feedbacksOfAUser/${feedback[2]}`}><p><img style={{"margin-right":"5px"}}src={require('../../images/reviewIcon.png')} id= "reviewIcon" alt="ReviewIcon" />
												{feedback[7]} Reviews</p></Link>
												</div>
											</div>
											<div >
											    <p style = {{"float": "right","font-size":"11px"}}>Reviewed on :{cdate}</p>
												<p className = "FeedBackHighlights">{feedback[1]} </p>
												<p className = "FeedBacktextHighlights">{feedback[0]}</p>									
											</div >
										</div>
									)
								})
							}					
						</div>
					</div>
		);
		
	}
}
function mapStateToProps (state, ownProps) {
	return {
		Feedback: state.feedbackList,
		accessToken: state.login.accessToken
		
  }
}
function mapDispatchToProps(dispatch) {
	return {
		actions:bindActionCreators(Object.assign({},feedbackActions),dispatch)
	}
}
AllFeedbacksPresent.propTypes={ 
	
};
AllFeedbacksPresent.contextTypes = {
	router: React.PropTypes.object.isRequired
};
export default connect(mapStateToProps,mapDispatchToProps)(AllFeedbacksPresent);
