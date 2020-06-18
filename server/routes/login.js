const express = require("express");
const { loginEmail, loginGoogle } = require("../controllers/authController");

const router = express.Router();

router.post("/login", loginEmail);

router.post("/google", loginGoogle);

module.exports = router;
