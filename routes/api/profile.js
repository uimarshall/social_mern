const express = require("express");
const router = express.Router();
const passport = require("passport");
const mongoose = require("mongoose");

// Load Validation
const validateProfileInput = require("../../validation/profile");
const validateExperienceInput = require("../../validation/experience");
const validateEducationInput = require("../../validation/education");

// Import Profile/User Model
const Profile = require("../../models/Profile");
const User = require("../../models/User");

// The 'api routes' will serve json which will be picked by the frontend
// res.json() = res.send()
router.get("/test", (req, res) => {
	res.json({ msg: "Profile rocks" });
});

// GET current users profile
// Route: api/profile
router.get(
	"/",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		const errors = {};
		// The 'user' here is what we hv in the 'Profile' model
		Profile.findOne({ user: req.user.id })
			.populate("user", ["name", "avatar"])
			.then(profile => {
				if (!profile) {
					errors.noprofile = "There is no profile for this user";
					return res.status(404).json(errors);
				}
				// Send along profile if found
				res.json(profile);
			})
			.catch(err => res.status(404).json(err));
	}
);

// GET all Profile
// Route: api/profile/all
router.get("/all", (req, res) => {
	const errors = {};
	Profile.find()
		.populate("user", ["name", "avatar"])
		.then(profiles => {
			if (!profiles) {
				errors.noprofile = "There are no profiles";
				res.status(400).json(errors);
			}
			res.json(profiles);
		})
		.catch(err => res.status(400).json({ profile: "There are no profiles" }));
});

// GET Profile by handle
// Route: api/profile/handle/:handle
router.get("/handle/:handle", (req, res) => {
	const errors = {};
	Profile.findOne({ handle: req.params.handle })
		.populate("user", ["name", "avatar"])
		.then(profile => {
			if (!profile) {
				errors.noprofile = "There is no profile for this user";
				res.status(400).json(errors);
			}
			res.json(profile);
		})
		.catch(err => res.status(400).json(err));
});

// GET Profile by usere_id
// Route: api/profile/user/:user_id
router.get("/user/:user_id", (req, res) => {
	const errors = {};
	Profile.findOne({ user: req.params.user_id })
		.populate("user", ["name", "avatar"])
		.then(profile => {
			if (!profile) {
				errors.noprofile = "There is no profile for this user";
				res.status(400).json(errors);
			}
			res.json(profile);
		})
		.catch(err =>
			res.status(400).json({ profile: "There is no profile for this user" })
		);
});

// POST Create users/Edit profile
// Route: api/profile
router.post(
	"/",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		const { errors, isValid } = validateProfileInput(req.body);
		// Check Validation
		if (!isValid) {
			// Return any errors with 400 status if not valid
			return res.status(400).json(errors);
		}
		// Get fields
		const profileFields = {};
		profileFields.user = req.user.id;
		if (req.body.handle) profileFields.handle = req.body.handle;
		if (req.body.company) profileFields.company = req.body.company;
		if (req.body.website) profileFields.website = req.body.website;
		if (req.body.location) profileFields.location = req.body.location;
		if (req.body.bio) profileFields.bio = req.body.bio;
		if (req.body.status) profileFields.status = req.body.status;
		if (req.body.githubusername)
			profileFields.githubusername = req.body.githubusername;
		// Skills - Split into array
		if (typeof req.body.skills !== "undefined") {
			profileFields.skills = req.body.skills.split(",");
		}
		// Social
		profileFields.social = {};
		if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
		if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
		if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
		if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
		if (req.body.instagram) profileFields.social.instagram = req.body.instagram;
		// Find a user by user_id
		Profile.findOne({ user: req.user.id }).then(profile => {
			if (profile) {
				// Update
				Profile.findOneAndUpdate(
					{ user: req.user.id },
					{ $set: profileFields },
					{ new: true }
				).then(profile => res.json(profile));
			} else {
				// Create
				// Check if handle exist
				Profile.findOne({ handle: profileFields.handle }).then(profile => {
					if (profile) {
						errors.handle = "That handle already exists";
						res.status(400).json(errors);
					}
					// Save Profile
					new Profile(profileFields).save().then(profile => res.json(profile));
				});
			}
		});
	}
);

// POST Create/Add experience to profile
// Route: api/profile/experience
// Access: Protected route
router.post(
	"/experience",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		const { errors, isValid } = validateExperienceInput(req.body);
		// Check Validation
		if (!isValid) {
			// Return any errors with 400 status if not valid
			return res.status(400).json(errors);
		}
		// Find the login user
		Profile.findOne({ user: req.user.id }).then(profile => {
			const newExp = {
				title: req.body.title,
				company: req.body.company,
				location: req.body.location,
				from: req.body.from,
				to: req.body.to,
				current: req.body.current,
				description: req.body.description
			};
			// Add to Experience Array in the beggining
			profile.experience.unshift(newExp);
			profile.save().then(profile => res.json(profile));
		});
	}
);

// POST Create/Add education to profile
// Route: api/profile/education
// Access: Protected route
router.post(
	"/education",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		const { errors, isValid } = validateEducationInput(req.body);
		// Check Validation
		if (!isValid) {
			// Return any errors with 400 status if not valid
			return res.status(400).json(errors);
		}
		// Find the login user
		Profile.findOne({ user: req.user.id }).then(profile => {
			const newEdu = {
				school: req.body.school,
				degree: req.body.degree,
				fieldofstudy: req.body.fieldofstudy,
				from: req.body.from,
				to: req.body.to,
				current: req.body.current,
				description: req.body.description
			};
			// Add to Experience Array in the beggining
			profile.education.unshift(newEdu);
			profile.save().then(profile => res.json(profile));
		});
	}
);

// ==============================================================================

// DELETE Delete a particular experience from profile
// Route: api/profile/experience/:exp_id
// Access: Protected route
router.delete(
	"/experience/:exp_id",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		// Find the login user
		Profile.findOne({ user: req.user.id })
			.then(profile => {
				// Get remove Index
				const indexToBeRemoved = profile.experience
					// A new array containing item IDs is returned after 'map'
					// We then find the index of any id passed in route params and remove it
					.map(item => item.id)
					.indexOf(req.params.exp_id);
				// Splice out of array
				profile.experience.splice(indexToBeRemoved, 1);
				profile.save().then(profile => res.json(profile));
			})
			.catch(err => res.status(404).json(err));
	}
);

// ============================================================================================

// DELETE Delete a particular education from profile
// Route: api/profile/experience/:edu_id
// Access: Protected route
router.delete(
	"/education/:edu_id",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		// Find the login user
		Profile.findOne({ user: req.user.id })
			.then(profile => {
				// Get remove Index
				const indexToBeRemoved = profile.education
					// A new array containing item IDs is returned after 'map'
					// We then find the index of any id passed in route params and remove it
					.map(item => item.id)
					.indexOf(req.params.edu_id);
				// Splice out of array
				profile.education.splice(indexToBeRemoved, 1);
				profile.save().then(profile => res.json(profile));
			})
			.catch(err => res.status(404).json(err));
	}
);

// DELETE Delete user and profile
// Route: api/profile
// Access: Protected route
router.delete(
	"/",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		// Find the login user
		Profile.findOneAndRemove({ user: req.user.id }).then(() => {
			User.findOneAndRemove({ _id: req.user.id }).then(() =>
				res.json({ success: true })
			);
		});
	}
);

module.exports = router;
