var express = require('express');
var router = express.Router();
var judge = require("../control/judge");


router.post('/register', judge.register);
router.post("/login",judge.login)

module.exports = router;
