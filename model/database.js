const mariadb = require("mariadb");
const dotenv = require("dotenv");
dotenv.config();

// svc.sel4.cloudtype.app:30179
// host:port
// host : svc.sel4.cloudtype.app
// port : 30179

// 배포 모드일때 아래 코드는 배포에서 감춰져야 하는 코드
// npm i dotenv
const connection = () => {
  const pool = mariadb.createPool({
    // host: "svc.sel4.cloudtype.app",
    // user: "root",
    // port: "30179",
    // database: "testdb",
    // password: "12345",
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    password: process.env.DB_PWD,
    connectionLimit: 5,
  });

  if (pool) {
    console.log("successed data access");
  } else {
    console.log("error data not access");
  }

  return pool;
};

module.exports = connection;

// docker
// aws
// git actions
// git pakages
