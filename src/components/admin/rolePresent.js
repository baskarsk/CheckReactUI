/**
 * This file loads the 'Role' tab of Admin section.
 * @author : Anandi Yogeesan
 * File Name : rolePresent.js
 * Path : src/components/admin
 * Created Date : 28th Nov 2017
 */

import React from 'react';
import PropTypes from 'prop-types';
import {Link, IndexLink} from 'react-router';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as RoleAction from '../../actions/admin/roleAction';

class RolePresent extends React.Component{
	constructor(props, context){
		super(props, context);
		this.deleteRole = this.deleteRole.bind(this);
		this.editRole = this.editRole.bind(this);
		this.saveRole = this.saveRole.bind(this);
		this.onCancelClick = this.onCancelClick.bind(this);
		this.state = {
			isEditRole : false,
			roleObj : this.props.role
		}
	}

	componentWillMount(){
		this.props.actions.loadRoles(this.props.accessToken);
	}

	editRole(event){
		let roleId = event.target.getAttribute('data-roleId');
		let that = this;
		this.props.actions.getRole(roleId, this.props.accessToken).then((data)=>{
			that.setState({
				isEditRole : true,
				roleObj : that.props.role
			})
		});
	}

	saveRole(event){
		let isEdit = event.target.getAttribute('data-IsEdit');
		let roleId = event.target.getAttribute('data-roleId');
		let roleName = $("#roleName").val();
 		let roleStatus = $("#roleStatus").val();
 		let roleDescription = $("#roleDescription").val();
		if(roleName == "" || roleName == undefined || roleStatus == "" || roleStatus == undefined || roleDescription == "" || roleDescription == undefined){
			if(roleName == "" || roleName == undefined){
				alert("Please provide the valid details, Role Name Should not be empty!");
			}else if(roleStatus == "" || roleStatus == undefined){
				alert("Please provide the valid details, Role Status Should not be empty!");
			}else if(roleDescription == "" || roleDescription == undefined){
				alert("Please provide the valid details, Role Description Should not be empty!");
			}s
			//$(".invalidRoleForm").css('display','block');
		}else{
			$(".invalidRoleForm").css('display','none');
			if(isEdit=="true"){
				this.props.actions.updateRole(roleId,roleName,roleStatus,roleDescription,this.props.accessToken)
				.then(()=>{
					this.setState({
						isEditRole: false
					})
				})
			}else{
				this.props.actions.createRole(roleName,roleStatus,roleDescription,this.props.accessToken)
				.then(()=>{
					this.setState({
						isEditRole: false
					})
				})
			}
		}

	}

	deleteRole(event){
		let roleId = event.target.getAttribute('data-roleId');
		let roleObject = {};
		let users = [];
		this.props.roles.map((role)=>{
			if(role.id == roleId){
				roleObject = role;
				users = roleObject["users"];
			}
		})
		if(users.length == 0){
			$(".roleDelErr").css("display","none");
			$(".contentAccRoleDelErr").css("display","none");
			this.props.actions.deleteRole(roleId, this.props.accessToken);
		}else{
			$(".roleDelErr").css("display","block");
			$(".contentAccRoleDelErr").css("display","none");
		}
	}

	onCancelClick(){
		this.setState({
			isEditRole : false
		});
	}

	render() {
		let {roles} = this.props;
		let role = this.state.roleObj;
		return (
			<div id="Role" className="TabCon TabConFnc">
				{!this.state.isEditRole && <div>
					<p className="roleDelErr" style={{display:'none'}}>Users are associated with this role! Role cannot be deleted!</p>
					<p className="contentAccRoleDelErr" style={{'display':'none','padding':'10px','color':'red'}}>Contents are associated with this role! Role cannot be deleted! Please remove role from Content.</p>
				<div className="UpdateIcon">
						<p><span className="AddIcon" onClick={()=>this.setState({isEditRole:true,roleObj:{}})}></span></p>
				</div>
				<div className="TableView">
				<div className="HeadView">
				<p>Role Names</p>
				</div>
					{roles.map((role) => {
						return(
							<div className="RowView" key={"roleId"+role.id} data-roleId={role.id}>
							<div className="ColumnView">
								<p className="UserRole">{role.name}</p>
							</div>
							<div className="TableIcon">
								<p>
									<span className="EditIconRound EditIconFnc" data-roleId={role.id} onClick={this.editRole}></span>
									<span className="DeleteIcon" data-roleId={role.id} onClick={this.deleteRole}></span>
								</p>
							</div>
						</div>
						)
					})
					}
				</div>
				</div>}
				{this.state.isEditRole && <div className="RoleEditForm">
						<div className="FormContainer">
							<form id="roleForm">
								<div className="RoleRow">
									<div className="RoleColumn Roleright">
										<div className="RoleLabel">
											<label>Role Name</label>
										</div>
										<div className="RoleInput">
											<input id="roleName" type="text" name="Role" defaultValue={role.name}></input>
										</div>
									</div>
									<div className="RoleColumn">
										<div className="RoleLabel">
											<label>Status</label>
										</div>
										<div className="RoleInput">
											<input id="roleStatus" type="text" name="Role" defaultValue={role.status}></input>
										</div>
									</div>
								</div>
								<div className="RoleRow">
									<div className="RoleColumn Roleright">
										<div className="RoleLabel">
											<label>Description</label>
										</div>
										<div className="RoleInput">
											<textarea id="roleDescription" rows="5" defaultValue={role.description}></textarea>
										</div>
									</div>
								</div>
							</form>
						</div>
						<p className="invalidRoleForm" style={{display:'none'}}></p>
						<div className="FormBtn">
							<button className="Save" onClick={this.saveRole} data-roleId={role.id} data-IsEdit={role.id?true:false}>Save</button>
							<button className="Cancel" onClick={this.onCancelClick}>Cancel</button>
						</div>
					</div>}
				</div>
				);
	}
}

function mapStateToProps (state, ownProps){
	return {
		roles: state.roleList,
		role: state.role,
		accessToken: state.login.accessToken
  }
}

function mapDispatchToProps (dispatch) {
	return {
		  actions : bindActionCreators(Object.assign({},RoleAction),dispatch)
 	};
}

RolePresent.propTypes = {

};

RolePresent.contextTypes = {
	router: React.PropTypes.object.isRequired
};

export default connect(mapStateToProps,mapDispatchToProps)(RolePresent);
