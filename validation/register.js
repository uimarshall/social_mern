// The 'validator' module only validates 'strings'
const Validator = require("validator");
const isEmpty = require("./is_empty");
module.exports = function validateRegInput(data) {
	let errors = {};
	// Check if data.name is not empty and return the name or
	// Check that it is not null, then validate it using the 'validator'
	data.name = !isEmpty(data.name) ? data.name : "";
	// Validate Email

	data.email = !isEmpty(data.email) ? data.email : "";
	// Validate Password
	data.password = !isEmpty(data.password) ? data.password : "";
	// Validate Confirm password
	data.confirmPassword = !isEmpty(data.confirmPassword)
		? data.confirmPassword
		: "";
	if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
		errors.name = "Name must be between 2 and 50 characters long!";
	}
	if (Validator.isEmpty(data.name)) {
		errors.name = "Name field is required";
	}
	if (Validator.isEmpty(data.email)) {
		errors.email = "Email field is required";
	}
	if (!Validator.isEmail(data.email)) {
		errors.email = "Email is invalid";
	}
	if (Validator.isEmpty(data.password)) {
		errors.password = "Password field is required";
	}
	if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
		errors.password = "Password must be at least 6 characters";
	}
	if (Validator.isEmpty(data.confirmPassword)) {
		errors.confirmPassword = "Confirm Password field is required";
	}
	if (!Validator.equals(data.password, data.confirmPassword)) {
		errors.password = "Passwords must match";
	}

	// If everything passes then it returns empty error, hence is valid
	// Else the error is populated and returned
	return {
		errors: errors,
		isValid: isEmpty(errors)
	};
};
