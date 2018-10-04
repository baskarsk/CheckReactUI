/**
 * This file loads the 'Content' tab of Admin section.
 * File Name : contentPresent.js
 * Path : src/components/admin
 * Created Date : 28th Nov 2017
 */

import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import lodash from 'lodash';
import ReactSortable  from 'react-sortablejs';

import * as subStagesActions from '../../actions/admin/adminSubStagesAction';
import * as adminContentsActions from '../../actions/admin/adminContentsAction';
import * as ContentsActions from '../../actions/content/contentActions';
import * as rolesActions from '../../actions/admin/roleAction';
import * as stageActions from '../../actions/stage/stageActions';
import config from '../../config';


	
let defaultContent = { 
	id : "",
	name: "",	
	title: "",
	header: "",
	footer: "",
	description: "",
	displayOrder:"",
	subStage: { "id": ""},
	roles: [{
		"id" : ""
	}],
	documents: []
}
let defaultRoles = {
	selectedRoles:[],
	availableRoles:[]
}



class ContentPresent extends React.Component{
	constructor(props, context){
		super(props, context);
		this.editContent = this.editContent.bind(this);
		this.deleteContent = this.deleteContent.bind(this);
		this.updateStateValue = this.updateStateValue.bind(this);
		this.cancelEdit = this.cancelEdit.bind(this);	
		this.updateContent = this.updateContent.bind(this);
		this.updateOrderedContent= this.updateOrderedContent.bind(this);
		this.addDocument = this.addDocument.bind(this);	
		this.removeDocument = this.removeDocument.bind(this);
		this.addRoles = this.addRoles.bind(this);
		this.removeRoles = this.removeRoles.bind(this);		
		this.sortableList = this.sortableList.bind(this);
		this.countContent= this.countContent.bind(this);
	    this.state = { showEdit : false, currentContent :  defaultContent, roles: defaultRoles, contentList: {}}	
	}


	componentWillMount(){
		let subStages = this.props.subStages;
		let contents = this.props.contents;
		let roles = this.props.roles;
		let userDetails = this.props.userDetails;
		let that = this;
		this.props.actions.loadAdminSubStages(this.props.loginDetails.accessToken);
		this.props.actions.loadAdminContents(userDetails.userName,this.props.loginDetails.accessToken);
		this.props.actions.loadRoles(this.props.loginDetails.accessToken).then(() => {
			defaultRoles.availableRoles = roles;
			let contentList= that.props.contents;
			let groupedContent= lodash.groupBy(contentList,"subStageName");
			this.setState({ 
				roles : defaultRoles,
				contentList : groupedContent
			});
		});
	}

	editContent(currentContentObj){
		if(currentContentObj.id == ""){
			defaultContent = {
				id : "",
				name: "",	
				title: "",
				header: "",
				footer: "",
				description: "",
				displayOrder:"",
				subStage: { "id": ""},
				roles: [{
					"id" : ""
				}],
				documents: []
			}
			defaultRoles = {
				selectedRoles:[],
				availableRoles: this.props.roles
			}
			this.setState({ showEdit : !this.state.showEdit, currentContent : defaultContent, roles : defaultRoles});
		} else{
			this.props.actions.loadContent(currentContentObj.id,this.props.loginDetails.accessToken).then(() => {
				let contentObj = this.props.contentDetails;
				let updatedContent = {
					id : contentObj.id,
					name : contentObj.name,
					title: contentObj.title,
					header: contentObj.header,
					footer: contentObj.footer,
					description: contentObj.description,
					displayOrder: contentObj.displayOrder,
					subStage: contentObj.subStage,					
					roles: contentObj.roles,
					documents: contentObj.documents
				}

				let roles = this.props.roles;
				let existingRoles = [];
				let availableRoles = [];
				if(contentObj.roles.length == roles.length){
					let currentRole = {"id" : "All", "name" : "All"}
					existingRoles.push(currentRole);
					availableRoles = roles;
				} else{
					existingRoles = lodash.intersectionBy(contentObj.roles,roles,"id");
					availableRoles = lodash.differenceBy(roles,contentObj.roles,"id");
				}
				let updatedRoles = {
					currentRole: "",
					selectedRoles: existingRoles,
					availableRoles: availableRoles
				}
				this.setState({ showEdit : !this.state.showEdit, currentContent : updatedContent,roles: updatedRoles});
			})
			
		}
	}

