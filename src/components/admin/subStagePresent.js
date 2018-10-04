/**
 * This file loads the 'SubStage' tab of Admin section.
 * File Name : subStagePresent.js
 * Path : src/components/admin
 * Created Date : 28th Nov 2017
 */

import React, {PropTypes} from 'react';
import {Link, IndexLink} from 'react-router';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import lodash from 'lodash';

import * as subStagesActions from '../../actions/admin/adminSubStagesAction';
import * as adminStagesActions from '../../actions/admin/adminStagesAction';
import * as stageActions from '../../actions/stage/stageActions';

let defaultSubStage = {
	id : "",
	name: "",
	stage: {
		id: "",
		name :""
	}
}

class SubStagePresent extends React.Component{
	constructor(props, context){
		super(props, context);
		this.editSubStage = this.editSubStage.bind(this);
		this.deleteSubStage = this.deleteSubStage.bind(this);
		this.selectStage = this.selectStage.bind(this);
		this.cancelEdit = this.cancelEdit.bind(this);	
		this.updateSubStage = this.updateSubStage.bind(this);
		this.updateSubStageName = this.updateSubStageName.bind(this);		
		this.state = { showEdit : false, currentSubStage :  defaultSubStage}
	}

	componentWillMount(){
		let subStages = this.props.subStages;
		let stages = this.props.stages;
		if(subStages.length == 0){
			this.props.actions.loadAdminSubStages(this.props.loginDetails.accessToken);
		}
		if(stages.length == 0){
			this.props.actions.loadAdminStages(this.props.loginDetails.accessToken);
		}
	}

	editSubStage(currentSubStageObj){
		if(currentSubStageObj.id == ""){
			defaultSubStage = {
				id : "",
				name: "",
				stage: {
					id: "",
					name :""
				}
			}
			this.setState({ showEdit : !this.state.showEdit, currentSubStage : defaultSubStage});
		} else{
			let updatedSubStage = {
				id : currentSubStageObj.id,
				name : currentSubStageObj.name,
				stage : {
					id: currentSubStageObj.stage.id,
					name: currentSubStageObj.stage.name
				},
			}
			this.setState({ showEdit : !this.state.showEdit, currentSubStage : updatedSubStage});
		}
	}

	deleteSubStage(currentSubStageId){
		let accessToken = this.props.loginDetails.accessToken;
		let userName = this.props.userDetails.userName;
		this.props.actions.deleteAdminSubStage(currentSubStageId,accessToken).then(() => {
			this.props.actions.loadStages(userName,accessToken);
		});
	}

	updateSubStage(){
		let accessToken = this.props.loginDetails.accessToken;
		let currentSubStage = this.state.currentSubStage;
		let userName = this.props.userDetails.userName;
		if(currentSubStage.name == "" || currentSubStage.name == undefined || currentSubStage.stage.id == "" ||currentSubStage.stage.id == undefined){
			alert("Please provide the valid SubStage name and Stage");
			//$('#invalidErrTxt').css({"display":"inline-block"});
		} else{
			$('#invalidErrTxt').css({"display":"none"});
			if(currentSubStage.id == "" || currentSubStage.id == undefined){
				this.props.actions.createAdminSubStage(currentSubStage,accessToken,userName).then(() => {
					this.setState({ showEdit : !this.state.showEdit, currentSubStage : defaultSubStage});
					this.props.actions.loadStages(userName,accessToken);
				});
			} else{
				this.props.actions.updateAdminSubStage(currentSubStage,accessToken,userName).then(() => {
					this.setState({ showEdit : !this.state.showEdit, currentSubStage : defaultSubStage});
					this.props.actions.loadStages(userName,accessToken);
				});
			}
		}		
	}

	cancelEdit(){
		this.setState({ showEdit : !this.state.showEdit, currentSubStage : defaultSubStage});
	}

	updateSubStageName(e){
		let subStageName = e.target.value;
		let updatedSubStage = {
			id : this.state.currentSubStage.id,
			name : subStageName,
			stage : this.state.currentSubStage.stage
		}
		this.setState({ currentSubStage : updatedSubStage});
	}

