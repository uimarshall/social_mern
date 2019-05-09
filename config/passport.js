const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
// This is to Extract the User that comes from the payload/token
const User = mongoose.model("users");
const keys = require("../config/keys");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = passport => {
	passport.use(
		new JwtStrategy(opts, (jwt_payload, done) => {
			// console.log(jwt_payload);
			// Get The User being sent in the Token & attached it to the 'req' obj in the /current route
			User.findById(jwt_payload.id)
				.then(user => {
					if (user) {
						return done(null, user);
					}
					// If no user is found return false
					return done(null, false);
				})
				.catch(err => {
					console.log(err);
				});
		})
	);
};
