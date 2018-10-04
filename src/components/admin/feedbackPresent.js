/**
 * This is the page which allows the admin to view the consolidated user feedback.
 * @author : Drishya
 * File Name : feedbackPresent.js
 * Path : src/components/admin
 * Created Date : 28 Nov 2017
 */


import React from 'react';
import PropTypes from 'prop-types';
import {Link, IndexLink} from 'react-router';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as GetFeedback from '../../actions/feedback/feedbackActions';



class Feedback extends React.Component{
	constructor(props, context){
		super(props, context);	 
		this.approveFeedback = this.approveFeedback.bind(this);
		this.cancelFeedback= this.cancelFeedback.bind(this);
    }
    
    componentDidMount(){
		let accessToken = this.props.loginDetails.accessToken;
        this.props.actions.GetFeedback(accessToken).then(()=>{
           
        })
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
	approveFeedback(feedback){
		let feedBackObj = {};
 		let accessToken = this.props.loginDetails.accessToken;
		feedBackObj["id"]=feedback[0];
        feedBackObj["feedback"]= feedback[1];
		feedBackObj["created_date"]= feedback[7];
		feedBackObj["feedback_head"]=feedback[2];
		feedBackObj["isFeedback"]= true;
		feedBackObj["user"]= {
				'id' : feedback[3]
			};
		let elementId=feedback[0];
			   document.getElementById(elementId).value = "Approved";
			   document.getElementById(elementId).style.backgroundColor="gray";
			   console.log("Value of FeedbackObj",feedBackObj)
			   this.props.actions.ApproveFeedback(feedBackObj,accessToken);
	}
   cancelFeedback(feedback){
		let feedBackObj = {};
 		let accessToken = this.props.loginDetails.accessToken;
		feedBackObj["id"]=feedback[0];
        feedBackObj["feedback"]= feedback[1];
		feedBackObj["created_date"]= feedback[4];
		feedBackObj["feedback_head"]=feedback[2];
		feedBackObj["isFeedback"]= feedback[5];
		feedBackObj["user"]= {
				'id' : feedback[3]
			};
			  
			   this.props.actions.DeleteFeedback(feedBackObj,accessToken);
	}
	render() {
		
		let listOfFeedbacks = this.props.feedbackList;	
		return (
			<div id="Tab6" className="TabCon TabConFnc">
			<div className="Feedback">
				<div className="TableViewforFeedback">
					<div className="HeadViewForFeedback">
						<p>UserID</p>
					</div>
					<div className="HeadViewForFeedback" > 
					  <p>Feedback</p>
					</div>
					<div className="HeadViewForFeedback" style={{"width": "26%"}}>
					  <p style={{"margin-left": "-25px"}}>Status</p>
					</div>
					
					{listOfFeedbacks.map((feedback) => {
							return (
								<div key={"description"+ feedback[0] } className="RowView">
									<div className="ColumnViewforFeedback1">
										<p>{feedback[4]}</p>									
									</div>
									<div className="ColumnViewforFeedback2">
										<p className = "FeedBackHighlights">{feedback[2]}</p>&nbsp;
										<p className = "FeedBacktextHighlights">{feedback[1]}</p>									
									</div >
									<div >
                                    <input type="button" id={feedback[0]} ref="approveBtn" value={feedback[8]?"Approved":"Approve"} className={feedback[8]?"approvedBtn":"approveBtn"}  onClick={this.approveFeedback.bind(this,feedback)} />
									<input type="button" value="Reject" className={feedback[8]?"cancelFeedbackBtnNew":"cancelFeedbackBtn"}  onClick={this.cancelFeedback.bind(this,feedback)} />
                                  	</div>
									  
								</div>
							)
						})
					}					
				</div>
			</div>
		</div>
		);
	}
}

function mapStateToProps (state, ownProps){
	console.log("state value", state.feedbackList)
	return {
		feedbackList:state.feedbackList,
		loginDetails: state.login
  }
}

function mapDispatchToProps (dispatch) {
	return {
		  actions : bindActionCreators(Object.assign({},GetFeedback),dispatch)
 	};
}

Feedback.propTypes = {

};

Feedback.contextTypes = {
	
};

export default connect(mapStateToProps,mapDispatchToProps)(Feedback);
