const express = require("express");
const { loginEmail, loginGoogle } = require("../controllers/usuarioController");

const router = express.Router();

router.post("/login", loginEmail);

router.post("/google", loginGoogle);

module.exports = router;
