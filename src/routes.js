/**
 * All the routers are defined and the respective components are referenced.
 * File Name : routes.js
 * Created Date : 14th Nov 2017
 */

import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from './container/common/app';
import DashboardPage from './components/dashboard/dashboardPresent';
import ContentPage from './components/content/contentPresent';
import Admin from './container/admin/admin';
import Role from './components/admin/rolePresent';
import User from './components/admin/userPresent';
import Stage from './components/admin/stagePresent';
import SubStage from './components/admin/subStagePresent';
import Content from './components/admin/contentPresent';
import Feedbacks from './components/admin/feedbackPresent';
import FeedbackContainer from './container/feedback/feedback';
import FeedbackFromUser from './components/feedback/feedbackFromUser'
import AllFeedbacksPage from './components/feedback/feedbackFromAllUsers'
import FeedbacksPerUser from './components/feedback/AllFeedbacksFromAUser'

export default (
	<Route path="/" component={App}>
		<IndexRoute component={DashboardPage} />
		<Route path="/discover" component={ContentPage}/>
		<Route path="/assimilate" component={ContentPage}/>
		<Route path="/learn" component={ContentPage}/>
		<Route path="feedback" component={FeedbackContainer}>
			<Route path="feedbackFromUser" component={FeedbackFromUser}/>
			<Route path="approvedfeedbacks" component={AllFeedbacksPage}/>
			<Route path="feedbacksOfAUser/:userId" component={FeedbacksPerUser}/>
		</Route>
		<Route path="admin" component={Admin}>
			<Route path="role" component={Role}/>
			<Route path="user" component={User}/>
			<Route path="stage" component={Stage}/>
			<Route path="subStage" component={SubStage}/>
			<Route path="content" component={Content}/>
			<Route path="feedback" component={Feedbacks}/>
 		</Route>
 	</Route>
);
