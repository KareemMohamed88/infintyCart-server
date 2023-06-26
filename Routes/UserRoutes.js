const express = require("express");
const { registertion, login } = require("../services/UserServices");

const router = express.Router();

router.route("/register").post(registertion)
router.route("/login").post(login)
module.exports = router;
