const express = require("express");
const { register, login, authenticate } = require("../controllers/auth.controller");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);

module.exports = router;