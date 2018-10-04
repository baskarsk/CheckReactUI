/**
 * This file loads the 'User' tab of Admin section.
 * @author : Anandi Yogeesan
 * File Name : userPresent.js
 * Path : src/components/admin
 * Created Date : 28th Nov 2017
 */

import React from 'react';
import PropTypes from 'prop-types';
import {Link, IndexLink} from 'react-router';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as UserAction from '../../actions/admin/userAction';
import * as RoleAction from '../../actions/admin/roleAction';

class UserPresent extends React.Component{
	constructor(props, context){
		super(props, context);
		this.onUserEditClick = this.onUserEditClick.bind(this);
		this.userDelete = this.userDelete.bind(this);
		this.saveUser = this.saveUser.bind(this);
		this.onCancelClick = this.onCancelClick.bind(this);
		this.emailChange = this.emailChange.bind(this);
		this.state = {
			isEditUser : false,
			userObj : this.props.user
		}
	}

	componentWillMount(){
		if(this.props.users.length == 0){
			this.props.actions.loadUsers(this.props.accessToken)
		}
		if(this.props.roles.length == 0){
			this.props.actions.loadRoles(this.props.accessToken);
		}
	}

	componentDidMount(){
			let {user} = this.props;
			$("#roleId").val(user.role_id);
	}

	componentWillReceiveProps(nextProps){
		let {user} = nextProps;
		$("#roleId").val(user.role_id);
	}

	onUserEditClick(event){
		let userId = event.target.getAttribute('data-userId');
		let userName = event.target.getAttribute('data-userName');
		this.props.actions.getUser(userName, this.props.accessToken)
		.then(()=>{
			this.setState({
				isEditUser : true,
				userObj : this.props.user
			})
		})
	}

	emailChange(event){
		let emailId = $("#emailId").val();
		var emailRegex = /^([A-Za-z0-9_\-\.])+\@cognizant.com$/;
		if(!emailRegex.test(emailId)){
			$("#emailId").addClass("invalid");
		}else{
			$("#emailId").removeClass("invalid");
		}
	}

	saveUser(event){
		let userId = event.target.getAttribute('data-userId');
		let isEdit = event.target.getAttribute('data-IsEdit');
		let userName = $("#userNameAdd").val();
		let firstName = $("#firstName").val();
		let lastName = $("#lastName").val();
		let emailId = $("#emailId").val();
		let languague = $("#languague").val();
		let roleId = parseInt($("#roleId").val());
		let isAdmin = $("#isAdmin").prop("checked");
		let password = $("#userPassword").val();
		let userObj = {
			'userName' : emailId,
			'firstName' : firstName,
			'lastName' : lastName,
			'emailId' : emailId,
			'password' : password,
			'languague' : languague,
			'role' : {
				'id' : roleId
			},
			'admin' : isAdmin
		};
		if(isEdit == "true"){
			if(firstName == "" || firstName == undefined || lastName == "" || lastName == undefined ||
			 emailId == "" || emailId == undefined || languague == "" || languague == undefined ||
			  roleId == null || roleId == undefined || $("#emailId").hasClass("invalid")){
				if(firstName == "" || firstName == undefined){
					alert("Please provide the valid details, First Name Should not be empty!");
				}else if(lastName == "" || lastName == undefined){
					alert("Please provide the valid details, Last Name Should not be empty!");
				}else if(emailId == "" || emailId == undefined || $("#emailId").hasClass("invalid")){
					alert("Please provide the valid details, EmailId Should not be empty!");
				}else if(languague == "" || languague == undefined){
					alert("Please provide the valid details, Last Name Should not be empty!");
				}else if(roleId == null || roleId == undefined){
					alert("Please provide the valid details, RoleId  Should not be empty!");
				}
				//$(".invalidUserForm").css('display','block');
			}else{
				$(".invalidUserForm").css('display','none');
				this.props.actions.udpateUser(userId, userObj, this.props.accessToken)
				.then(()=>{
					this.setState({
						isEditUser: false,
						userObj: this.props.user
					})
				})
			}
		}else{
			if(firstName == "" || firstName == undefined || lastName == "" || lastName == undefined ||
			 emailId == "" || emailId == undefined || password == "" || password == undefined || languague == "" || languague == undefined ||
			  roleId == null || roleId == undefined || $("#emailId").hasClass("invalid")){
				$(".invalidUserForm").css('display','block');
			}else{
				$(".invalidUserForm").css('display','none');
				this.props.actions.createUser(userObj, this.props.accessToken)
				.then(()=>{
					this.setState({
						isEditUser: false,
						userObj: this.props.user
					})
				})
			}
		}
	}

	userDelete(event){
		let userId = event.target.getAttribute('data-userId');
		this.props.actions.deleteUser(userId, this.props.accessToken)
	}