	selectStage(e){
		let stageList = this.props.stages;
		let stageId = e.target.value;
		let stageInfo = lodash.filter(stageList,(stage) => stage.id == stageId);
		let updatedSubStage = {
			id : this.state.currentSubStage.id,
			name : this.state.currentSubStage.name,
			stage : {
				id: stageId,
				name: stageId == "" ? "" : stageInfo[0].name
			},
		}
		this.setState({ currentSubStage : updatedSubStage});
	}

	render() {
		let subStageList = this.props.subStages;
		let stageList = this.props.stages;
		let showList = this.state.showEdit ? "none" : "inline-block";
		let showEdit = this.state.showEdit ? "inline-block" : "none";
		let currentSubStage = this.state.currentSubStage;
		let groupedSubStages = lodash.groupBy(subStageList,"stage.name");
		let stageNames = Object.keys(groupedSubStages);
		return (
			<div id="Tab4" className="TabCon TabConFnc" style={{"padding":"70px 40px 50px 30px"}}>
				<div className="SubStage">
					<div className="UpdateIcon" style={{"display" : showList}}>
						<p><span className="AddIcon" onClick={this.editSubStage.bind(this, defaultSubStage)}></span></p>
					</div>
					{
						stageNames.map((stageName) => {
							return (
								<div key={"stage_"+stageName} className="TableView" style={{"verticalAlign": "top","margin": "6px","width":"32%","display" : showList}}>
									<div className="HeadView">
										<p>{stageName}</p>
									</div>
									{
										groupedSubStages[stageName].map((subStage) => {
											return (
												<div key={"subStage_"+subStage.id} className="RowView">
													<div className="ColumnView" style={{"paddingRight":"120px"}}>
														<p className="UserRole" style={{"lineHeight":"15px"}}>{subStage.name}</p>
													</div>
													<div className="TableIcon">
														<p><span className="EditIconRound EditIconShow" 															onClick={this.editSubStage.bind(this,subStage)}																></span><span className="DeleteIcon" onClick=																{this.deleteSubStage.bind(this,subStage.id)}																></span></p>
													</div>
												</div>
											)
										})
									}
								</div>
							)
						})
					}
					<div className="SubStageEdit" style={{"display" : showEdit}}>
						<form>
							<p id="invalidErrTxt">Please provide the valid SubStage name and Stage</p>
							<div className="RoleRow">
								<div className="RoleColumn Roleright">
									<div className="RoleLabel">
										<label>Name</label>
									</div>
									<div className="RoleInput">
										<input type="text" name="subStage"  onChange={this.updateSubStageName.bind(this)} value={currentSubStage.name}/>
									</div>
								</div>
								<div className="RoleColumn">
									<div className="RoleLabel">
										<label>Stage</label>
									</div>
									<div className="RoleInput">
										<select onChange={this.selectStage.bind(this)} value={currentSubStage.stage.id}>
											<option value="">Choose Stage</option>
											{
												stageList.map((stage) => {
													return	(<option key={"stageName_"+stage.id} value={stage.id}>{stage.name}</option>)
												})
											}
										</select>
									</div>
								</div>
							</div>
						</form>
					</div>
				</div>
				<div className="FormBtn" style={{"display" : showEdit}}>
					<button className="Save" onClick={this.updateSubStage}>Save</button>
					<button className="Cancel" onClick={this.cancelEdit}>Cancel</button>
				</div>
			</div>
		);
	}
}

function mapStateToProps (state, ownProps) {
	return {
		subStages : state.adminSubStages,
		stages : state.adminStages,
		loginDetails : state.login,
		userDetails : state.userInfo
  }
}

function mapDispatchToProps (dispatch) {
	return {
		  actions : bindActionCreators(Object.assign({},subStagesActions,adminStagesActions,stageActions),dispatch)
 	};
}

SubStagePresent.propTypes = {

};

SubStagePresent.contextTypes = {
	router: React.PropTypes.object.isRequired
};

export default connect(mapStateToProps,mapDispatchToProps)(SubStagePresent);