	deleteContent(currentContentId){
		let accessToken = this.props.loginDetails.accessToken;
		let userName = this.props.userDetails.userName;
		this.props.actions.deleteAdminContent(currentContentId,accessToken).then(() => {
			this.props.actions.loadStages(userName,accessToken);
		})
	}

	countContent(){

		console.log("********Came here 	")
		let accessToken = this.props.loginDetails.accessToken;
		let currentContentVal = this.state.currentContent;
		this.setState({ currentContent : currentContentVal});
		let currentContent = currentContentVal;
		let substageId= currentContent.subStage["id"] ;

		 let countObject=this.props.actions.countAdminContent(substageId, accessToken );
		 console.log("*************countObject", countObject)
		
         return count;        

	}

	cancelEdit(){
		this.setState({ showEdit : !this.state.showEdit, currentContent : defaultContent});
	}

	updateStateValue(e){
		let elementVal = e.target.value;
		let elementName = e.target.name
		let updatedContent = this.state.currentContent 

		if(elementName == "subStage"){
			updatedContent[elementName] = {"id": elementVal};
		} else{
			updatedContent[elementName] = elementVal;
		}
		this.setState({ currentContent : updatedContent});
	}

	updateContent(){
		let accessToken = this.props.loginDetails.accessToken;
		let userName = this.props.userDetails.userName;
		let currentContentVal = this.state.currentContent;
		let rolesVal = this.state.roles;
		let selectedRoles = rolesVal.selectedRoles;
		if(selectedRoles.length == 1 && selectedRoles[0]["id"] == "All"){
			currentContentVal.roles = this.props.roles;
		} else{
			currentContentVal.roles = selectedRoles;
		}
		this.setState({ currentContent : currentContentVal});
		let currentContent = currentContentVal;
		if(currentContent.name == "" || currentContent.name == undefined || currentContent.subStage["id"] == "" ||currentContent.subStage["id"] == undefined || currentContent.roles.length == 0 || currentContent.footer == "" ||currentContent.footer == undefined || currentContent.header == "" ||currentContent.header == undefined || currentContent.title == "" ||currentContent.title == undefined || currentContent.description == "" ||currentContent.description == undefined){
			if(currentContent.name == ""|| currentContent.name == undefined){
				alert("Please provide the valid details, Content Name Should not be empty!");
			}else if(currentContent.subStage["id"] == "" ||currentContent.subStage["id"] == undefined){
				alert("Please provide the valid details, Sub Stage Should not be empty!");
			}else if(currentContent.roles.length == 0){
				alert("Please provide the valid details, Roles Should not be empty!");
			}else if(currentContent.footer == "" ||currentContent.footer == undefined){
				alert("Please provide the valid details, Footer Should not be empty!");
			}else if(currentContent.header == "" ||currentContent.header == undefined){
				alert("Please provide the valid details, Header Should not be empty!");
			}else if(currentContent.title == "" ||currentContent.title == undefined){
				alert("Please provide the valid details, Title Should not be empty!");
			}else if(currentContent.description == "" ||currentContent.description == undefined){
				alert("Please provide the valid details, Description Should not be empty!");
			}
			//$('#invalidErrTxt').css({"display":"inline-block"});
		} else{
			$('#invalidErrTxt').css({"display":"none"});
			if(currentContent.id == "" || currentContent.id == undefined){			

					let subStage =this.props.subStages;					
					let groupedsubStage= lodash.groupBy(subStage,"id");	
					console.log(JSON.stringify(groupedsubStage));				
					let substageId= currentContent.subStage["id"] ;	
					console.log("substageId*********",substageId);				
					 let subStagename=groupedsubStage[substageId][0].name;	
					 let contentCount =0;
					 console.log("substagename******",subStagename);	
					 			 
					 let contentList= this.props.contents;
					 let groupedContent= lodash.groupBy(contentList,"subStageName");
					 let subStageContent=groupedContent[subStagename];	
					 console.log("subStageContent******",subStageContent);
                     // checking the length of substage array
					 if(subStageContent!=undefined){
						contentCount=subStageContent.length;
					 }					 
					 currentContent.displayOrder=contentCount + 1;

			     	this.props.actions.createAdminContent(currentContent,accessToken).then(() => {
					this.setState({ showEdit : !this.state.showEdit, currentContent : defaultContent});

					this.props.actions.loadAdminContents(userName,accessToken);
				    this.props.actions.loadStages(userName,accessToken);
				});
			} else{
				this.props.actions.updateAdminContent(currentContent,accessToken).then(() => {
					this.setState({ showEdit : !this.state.showEdit, currentContent : defaultContent});
					this.props.actions.loadAdminContents(userName,accessToken);
					this.props.actions.loadStages(userName,accessToken);
				});
			}
		}
	}

	
	addRoles(){
		let currentStateRole = this.state.roles;
		let currentSelectedRole = document.getElementById("roleSelect").value;
		if(currentStateRole.selectedRoles.length == this.props.roles.length || (currentStateRole.selectedRoles.length == 1 && currentStateRole.selectedRoles[0]["id"] == "All")){
			return false;
		}
		if(currentSelectedRole == ""){
			$(".roleErrorTxt").css("display","inline-block");
		} else if(currentSelectedRole == "All"){
			$(".roleErrorTxt").css("display","none");
			let currentRole = [{"id" : "All", "name" : "All"}]
			let updatedRoles = {
				selectedRoles: currentRole,
				availableRoles: this.props.roles
			}
			document.getElementById("roleSelect").value = "";
			this.setState({ roles: updatedRoles});
		} else{
			$(".roleErrorTxt").css("display","none");
			let updatedAvailableRole = lodash.filter(currentStateRole.availableRoles,function(currentRole){
				return currentRole.id != currentSelectedRole;
			});
			let updatedSelectedRole = lodash.filter(currentStateRole.availableRoles,function(currentRole){
				return currentRole.id == currentSelectedRole;
			});
			let selectedRolesList = currentStateRole.selectedRoles;
			selectedRolesList.push(updatedSelectedRole[0]);
			let updatedRoles = {
				selectedRoles: selectedRolesList,
				availableRoles: updatedAvailableRole
			}
			this.setState({ roles: updatedRoles});

		}
	}

