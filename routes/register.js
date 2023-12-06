const express = require("express");
const router = express.Router();

const {
  idChecked,
  validateBody,
  getUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser,
} = require("../controller/register");

// get, post, put, delete, param
router.param("id", idChecked);

router.get("/", getUsers);

///http://localhost:3000/register/1/홍길동
// http://localhost:3000/register/5/영희야
// and, or 결과 확인할 필요 있음
// router.get("/:id/:fullname", getUser);
router.get("/:id", getUser);
router.post("/", validateBody, createUser);
// call 처리 2개이상 가능
router.delete("/", deleteUser);
router.put("/", updateUser);

module.exports = router;
