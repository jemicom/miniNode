const express = require("express");
const router = express.Router();
const { setCookie, clearCookie, getCookie } = require("../controller/cookies");

// localhost:3000/cookie
router.get("/", getCookie);

// localhost:3000/cookie/setCookie
// localhost:3000/cookie/clearCookie
router.get("/setCookie", setCookie);
router.post("/clearCookie", clearCookie);

module.exports = router;