	removeRoles(role){
		let currentStateRole = this.state.roles;
		if(role.id == "All"){
			let updatedRoles = {
				selectedRoles: [],
				availableRoles: this.props.roles
			}
			this.setState({ roles: updatedRoles});
		} else{
			let existingAvailableRoles = currentStateRole.availableRoles;
			existingAvailableRoles.push(role);
			let updatedSelectedRole = lodash.filter(currentStateRole.selectedRoles,function(currentRole){
				return currentRole.id != role.id;
			});
			
			let updatedRoles = {
				selectedRoles: updatedSelectedRole,
				availableRoles: existingAvailableRoles
			}
			this.setState({ roles: updatedRoles});
		}
	}
	
	addDocument(){
		let currentDocumentObj = {"type" : "", "url" : ""};
		let url = document.getElementById("docUrl").value;
		let type = document.getElementById("docType").value;
		if(url == "" || type == ""){
			$(".docErrorTxt").css("display","inline-block");
		} else {
			$(".docErrorTxt").css("display","none");
			let currentContent = this.state.currentContent;
			currentDocumentObj.url = url;
			currentDocumentObj.type = type;
			currentContent.documents.push(currentDocumentObj);
			this.setState({ currentContent : currentContent});
			document.getElementById("docUrl").value = "";
			document.getElementById("docType").value = "";
		}
	}

	removeDocument(documentIndex){
		let currentContent = this.state.currentContent;
		let doucmentList = currentContent.documents;
		doucmentList.splice(documentIndex,1);
		let updatedContent = this.state.currentContent;
		updatedContent.documents = doucmentList;
		this.setState({ currentContent : updatedContent});
	}

	
	updateOrderedContent(event){
		
		console.log(event.target.getAttribute("data-val"));
		let subStage = event.target.getAttribute("data-val");
	    let accessToken = this.props.loginDetails.accessToken;
        let updateObjArr=[];
		let i=0;
        let updateObj;
		let displayOrder=0;		
		let TrimmedSubStage=subStage.split(" ").join("");
		console.log("Trimmed Substage#######",TrimmedSubStage);
		let liArr = $("#li_"+TrimmedSubStage+" li");
		         console.log(liArr );

         $(liArr).each(function(i, ele){
               				

				displayOrder=displayOrder+1;
				updateObj = {};					
				updateObj["id"]= $(ele).attr("data-content_id");
				updateObj["displayOrder"]= displayOrder; 	

				console.log("updateObj is" , updateObj)
	            updateObjArr.push(updateObj);
				
         });		
			console.log("~~~~~~~~Updated Array~~~~~~~~", JSON.stringify(updateObjArr));			
	       this.props.actions.updateOrderedContent(updateObjArr,accessToken);  
	}



