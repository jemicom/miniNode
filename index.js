var express = require("express");
var app = express();

const dotenv = require("dotenv");
dotenv.config();
// console.log(process.env);

const PORT = process.env.PORT;
// .env 만든 PORT 인식

// const PORT = 3500;
const path = require("path");
const cookieParser = require("cookie-parser");

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/cookies", require("./routes/cookies.js"));
app.use("/employees", require("./routes/employees.js"));

// users 데이타베이스를 참고
app.use("/register", require("./routes/register.js"));
app.use("/login", require("./routes/login.js"));

app.get("/", function (req, res) {
  res.send("hello world");
});

app.listen(PORT, () => {
  console.log(" server start on ", PORT);
});
