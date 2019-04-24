const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	// If there is an associated avatar it will show || a placeholder avatar
	avatar: {
		type: String,
		required: true
	},
	date: {
		type: Date,
		default: Date.now
	}
});

const User = mongoose.model("users", UserSchema);
module.exports = User;
