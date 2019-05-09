// This is done to handle null, undefined etc bcos validator module only validates strings
function isEmpty(value) {
	return (
		value === undefined ||
		value === null ||
		(typeof value === "object" && Object.keys(value).length === 0) ||
		(typeof value === "string" && value.trim().length === 0)
	);
}

module.exports = isEmpty;
