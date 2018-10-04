/**
 * This has root component to render the childs based on the router.
 * @author : Bala
 * File Name : app.js
 * Path : src/containers/
 * Created Date : 14th Nov 2017
 */
import React from 'react';
import PropTypes from 'prop-types';

class App extends React.Component{
	render() {
		return (
			<div>
				{this.props.children}
			</div>
		);
	}
}

App.propTypes = {
	children : PropTypes.object.isRequired
};

export default App;
