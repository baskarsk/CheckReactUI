/**
 * This file loads the main container component for Admin section.
 * @author : Anandi Yogeesan
 * File Name : admin.js
 * Path : src/containers/admin
 * Created Date : 28th Nov 2017
 */
import React from 'react';
import PropTypes from 'prop-types'; 
import {Link} from 'react-router';
import {connect} from 'react-redux';
import Header from '../../components/common/header';
import Footer from '../../components/common/footer';

class Admin extends React.Component{

	constructor(props, context){
		super(props, context);
	}

	componentWillMount(){
		if(!this.props.userDetails.admin){
			this.context.router.push("/");
		}
	}

	render() {
		let footerLink = "Admin";
		let currentPath = (window.location.pathname).split("/admin/")[1];
		return (
			<div>
				<Header isMenuHidden={true}/>
				<div className="BodySection">
					<div className="MainContent">
						<section>
							<div className="container">
								<div className="AdminContent">
									<div className="AdminTab">
										<div className="TadHeader">
											<ul className="TabClick TabClickFnc">
												<li data-tab="Role" className={currentPath == "role" ? "Active" : ""}><Link to="/admin/role">ROLE</Link></li>
												<li data-tab="User" className={currentPath == "user" ? "Active" : ""}><Link to="/admin/user">USER</Link></li>
												<li data-tab="Stage" className={currentPath == "stage" ? "Active" : ""}><Link to="/admin/stage">STAGE</Link></li>
												<li data-tab="SubStage" className={currentPath == "substage" ? "Active" : ""}><Link to="/admin/substage">SUB STAGE</Link></li>
												<li data-tab="Content" className={currentPath == "content" ? "Active" : ""}><Link to="/admin/content">CONTENT</Link></li>
												<li data-tab="Feedback" className={currentPath == "feedback" ? "Active" : ""}><Link to="/admin/feedback">FEEDBACK</Link></li>
											</ul>
										</div>
										<div className="TabContent">
											{
												this.props.children
											}
										</div>
									</div>
								</div>
							</div>
						</section>
					</div>
				</div>
				<Footer />
			</div>
		);
	}
}

function mapStateToProps (state, ownProps) {
	return {
		userDetails: state.userInfo
  }
}

Admin.propTypes = {
	children : PropTypes.object.isRequired
};

Admin.contextTypes = {
	router: React.PropTypes.object.isRequired
};

export default connect(mapStateToProps)(Admin);
