const express = require("express");
const router = express.Router();
const packages = require("../data/packages");

router.get("/", (req, res) => {
  res.json(packages);
});

module.exports = router;