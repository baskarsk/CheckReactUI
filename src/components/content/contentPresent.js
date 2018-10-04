/**
 * This is the content page for all the router of bodha onboarding application.
 * @author : Bala
 * File Name : contentPresent.js
 * Path : src/components/content
 * Created Date : 23th Nov 2017
 */

import React from 'react';
import  PropTypes  from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import lodash from 'lodash';

import Header from '../common/header';
import Footer from '../common/footer';
import * as contentActions from '../../actions/content/contentActions';
import * as userActions from '../../actions/user/userActions';
import * as stageActions from '../../actions/stage/stageActions';
import * as currentStageActions from '../../actions/stage/currentStageActions';
import * as contentsStatusActions from '../../actions/contentStatus/contentStatusActions';
import * as RoleAction from '../../actions/admin/roleAction';
let currentContentItem = { id: ""}

class ContentPresent extends React.Component {
	constructor(props,context) {
		super(props,context);
		this.renderSubStages = this.renderSubStages.bind(this);
		this.renderContentTitle = this.renderContentTitle.bind(this);
		this.updateContent = this.updateContent.bind(this);
		this.maintainEquHeight = this.maintainEquHeight.bind(this);
		this.renderCurrentContent = this.renderCurrentContent.bind(this);	
		this.checkContentStatus = this.checkContentStatus.bind(this);
		this.updateContentStatus = this.updateContentStatus.bind(this);	
		this.createContentStatus = this.createContentStatus.bind(this);
		this.getTitleStatus = this.getTitleStatus.bind(this);	
	}

	componentWillMount(){
		let userDetails = this.props.userDetails;
		let roleDetails= this.props.roleDetails; 


		let subStageGroupBy =  this.props.currentStageDetails;		
		let SubStageNames = Object.keys(subStageGroupBy);
		let currentContent = subStageGroupBy[SubStageNames[0]];
		let currentContentItem = lodash.orderBy(currentContent,["displayOrder"],["asc"]);	

		if(currentContentItem != undefined){	
				 
			this.props.actions.loadContent(currentContentItem[0].id,this.props.loginDetails.accessToken);
		} else{
				
			this.props.actions.removeContent(); 
		}
		if(userDetails.admin == false){
			this.props.actions.loadContentStatus(userDetails.id,this.props.loginDetails.accessToken).then(() => {
				this.createContentStatus(currentContent[0]);
			});
		}
	}
	
	maintainEquHeight(){
		let highestBox = 0;
		$('.EquHeight').css("min-height","");
		$('.EquHeight').each(function(){
			if($(this).height() > highestBox) {
				  highestBox = $(this).outerHeight(); 
			}
		});
		$('.EquHeight').css("min-height",highestBox+"px");
	}
	
	componentDidMount() {
        $(document).click(function(e) {
			if($(window).width() <= 768){
				if (!$(e.target).is('.MobileShow, .MobileShow *')) {
					$(".MobileShow").hide();
				}
			}
		});

		this.maintainEquHeight();
		let that = this;
		$(window).bind("resize",function() {
			that.maintainEquHeight();
        });
		$(".ProgressTrack ").find(".active").removeClass("active");
		$("#contentTitle_"+currentContentItem.id).addClass("active");
    }
	
	componentDidUpdate(){
		currentContentItem = this.props.contentDetails;
		$(".ProgressTrack ").find(".active").removeClass("active");
		$("#contentTitle_"+currentContentItem.id).addClass("active");
		this.maintainEquHeight();
	}
    
    componentWillReceiveProps(){
       this.maintainEquHeight();
	}
	
	checkContentStatus(currentContent){
		let currentContentStatus = lodash.filter(this.props.contentStatusDetails,(contentStatus) => {
			return contentStatus.content_id == currentContent.id;
		})
		return currentContentStatus;
	}


	updateContentStatus(ContentStatusObj){
		let updatedStatusVal = ContentStatusObj;
		if(updatedStatusVal.status == "COMPLETED"){
			return;
		} else{
			updatedStatusVal.status = "COMPLETED"
		}
		this.props.actions.updateContentStatus(updatedStatusVal,this.props.loginDetails.accessToken).then(() => {
			this.props.actions.loadContentStatus(this.props.userDetails.id,this.props.loginDetails.accessToken);
		});
	}

	createContentStatus(currentContentVal){
		let currentContentStatus = this.checkContentStatus(currentContentVal)
		if(this.props.userDetails.admin == false && currentContentStatus.length == 0){
			let currentContentStatusVal = {
				"user" : {
					"id" : this.props.userDetails.id
				},
				"content" : {
					"id" : currentContentVal.id
				},
				"status" : "INPROGRESS"
			}
			this.props.actions.createContentStatus(currentContentStatusVal,this.props.loginDetails.accessToken).then(() => {
				this.props.actions.loadContentStatus(this.props.userDetails.id,this.props.loginDetails.accessToken);
			});
		}
	}

	updateContent(currentContentVal, event){		
		$(".ProgressTrack ").find(".active").removeClass("active");
		let contentStatus = this.getTitleStatus(currentContentVal);
		event.currentTarget.setAttribute('class', contentStatus+' active')
		this.props.actions.loadContent(currentContentVal['id'],this.props.loginDetails.accessToken).then(() => {
			this.createContentStatus(currentContentVal)
		});
		currentContentItem = currentContentVal;
	}

