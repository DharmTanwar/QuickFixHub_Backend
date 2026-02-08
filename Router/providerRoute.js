const express = require("express");
const {provider} = require("../Controller/providerController");
const router = express.Router();

router.get("/provider", provider);
module.exports = router;
