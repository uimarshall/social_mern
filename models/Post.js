const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const PostSchema = new Schema({
	// user_id(FK)
	user: {
		type: Schema.Types.ObjectId,
		ref: "users"
	},
	text: {
		type: String,
		required: true
	},
	name: {
		type: String
	},
	avatar: {
		type: String
	},
	// The 'likes' should be linked to a user
	likes: [
		{
			user: {
				type: Schema.Types.ObjectId,
				ref: "users"
			}
		}
	],
	// The comments should be linked to a user
	comments: [
		{
			user: {
				type: Schema.Types.ObjectId,
				ref: "users"
			},
			text: {
				type: String,
				required: true
			},
			name: {
				type: String
			},
			avatar: {
				type: String
			}
		}
	],
	date: {
		type: Date,
		default: Date.now
	}
});
const Post = mongoose.model("post", PostSchema);
module.exports = Post;
