const express = require("express");
const provider = require("../Controller/providerController");
const router = express.Router();
const authmiddleware = require("../Middleware/authMiddleware");

router.get("/provider", authmiddleware, provider);
module.exports = router;
