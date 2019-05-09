const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const users = require("./routes/api/users");
const posts = require("./routes/api/posts");
const profile = require("./routes/api/profile");

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Db Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
	.connect(db)
	.then(() => {
		console.log("MongoDb connection is successful");
	})
	.catch(err => {
		console.log(err);
	});
// Passport Middleware
app.use(passport.initialize());
// Passport Config
require("./config/passport")(passport);

// Routes Middleware
app.use("/api/users", users);
app.use("/api/posts", posts);
app.use("/api/profile", profile);

const port = process.env.port || 5000;
app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
