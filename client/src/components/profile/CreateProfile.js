import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import TextFieldGroup from "../commons/TextFieldGroup";
import TextAreaGroup from "../commons/TextAreaGroup";
import InputGroup from "../commons/InputGroup";
import SelectListGroup from "../commons/SelectListGroup";

class CreateProfile extends Component {
	state = {
		displaySocialMediaHandles: false,
		handle: "",
		company: "",
		website: "",
		location: "",
		status: "",
		skills: "",
		githubusername: "",
		bio: "",
		twitter: "",
		facebook: "",
		linkedin: "",
		instagram: "",
		errors: {},
	};

	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value,
		});
	};

	handleSubmit = (e) => {
		e.preventDefault();
		console.log("submit");
	};

	render() {
		const { errors, displaySocialMediaHandles } = this.state;
		let socialInputs;
		if (displaySocialMediaHandles) {
			socialInputs = (
				<div>
					<InputGroup
						placeholder="Twitter Profile URL"
						name="twitter"
						icon="fab fa-twitter"
						value={this.state.twitter}
						error={errors.twitter}
						onChange={this.handleChange}
					/>
					<InputGroup
						placeholder="Facebook Page URL"
						name="facebook"
						icon="fab fa-facebook"
						value={this.state.facebook}
						error={errors.facebook}
						linkedin
						onChange={this.handleChange}
					/>
					<InputGroup
						placeholder="LinkedIn Profile URL"
						name="linkedin"
						icon="fab fa-linkedin"
						value={this.state.linkedin}
						error={errors.linkedin}
						onChange={this.handleChange}
					/>
					<InputGroup
						placeholder="Youtube Channel URL"
						name="youtube"
						icon="fab fa-youtube"
						value={this.state.youtube}
						error={errors.youtube}
						onChange={this.handleChange}
					/>
					<InputGroup
						placeholder="Instagram Page URL"
						name="instagram"
						icon="fab fa-instagram"
						value={this.state.instagram}
						error={errors.instagram}
						onChange={this.handleChange}
					/>
				</div>
			);
		}
		const options = [
			{ label: "* Select Professional Status", value: 0 },
			{ label: "Developer", value: "Developer" },
			{ label: "Junior Developer", value: "Junior Developer" },
			{ label: "Senior Developer", value: "Senior Developer" },
			{ label: "Manager", value: "Manager" },
			{ label: "Intermediate Developer", value: "Intermediate Developer" },
			{ label: "Student or Learning", value: "Student or Learning" },
			{ label: "Instructor or Teacher", value: "Instructor or Teacher" },
			{ label: "Intern", value: "Intern" },
			{ label: "Others", value: "Others" },
		];
		return (
			<div className="create-profile mb-5">
				<div className="container">
					<div className="row">
						<div className="col-md-8 m-auto">
							<h1 className="display-4 text-center">Create Your Profile</h1>
							<p className="lead text-center">
								Giving this information will make your profile stand out
							</p>
							<small className="d-block pb-3 text-danger">
								* = required fields
							</small>
							<form onSubmit={this.handleSubmit} className="mb-5">
								<TextFieldGroup
									placeholder="* Profile Handle"
									name="handle"
									value={this.state.handle}
									error={errors.handle}
									onChange={this.handleChange}
									info="A unique handle for your profile URL. Your full name, company name,nickname"
								/>
								<SelectListGroup
									placeholder="Status"
									name="status"
									value={this.state.status}
									error={errors.status}
									options={options}
									onChange={this.handleChange}
									info="Give us an idea of your career journey so far!"
								/>
								<TextFieldGroup
									placeholder="Company"
									name="company"
									value={this.state.company}
									error={errors.company}
									onChange={this.handleChange}
									info="Could be your company or the one you work for"
								/>
								<TextFieldGroup
									placeholder="Website"
									name="website"
									value={this.state.website}
									error={errors.website}
									onChange={this.handleChange}
									info="Could be your website or a company one"
								/>
								<TextFieldGroup
									placeholder="Location"
									name="location"
									value={this.state.location}
									error={errors.location}
									onChange={this.handleChange}
									info="City or city & state suggested (LA, Texas)"
								/>
								<TextFieldGroup
									placeholder="* Skills"
									name="skills"
									value={this.state.skills}
									error={errors.skills}
									onChange={this.handleChange}
									info="Please use comma separated values (eg. HTML, CSS, JavaScript, PHP)"
								/>
								<TextFieldGroup
									placeholder="Github Username"
									name="githubusername"
									value={this.state.githubusername}
									error={errors.githubusername}
									onChange={this.handleChange}
									info="If you want your latest repos and a Github link, include your username"
								/>
								<TextAreaGroup
									placeholder="Short Bio"
									name="bio"
									value={this.state.bio}
									error={errors.bio}
									onChange={this.handleChange}
									info="Tell us a little about you!"
								/>
								<div className="mb-3">
									<button
										onClick={() => {
											this.setState((prevState) => ({
												displaySocialMediaHandles: !prevState.displaySocialMediaHandles,
											}));
										}}
										className="btn btn-light">
										Add Social Network Links
									</button>
									<span className="text-muted">Optional</span>
								</div>
								{socialInputs}
								<input
									type="submit"
									value="Submit"
									className="btn btn-info btn-block mt-4"
								/>
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

CreateProfile.propTypes = {
	registerUser: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	profile: state.profile,
	errors: state.errors,
});

export default connect(mapStateToProps)(CreateProfile);
