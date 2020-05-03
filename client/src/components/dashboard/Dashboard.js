import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profileActions";

class Dashboard extends Component {
	componentDidMount() {
		this.props.getCurrentProfile();
	}
	render() {
		return (
			<div>
				<h2>Dashboard</h2>
			</div>
		);
	}
}

// Dashboard.PropTypes = {};

export default connect(null, { getCurrentProfile })(Dashboard);