	sortableList(subStageName){
		let contentList= this.props.contents;
		let orderedData = lodash.orderBy(contentList,["id"],["asc"]);
		let groupedContent= lodash.groupBy(contentList,"subStageName");
		let orderContent = lodash.orderBy(groupedContent[subStageName],["displayOrder"],["asc"]);

        //console.log("*******orderContent*******", JSON.stringify(orderContent))

		let substageNames= Object.keys(groupedContent);
		let sortableItems = [];

		orderContent.map((content) => {
			sortableItems.push (	
				
			<li className="RowView" key={"content_"+content.id} data-content_id={content.id} >
				
				
				<div className="ColumnView" style={{"paddingRight":"120px"}}>
					<p className="UserRole" style={{"lineHeight":"15px"}}>{content.name}</p>
				</div>

					<div className="TableIcon">

					<span className="EditIconRound EditIconCon" onClick={this.editContent.bind(this,content)}> </span>
					<span className="DeleteIcon" onClick={this.deleteContent.bind(this,content.id)}></span>
					
						   
					</div>
		
				</li>	 
						
			)
			
			});

			return sortableItems;
			
	}

	render() {

		let contentList= this.props.contents;
		let substageList = this.props.subStages;
		let showList = this.state.showEdit ? "none" : "block";
		let showEdit = this.state.showEdit ? "block" : "none";
		let currentContent = this.state.currentContent;    
		let groupedContent= lodash.groupBy(contentList,"subStageName");
		let substageNames= Object.keys(groupedContent);
    	let rolesValue = this.state.roles;
		let selectedRoles = rolesValue.selectedRoles;
		let availableRoles = rolesValue.availableRoles;
		let roleDisabledStatus =  ((selectedRoles.length == 1 && selectedRoles[0]["id"] == "All") || (selectedRoles.length == this.props.roles.length))  ? true : false ;

		return (
			<div id="Tab5" className="TabCon TabConFnc" style={{"padding":"40px 20px 20px 30px"}}>
				<div className="content">
				<div className="UpdateIcon" style={{"display" : showList}}>
					<p><span className="AddIcon" onClick={this.editContent.bind(this,defaultContent)}></span></p>
				</div>
		    	{ 
		  		   substageNames.map((subStageName_) => { 

        return(
            <div key={"subStageName"+subStageName_} className="ContentSection" style={{"display" : showList}} >
                  
				       <div className="HeadView"> 
							<p>{subStageName_}</p>
						</div>
					
					<div className="TableView"  style={{"verticalAlign": "top","width":"100%","height":"170px"}}>
					
						
						<ReactSortable  tag="ul" id={"li_"+subStageName_.split(" ").join("")}>	
				                 	   {	
							
									this.sortableList(subStageName_)
							
					                   }
						</ReactSortable>
					
					</div>

					<div>
					<button className="UpdateButton" data-val={subStageName_} onClick={this.updateOrderedContent}>Update</button> 
                   </div>
				   </div>
                 )
				
				})
				}





				<div className="ContentSectionEdit" style={{"display" : showEdit}} >
					<form>
						<div className="RoleRow">
							<div className="RoleColumn Roleright">
								<div className="RoleLabel">
									<label>Content Name</label>
								</div>
								<div className="RoleInput">
									<input type="text" name="name" onChange={this.updateStateValue.bind(this)} value={currentContent.name} required/>
								</div>
							</div>
							<div className="RoleColumn">
								<div className="RoleLabel">
									<label>Title</label>
								</div>
								<div className="RoleInput">
									<input type="text" name="title" onChange={this.updateStateValue.bind(this)} value={currentContent.title}/>
								</div>
							</div>
						</div>
						<div className="RoleRow">
							<div className="RoleColumn Roleright">
								<div>
									<div className="RoleLabel">
										<label>Header</label>
									</div>
									<div className="RoleInput">
										<textarea rows="8" name="header"  onChange={this.updateStateValue.bind(this)} value={currentContent.header}></textarea>
									</div>
								</div>
								<div style={{"paddingTop":"30px"}}>
									<div className="RoleLabel">
										<label>Footer</label>
									</div>
									<div className="RoleInput">
										<textarea rows="8" name="footer"  onChange={this.updateStateValue.bind(this)} value={currentContent.footer}></textarea>
									</div>
								</div>
							</div>
							<div className="RoleColumn">
								<div className="RoleLabel">
									<label>Description</label> 
								</div>
								<div className="RoleInput">
									<textarea rows="15" cols="50" name="description"  onChange={this.updateStateValue.bind(this)} value={currentContent.description}></textarea>
								</div>
							</div>
							<div className="RoleColumn VerticalColumn" style={{"paddingTop":"30px"}}>
								<div className="RoleLabel">
									<label>Sub Stage</label>
								</div>
								<div className="RoleInput">
									<select name="subStage" onChange={this.updateStateValue.bind(this)} value={currentContent.subStage["id"]}>
										<option value="">Choose Sub Stage</option>
										{
											substageList.map((subStage) => {
													return	(<option key={"subStageName_"+subStage.id} value={subStage.id}>{subStage.name}</option>)
												})
										}
									</select>
								</div>
							</div>
						</div>
						<div className="RoleRow">							
							<div className="RoleColumn Roleright">
								<div className="RoleLabel">
									<label>Roles</label>
								</div>
								<p className="roleErrorTxt">Please select the valid role.</p>
								<div className="RoleInput PosRel">
									<select name="roles" name="role" disabled={roleDisabledStatus} id="roleSelect" defaultValue="">
										<option value="">Choose Role</option>
										<option value="All">All</option>
										{
											availableRoles.map((role) => {
												return	(<option key={"roleName_"+role.id} value={role.id}>{role.name}</option>)
											})
										}
									</select>
									<img className={((selectedRoles.length == this.props.roles.length) || (selectedRoles.length == 1 && selectedRoles[0]["id"] == "All")) ?"PlusIcon PlusIconDisabled" : "PlusIcon"} src={require('../../images/PlusIcon.png')} alt="" onClick={this.addRoles} />
								</div>
								<div className="AddedRoles">
									<ul>
									{	selectedRoles.map((role,index) => {
											return	(<li key={"doucment_"+role.id+"_"+index} className="RoleName">{role.name}<span className="CloseBtn" onClick={this.removeRoles.bind(this,role)}><img src={require('../../images/CloseIcon.png')} alt="" /></span></li>)
										})
									}									
									</ul>
								</div>
							</div>
							<div className="RoleColumn DocumentColumn">
								<div className="RoleLabel">
									<label>List of Documents</label>
								</div>
								<p className="docErrorTxt">Please provide the valid type and URL.</p>
								<div className="RoleInput PosRel">
									<input id="docUrl" type="text" name="Role"></input>
									<select id="docType" name="role">
										<option value="">Choose Document Type</option>
										<option value="VIDEO">VIDEO</option>
										<option value="PDF">PDF</option>
										<option value="PPT">PPT</option>
									</select>
									<img className="PlusIcon" src={require('../../images/PlusIcon.png')} alt="" onClick={this.addDocument} />
								</div>
								<div className="AddedDocuments">
									<ul>
									{	(currentContent.documents).map((document,index) => {
											return	(<li key={"doucment_"+document.id+"_"+index} className="DocName">{document.url}	<span className="CloseBtn" onClick={this.removeDocument.bind(this,index)}><img src={require('../../images/CloseIcon.png')} alt="" /></span></li>)
										})
									}									
									</ul>
								</div>
							</div>
						</div>														
					</form>
				</div>
				</div>
				<div className="FormBtn" style={{"display" : showEdit}}>
					
				<button className="Save" onClick={this.updateContent}>Save</button>		
				<button className="Cancel" onClick={this.cancelEdit}>Cancel</button>
				</div>
			</div>
		);
	}
}

function mapStateToProps (state, ownProps) {
	return {
		subStages : state.adminSubStages,
		contents : state.adminContents,
		roles : state.roleList,
		loginDetails : state.login,
		userDetails: state.userInfo, 
		contentDetails: state.content
  	}
}

function mapDispatchToProps (dispatch) {
	return {
		  actions : bindActionCreators(Object.assign({},subStagesActions,adminContentsActions,ContentsActions,rolesActions,stageActions),dispatch)
  	}
}

ContentPresent.propTypes = {

};

ContentPresent.contextTypes = {
	router: React.PropTypes.object.isRequired
};

export default connect(mapStateToProps,mapDispatchToProps)(ContentPresent);
