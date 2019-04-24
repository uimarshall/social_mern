const express = require("express");
const router = express.Router();

// The 'api routes' will serve json which will be picked by the frontend
// res.json() = res.send()
router.get("/test", (req, res) => {
	res.json({ msg: "Profile rocks" });
});

module.exports = router;
