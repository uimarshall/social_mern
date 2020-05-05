import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
// import axios from "axios";

import { registerUser } from "../../actions/authActions";
import TextFieldGroup from "../commons/TextFieldGroup";

class Register extends Component {
	state = {
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
		errors: {},
	};

	componentDidMount() {
		if (this.props.auth.isAuthenticated) {
			this.props.history.push("/dashboard");
		}
	}
	// This runs when comp receives new property(props)
	componentWillReceiveProps(nextProps) {
		if (nextProps.errors) {
			this.setState({ errors: nextProps.errors });
		}
	}

	handleChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	handleSubmit = (e) => {
		e.preventDefault();

		const newUser = {
			name: this.state.name,
			email: this.state.email,
			password: this.state.password,
			confirmPassword: this.state.confirmPassword,
		};
		// axios
		// 	.post("/api/users/register", newUser)
		// 	.then(res => console.log(res.data))
		// 	.catch(err => this.setState({ errors: err.response.data }));

		// Dispatch 'registerUser' action
		// 'this.props.history' will help to redirect from within the 'registerUser' actn
		this.props.registerUser(newUser, this.props.history);
	};

	render() {
		// Pull errors out of this.state
		const { errors } = this.state;

		return (
			<div className="register mb-5">
				<div className="container">
					<div className="row">
						<div className="col-md-8 m-auto">
							<h1 className="display-4 text-center">Sign Up</h1>
							<p className="lead text-center">Create your DevHub account</p>
							<form noValidate onSubmit={this.handleSubmit}>
								<TextFieldGroup
									placeholder="Name"
									name="name"
									value={this.state.name}
									onChange={this.handleChange}
									error={errors.name}
								/>
								<TextFieldGroup
									placeholder="Email"
									name="email"
									type="email"
									value={this.state.email}
									onChange={this.handleChange}
									error={errors.email}
									info="This site uses Gravatar so if you want a profile image, use a Gravatar email"
								/>
								<TextFieldGroup
									placeholder="Password"
									name="password"
									type="password"
									value={this.state.password}
									onChange={this.handleChange}
									error={errors.password}
								/>
								<TextFieldGroup
									placeholder="Confirm Password"
									name="confirmPassword"
									type="password"
									value={this.state.confirmPassword}
									onChange={this.handleChange}
									error={errors.confirmPassword}
								/>
								<input type="submit" className="btn btn-info btn-block mt-4" />
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

Register.propTypes = {
	registerUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	errors: state.errors,
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
