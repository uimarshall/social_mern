const express = require("express");
const router = express.Router();
const passport = require("passport");
const mongoose = require("mongoose");

const Post = require("../../models/Post");
const Profile = require("../../models/Profile");
// Load Validation
const validatePostInput = require("../../validation/post");

// The 'api routes' will serve json which will be picked by the frontend
// res.json() = res.send()
router.get("/test", (req, res) => {
	res.json({ msg: "Posts rocks" });
});

// GET all Posts
// Route: api/post
// Access: Not Protected route
router.get("/", (req, res) => {
	Post.find()
		.sort({ date: -1 })
		.then(post => res.json(post))
		// Return empty list
		.catch(err => res.status(404).json({ nopost: "No posts found!" }));
});

// =================================================================================
// GET a particular Post
// Route: api/post/:id
// Access: Not Protected route
router.get("/:id", (req, res) => {
	Post.findById(req.params.id)
		.then(post => res.json(post))
		.catch(err =>
			res.status(404).json({ nopost: "No post found for this user" })
		);
});

// ===================================================================================

// POST Create Posts
// Route: api/post
// Access: Protected route
router.post(
	"/",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		const { errors, isValid } = validatePostInput(req.body);
		// Check Validation
		if (!isValid) {
			// Return any errors with 400 status if not valid
			return res.status(400).json(errors);
		}
		const newPost = new Post({
			text: req.body.text,
			name: req.body.name,
			avatar: req.body.avatar,
			user: req.user.id
		});
		newPost.save().then(post => res.json(post));
	}
);
// ===============================================================================

// DELETE a Posts if you are the owner
// Route: api/post/:id
// Access: Protected route
router.delete(
	"/:id",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		// Find the current login user
		Profile.findOne({ user: req.user.id }).then(profile => {
			Post.findById(req.params.id)
				.then(post => {
					// Check for post owner
					if (post.user.toString() !== req.user.id) {
						return res
							.status(401)
							.json({ notauthorized: "User not authorized" });
					}
					// Else Delete
					post.remove().then(() => res.json({ success: true }));
				})
				.catch(err => res.status(404).json({ nopostfound: "No post found!" }));
		});
	}
);
// ====================================================================================

// POST: Like a particular post
// Route: api/post/like/:id
// Access: Protected route
router.post(
	"/like/:id",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		// Find the current login user
		Profile.findOne({ user: req.user.id }).then(profile => {
			Post.findById(req.params.id)
				.then(post => {
					// Check if user already like the post
					if (
						post.likes.filter(like => like.user.toString() === req.user.id)
							.length > 0
					) {
						return res
							.status(400)
							.json({ alreadyliked: "User already liked this post" });
					}
					// Add user id to likes array
					post.likes.unshift({ user: req.user.id });
					post.save().then(post => res.json(post));
				})
				.catch(err => res.status(404).json({ nopostfound: "No post found!" }));
		});
	}
);
// ======================================================================================

// POST: UnLike a particular post
// Route: api/post/unlike/:id
// Access: Protected route
router.post(
	"/unlike/:id",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		// Find the current login user
		Profile.findOne({ user: req.user.id }).then(profile => {
			Post.findById(req.params.id)
				.then(post => {
					// Check if user have not yet like the post
					if (
						post.likes.filter(like => like.user.toString() === req.user.id)
							.length === 0
					) {
						return res
							.status(400)
							.json({ notliked: "You have not yet liked this post" });
					}
					// Get Index to be removed
					const indexToBeRemoved = post.likes
						.map(item => item.user.toString())
						.indexOf(req.user.id);

					// Spilce out of array
					post.likes.splice(indexToBeRemoved, 1);
					post.save().then(post => res.json(post));
				})
				.catch(err => res.status(404).json({ nopostfound: "No post found!" }));
		});
	}
);

// ====================================================================================
// POST: Add comments to a particular post(post_id)
// Route: api/post/comment/:id
// Access: Protected route
router.post(
	"/comment/:id",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		const { errors, isValid } = validatePostInput(req.body);
		// Check Validation
		if (!isValid) {
			// Return any errors with 400 status if not valid
			return res.status(400).json(errors);
		}
		// Find a particular post and add comments to it
		Post.findById(req.params.id)
			.then(post => {
				const newComment = {
					text: req.body.text,
					name: req.body.name,
					avatar: req.body.avatar,
					user: req.user.id
				};

				// Add to comments array
				post.comments.unshift(newComment);
				// Save to db
				post.save().then(post => res.json(post));
			})
			.catch(err => res.status(404).json({ nopostfound: "No post found!" }));
	}
);

// ====================================================================================
// POST: Delete a particular comment from a particular post(post_id)
// Route: api/post/comment/:id/comment_id
// Access: Protected route
router.delete(
	"/comment/:id/:comment_id",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		// Find a particular post and delete comments from it
		Post.findById(req.params.id)
			.then(post => {
				// Check to see if comment exists
				if (
					post.comments.filter(
						comment => comment._id.toString() === req.params.comment_id
					).length === 0
				) {
					return res
						.status(404)
						.json({ commentnotexists: "Comment does not exist" });
				}
				// Get Index to be removed
				const indexToBeRemoved = post.comments
					.map(item => item._id.toString())
					.indexOf(req.params.comment_id);

				// Spilce out of array
				post.comments.splice(indexToBeRemoved, 1);
				post.save().then(post => res.json(post));
			})
			.catch(err => res.status(404).json({ nopostfound: "No post found!" }));
	}
);

module.exports = router;
