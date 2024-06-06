const { WS_URL } = require("../../config/index");
const express = require("express");

const router = express.Router();

router.get("/ws-url", (req, res) => {
	res.json({ wsUrl: WS_URL });
});

module.exports = router;
