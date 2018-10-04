/**
 * This file loads the 'Stage' tab of Admin section.
 * File Name : stagePresent.js
 * Path : src/components/admin
 * Created Date : 28th Nov 2017
 */

import React, {PropTypes} from 'react';
import {Link, IndexLink} from 'react-router';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import * as adminStagesActions from '../../actions/admin/adminStagesAction';

class StagePresent extends React.Component{
	constructor(props, context){
		super(props, context);
	}

	componentWillMount(){
		let stages = this.props.stages;
		if(stages.length == 0){
			this.props.actions.loadAdminStages(this.props.loginDetails.accessToken);
		}
	}

	render() {
		let stageList = this.props.stages;
		return (
			<div id="Tab3" className="TabCon TabConFnc">
			<div className="Stage">
				<div className="TableView">
					<div className="HeadView">
						<p>Stage Names</p>
					</div>
					{
						stageList.map((stage) => {
							return (
								<div key={"stage_"+stage.id} className="RowView">
									<div className="ColumnView">
										<p className="UserRole">{stage.name}</p>
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
	return {
		stages : state.adminStages,
		loginDetails : state.login
  }
}

function mapDispatchToProps (dispatch) {
	return {
		  actions : bindActionCreators(Object.assign({},adminStagesActions),dispatch)
 	};
}

StagePresent.propTypes = {

};

StagePresent.contextTypes = {
	router: React.PropTypes.object.isRequired
};

export default connect(mapStateToProps,mapDispatchToProps)(StagePresent);
