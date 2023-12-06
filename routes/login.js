const express = require("express");
const router = express.Router();

const { postLogin, getLogin } = require("../controller/login");

router.get("/", getLogin);
///http://localhost:3000/login
// email, password로 체크
// http://localhost:3000/register
router.post("/", postLogin);

module.exports = router;