	onCancelClick(){
		this.setState({
			isEditUser : false
		})
	}

	render() {
		let {users, roles} = this.props;
		let user = this.state.userObj;
		return (
				<div id="Tab2" className="TabCon TabConFnc userTab">
					{!this.state.isEditUser && <div>
						<div className="UpdateIcon">
						<p><span className="AddIcon" onClick={()=>this.setState({isEditUser: true, userObj:{}})}></span></p>
					</div>
			<div className="UserStatus">
				<div className="TableView">
					<div className="HeadView">
						<div className="FirstColumn">
							<p>Users</p>
						</div>
					</div>
					{ users.map((user)=>{
							return(
								<div className="RowView" key={"userId"+user.id} data-userId={user.id}>
									<div className="FirstColumn">
										<p>{user.firstName}</p>
									</div>
									<div className="TableIcon" data-userId={user.id}>
										<p>
											<span className="EditIconRound EditIconFnc" data-userId={user.id} data-userName={user.userName} onClick={this.onUserEditClick}></span>
											<span className="DeleteIcon" data-userId={user.id} onClick={this.userDelete}></span>
										</p>
									</div>
								</div>
							)
					})
				}
				</div>
			</div>
			</div>}
			{this.state.isEditUser && <div className="UserStatusEdit">
	<div className="InnerTab">
		{/*<div className="TabContent">*/}
			<div id="UserInfoTab" className="InnerTabCon TabConFnc">
				<div className="UserFormContainer">
					<form>
						<div className="RoleRow">
							<div className="RoleColumn Roleright">
								<div className="RoleLabel">
									<label>Email ID</label>
								</div>
								<div className="RoleInput">
									<input id="emailId" type="text" name="emailid" defaultValue={user.emailId} onChange={this.emailChange} placeholder="abc@cognizant.com"></input>
								</div>
							</div>
							<div className="RoleColumn">
								<div className="RoleLabel">
									<label>First Name</label>
								</div>
								<div className="RoleInput">
									<input id="firstName" type="text" name="firstname" defaultValue={user.firstName}></input>
								</div>
							</div>
						</div>
						<div className="RoleRow">
							<div className="RoleColumn Roleright">
								<div className="RoleLabel">
									<label>Last Name</label>
								</div>
								<div className="RoleInput">
									<input id="lastName" type="text" name="lastname" defaultValue={user.lastName}></input>
								</div>
							</div>
							<div className="RoleColumn">
								<div className="RoleLabel">
									<label>Role</label>
								</div>
								<div className="RoleInput">
									<select id="roleId" defaultValue={user.role_id}>
										{roles.map((role)=>{
											return(
												<option value={role.id} key={role.id}>{role.name}</option>
											)
										})
									}
									</select>
								</div>
							</div>
						</div>
						<div className="RoleRow">
							<div className="RoleColumn Roleright">
								<div className="RoleLabel">
									<label>Language</label>
								</div>
								<div className="RoleInput">
									<select id="languague" defaultValue={user.language}>
										<option value="English">English</option>
										<option value="German">German</option>
										<option value="French">French</option>
									</select>
								</div>
							</div>
							<div className="RoleColumn">
								<div className="RoleLabel">
									<label>Is Admin</label>
								</div>
								<div className="RoleInput">
									<input id="isAdmin" type="checkbox" name="isAdmin" defaultChecked={user.admin}></input>
								</div>
							</div>
						</div>
						<div className="RoleRow">
							<div className="RoleColumn Roleright" style={{display:user.id?'none':'block'}}>
								<div className="RoleLabel">
									<label>Password</label>
								</div>
								<div className="RoleInput">
									<input id="userPassword" type="password" name="password" defaultValue={user.password}></input>
								</div>
							</div>
						</div>
					</form>
				</div>
				<div className="FormBtn">
					<p className="invalidUserForm" style={{display:'none'}}>Please enter valid data for all the fields.</p>
					<button className="Save" onClick={this.saveUser} data-userId={user.id} data-IsEdit={user.id?true:false}>Save</button>
					<button className="Cancel" onClick={this.onCancelClick}>Cancel</button>
				</div>
			</div>
		{/*</div>*/}
	</div>
</div>}
			</div>
		);
	}
}

function mapStateToProps (state, ownProps) {
	return {
		user: state.user,
		users: state.userList,
		roles: state.roleList,
		accessToken: state.login.accessToken
  }
}

function mapDispatchToProps (dispatch) {
	return {
		  actions : bindActionCreators(Object.assign({},UserAction,RoleAction),dispatch)
  };
}

UserPresent.propTypes = {

};

UserPresent.contextTypes = {
	router: React.PropTypes.object.isRequired
};

export default connect(mapStateToProps,mapDispatchToProps)(UserPresent);
