const express = require("express");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const router = express.Router();

// Bring in the User Model
const User = require("../../models/User");

// The 'api routes' will serve json which will be picked up by the frontend
// res.json() = res.send()
router.get("/test", (req, res) => {
	res.json({ msg: "users rocks" });
});

// User Registration Route
// Check if the email coming in matches what is in the DB
router.post("/register", (req, res) => {
	User.findOne({ email: req.body.email }).then(user => {
		if (user) {
			return res.status(400).json({ email: "Email already exist" });
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

module.exports = router;
