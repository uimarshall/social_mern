import React, { Component } from "react";

import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";

class Navbar extends Component {
	handleLogoutClick = (e) => {
		e.preventDefault();
		this.props.logoutUser();
	};
	render() {
		const { isAuthenticated, user } = this.props.auth;

		const authLinks = (
			<ul className="navbar-nav ml-auto">
				<li className="nav-item">
					<a href="" onClick={this.handleLogoutClick} className="nav-link">
						<img
							className="rounded-circle"
							src={user.avatar}
							alt={user.name}
							style={{ width: "25px", marginRight: "5px" }}
							title="You must have a Gravatar connected to your email to display an image"
						/>
						Logout
					</a>
				</li>
			</ul>
		);
		const guestLinks = (
			<ul className="navbar-nav ml-auto">
				<li className="nav-item">
					<Link className="nav-link" to="/register">
						Sign Up
					</Link>
				</li>
				<li className="nav-item">
					<Link className="nav-link" to="login">
						Login
					</Link>
				</li>
			</ul>
		);
		return (
			<div>
				<nav className="navbar navbar-expand-sm navbar-dark bg-primary mb-4">
					<div className="container">
						<Link className="navbar-brand" to="/">
							DevHub
						</Link>
						<button
							className="navbar-toggler"
							type="button"
							data-toggle="collapse"
							data-target="#mobile-nav">
							<span className="navbar-toggler-icon" />
						</button>

						<div className="collapse navbar-collapse" id="mobile-nav">
							<ul className="navbar-nav mr-auto">
								<li className="nav-item">
									<Link className="nav-link" to="/profiles">
										{" "}
										Developers Profile
									</Link>
								</li>
							</ul>
							{isAuthenticated ? authLinks : guestLinks}
						</div>
					</div>
				</nav>
			</div>
		);
	}
}

Navbar.propTypes = {
	logoutUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(Navbar);
