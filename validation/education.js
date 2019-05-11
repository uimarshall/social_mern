const Validator = require("validator");
const isEmpty = require("./is_empty");
module.exports = function validateEducationInput(data) {
	let errors = {};

	// Change to string if it is null or undefined etc
	data.school = !isEmpty(data.school) ? data.school : "";

	data.degree = !isEmpty(data.degree) ? data.degree : "";
	data.fieldofstudy = !isEmpty(data.fieldofstudy) ? data.fieldofstudy : "";
	data.from = !isEmpty(data.from) ? data.from : "";

	if (Validator.isEmpty(data.school)) {
		errors.school = "school field is required!";
	}
	if (Validator.isEmpty(data.degree)) {
		errors.degree = "Degree field is required!";
	}
	if (Validator.isEmpty(data.fieldofstudy)) {
		errors.fieldofstudy = "FieldOfStudy field is required!";
	}
	if (Validator.isEmpty(data.from)) {
		errors.from = "From date field is required!";
	}

	return {
		errors,
		isValid: isEmpty(errors)
	};
};
