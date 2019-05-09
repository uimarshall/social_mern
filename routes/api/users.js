const express = require("express");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const keys = require("../../config/keys");

const router = express.Router();

// Bring in the User Model
const User = require("../../models/User");

// Import Input Validation
const validateRegInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// The 'api routes' will serve json which will be picked up by the frontend
// res.json() = res.send()
router.get("/test", (req, res) => {
	res.json({ msg: "users rocks" });
});

// User Registration Route
// Check if the email coming in matches what is in the DB
router.post("/register", (req, res) => {
	// Validate everything coming the request body
	const { errors, isValid } = validateRegInput(req.body);
	// Check Validation
	if (!isValid) {
		return res.status(400).json(errors);
	}
	User.findOne({ email: req.body.email }).then(user => {
		if (user) {
			errors.email = "Email already exist";
			return res.status(400).json(errors);
		} else {
			const avatar = gravatar.url(req.body.email, {
				s: "200", //Size
				r: "pg", //Rating
				d: "mm" //Default
			});
			const newUser = new User({
				//create new user
				name: req.body.name,
				email: req.body.email,
				avatar: avatar,
				password: req.body.password
			});

			// Hash Password
			bcrypt.genSalt(10, (err, salt) => {
				bcrypt.hash(newUser.password, salt, (err, hash) => {
					if (err) throw err;
					newUser.password = hash;
					newUser
						.save()
						.then(userCreated => res.json(userCreated))
						.catch(err => console.log(err));
				});
			});
		}
	});
});

// LOGIN User & Return the JWT Token
router.post("/login", (req, res) => {
	// Validate everything coming the request body
	const { errors, isValid } = validateLoginInput(req.body);
	// Check Validation
	if (!isValid) {
		return res.status(400).json(errors);
	}
	const email = req.body.email;
	const password = req.body.password;
	// Find User by Email entered
	// The user found/returned using d email is the user that was created thru register route
	// So all the info the user input during the Regd will be returned and stored in the variable 'userFound'
	User.findOne({ email: email }).then(userFound => {
		// Check for user
		if (!userFound) {
			errors.email = "User not found!";
			res.status(404).json(errors);
		}

		// Check for Password Entered
		bcrypt.compare(password, userFound.password).then(isMatch => {
			// If a user matches send along a token
			if (isMatch) {
				// If password is true, Generate Token here using 'jwt.sign'
				// res.json({ msg: "Sucesss" });
				// Create JWT Payload, payload is the user info we want to pass along wt the token
				// When the token gets to the server it is decoded to know d user who sent it
				const payload = {
					id: userFound._id,
					name: userFound.name,
					avatar: userFound.avatar
				};
				// Sign Token
				// 'jwt.sign' takes in 3 params: payload,secret key & expiration time
				jwt.sign(
					payload,
					keys.secretOrKey,
					{ expiresIn: 3600 },
					(err, token) => {
						if (err) throw err;
						res.json({ success: true, token: "Bearer " + token });
					}
				);
			} else {
				errors.password = "Password incorrect";
				return res.status(400).json(errors);
			}
		});
	});
});

// CURRENT USER route: return current user that has the token using jwt_payload
router.get(
	"/current", // 'jwt' is the Strategy, session:false(bc we won't use session)
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		// res.json({ msg: "Success" });
		res.json({
			id: req.user._id,
			name: req.user.name,
			email: req.user.email
		});
	}
);

module.exports = router;
