import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getCurrentProfile } from "../../actions/profileActions";
import Spinner from "../commons/Spinner";

class Dashboard extends Component {
	componentDidMount() {
		// When the Dashboard comp loads, it gets profile from the redux state
		this.props.getCurrentProfile(); //this action adds our profile to the the state
	}

	render() {
		// Before we render anything, make sure 'profile !== null so as to have content to display in the Dashboard'
		const { user } = this.props.auth; //Get user from auth state
		const { profile, loading } = this.props.profile; //get profile from profile state
		let dashboardContent;
		if (profile === null || loading) {
			//If dashboard is still loading, then no content to display
			dashboardContent = <Spinner />;
		} else {
			// Check if loggedIn user has profile data
			if (Object.keys(profile).length > 0) {
				dashboardContent = <h2>Diaplay profile</h2>;
			} else {
				// User is loggedIn but has no profile
				dashboardContent = (
					<div>
						<p className="lead text-muted">
							Welcome <span className="text-danger">{user.name}</span>
						</p>
						<p>You have not yet created a profile, please add your profile</p>
						<Link to="/create-profile" className="btn btn-lg btn-info">
							Create Profile
						</Link>
					</div>
				);
			}
		}
		return (
			<div className="dashboard">
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<h1 className="display-4">Dashboard</h1>
							{dashboardContent}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

Dashboard.propTypes = {
	getCurrentProfile: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