	getTitleStatus(contentItem){
		let currentContentStatus = this.checkContentStatus(contentItem)
		if(this.props.userDetails.admin == false && currentContentStatus.length != 0){
			return currentContentStatus[0]["status"] == "COMPLETED" ? "ProgreeStep Completed" : "ProgreeStep"
		} else{
			return "ProgreeStep";
		}
	}

	renderContentTitle(contents){
		let contentItems = lodash.orderBy(contents,["displayOrder"],["asc"]);		
		let contentElement = contentItems.map(contentItem => (
			<div  key={"contentTitle_"+contentItem.id} id={"contentTitle_"+contentItem.id} className={this.getTitleStatus(contentItem)} onClick={this.updateContent.bind(this,contentItem)}>
				<p className="ProgressState">
					<span className="Pointer VerticalAlign"><img className="EditIcon" src={require('../../images/edit.png')} alt="" /></span><span className="VerticalAlign ProgressTxt">{contentItem.name}</span>
				</p>
			</div>
		))
		return contentElement;
		
    }
    
	renderSubStages(){
        let subStageInfo = this.props.currentStageDetails
        let subStageKeys = Object.keys(subStageInfo)
				let subStages = [];
				if(subStageKeys.length == 0){
					subStages.push(<div key={"subStage_empty"}>
						<div className="ProgreeStep HeadTxt">
							<p>No content available</p>
						</div>
					</div>)
				}else{
					subStages = subStageKeys.map((subStageItemKey) => (
						<div key={"subStage_"+subStageItemKey}>
							<div className="ProgreeStep HeadTxt">
								<p>{subStageItemKey}</p>
							</div>
							{
								this.renderContentTitle(subStageInfo[subStageItemKey])
							}
						</div>
					));
				}
		return subStages;
	}
	loadDocuments(documentObj){
		let documentsData = documentObj;
		let documentElements = documentsData.map(currentDoc => {
			let documentClass = currentDoc.type == "VIDEO" ? "VideoSection" : (currentDoc.type == "PDF" ? "pdfViewer" : (currentDoc.type == "PPT" ? "pptViewer" : "" ));
			if(documentClass != ""){
				return (<div key={currentDoc.id} className={documentClass}>
							<iframe width="654" height="428" src={currentDoc.url} frameborder="0" allowFullScreen webkitAllowFullscreen></iframe>	
						</div>)
			} else {
				return "";
			}		
		})
		return documentElements;
	}
	renderCurrentContent(){

	

		let currentContent = this.props.contentDetails;
		let userDetails = this.props.userDetails;

		let buttonClassVal = "MarkBtn";		
		let contentDescription = <span  dangerouslySetInnerHTML={ {__html: currentContent.description} }></span>;
		if(Object.keys(currentContent).length > 0){
			let currentContentStatusExisit = this.checkContentStatus(currentContent);
			if(currentContentStatusExisit.length > 0 && currentContentStatusExisit[0]["status"] == "COMPLETED"){
				buttonClassVal = "MarkBtnDisabled"
			} else if(currentContentStatusExisit.length > 0 && currentContentStatusExisit[0]["status"] == "INPROGRESS"){
				buttonClassVal = "MarkBtn"
			}
			return (
				<div>
					<h4 className="ProceesTopicTitle">{currentContent.header}</h4>
					<p>{contentDescription}</p>
					{
						this.loadDocuments(currentContent.documents)
					}
					<p>{currentContent.footer}</p>
					<p className={buttonClassVal} style={{"display" : userDetails.admin ? "none" : "inline-block"}}><button type="button" onClick={this.updateContentStatus.bind(this,currentContentStatusExisit[0])}>Mark as Completed</button></p>
				</div>
			)
		} else {
			return (<span>No content available</span>);
		}
	}

	render() {
        let footerLink = (location.pathname == "/discover") ? "Assimilate" : (location.pathname == "/assimilate") ? "Learn" : "";
		
		return (
			<div>
			<Header />
			<div className="MainContent">
				<section>
					<div className="container Progress">
						<div className="ProgressTrack EquHeight">
                            {
								this.renderSubStages()
							}
						</div>
						<div className="ProgressContent EquHeight">
                            {
								this.renderCurrentContent()
							}
						</div>
					</div>
				</section>
			</div>
			<Footer footerLink={footerLink} />
		</div>
		);
	}
}

function mapStateToProps(state,ownProps) {
	return {
		loginDetails: state.login,
		userDetails: state.userInfo,
		contentDetails : state.content,
        stageDetails : state.stage,
		currentStageDetails : state.currentStage,
		contentStatusDetails : state.contentStatus,
		roles: state.roleList,
		role: state.role
	}
}

function mapDispatchToProps(dispatch) {
	return {
		actions:bindActionCreators(Object.assign({},contentActions,stageActions,currentStageActions,userActions,contentsStatusActions, RoleAction),dispatch)
	}
}

ContentPresent.propTypes={ 
	
};

export default connect(mapStateToProps,mapDispatchToProps)(ContentPresent);
