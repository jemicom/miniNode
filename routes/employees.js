const express = require("express");
const router = express.Router();

const {
  getEmployees,
  getEmployee,
  createEmployee,
  deleteEmployee,
  updateEmployee,
} = require("../controller/employees");

router.get("/", getEmployees);
// select * from employees
//-> where emp_no >= "10043";
router.get("/:emp_no", getEmployee);
router.post("/", createEmployee);
router.delete("/", deleteEmployee);
router.put("/", updateEmployee);

module.exports = router;
