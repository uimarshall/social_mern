const Validator = require("validator");
const isEmpty = require("./is_empty");
module.exports = function validateProfileInput(data) {
	let errors = {};
	/*'isEmpty' checks for null, undefined etc If a user does not fill a form field, 
	it is going to come as null or undefined. 
	So what this code does is to make it return a str instead of null so that 
	d validator(which accepts only str) can work on it*/

	data.handle = !isEmpty(data.handle) ? data.handle : "";
	// Validate status is not Empty
	data.status = !isEmpty(data.status) ? data.status : "";
	// Validate skills is not Empty
	data.skills = !isEmpty(data.skills) ? data.skills : "";

	// Check if there is error as a result of not filling the form
	if (!Validator.isLength(data.handle, { min: 2, max: 40 })) {
		errors.handle = "Handle needs to be between 2 and 40 characters";
	}

	if (Validator.isEmpty(data.handle)) {
		errors.handle = "Profile handle field is required";
	}
	if (Validator.isEmpty(data.status)) {
		errors.status = "Status field is required";
	}
	if (Validator.isEmpty(data.skills)) {
		errors.skills = "Skills field is required";
	}
	if (!isEmpty(data.website)) {
		if (!Validator.isURL(data.website)) {
			errors.website = "Not a valid URL";
		}
	}
	if (!isEmpty(data.youtube)) {
		if (!Validator.isURL(data.youtube)) {
			errors.youtube = "Not a valid URL";
		}
	}
	if (!isEmpty(data.twitter)) {
		if (!Validator.isURL(data.twitter)) {
			errors.twitter = "Not a valid URL";
		}
	}
	if (!isEmpty(data.linkedin)) {
		if (!Validator.isURL(data.linkedin)) {
			errors.linkedin = "Not a valid URL";
		}
	}
	if (!isEmpty(data.instagram)) {
		if (!Validator.isURL(data.instagram)) {
			errors.instagram = "Not a valid URL";
		}
	}

	return {
		errors,
		// It is valid if the errors are empty
		isValid: isEmpty(errors)
	};
};
