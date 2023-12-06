const connection = require("../model/database");
const pool = connection();

const postLogin = async (req, res) => {
  const { password, email } = req.body;
  let conn;
  try {
    conn = await pool.getConnection();
    // const sql = `select count(*) as cnt from users
    //                 where email="${email}" and password="${password}";`;
    // const rows = await conn.query(sql);
    const sql = `select count(*) as cnt, fullname  from users 
                    where email=? and password= ?;`;
    const rows = await conn.query(sql, [email, password]);
    console.log(rows);
    //rows = [ { cnt: 1n, fullname: '홍길동' } ]

    if (rows[0].cnt) {
      res.send({ success: true, status: "성공", data: rows[0].fullname });
    } else {
      res.send({
        success: false,
        status: "실패",
        data: "email or password checked",
      });
    }
  } catch (err) {
    console.log(err);
  } finally {
    if (conn) {
      conn.end();
    }
  }
};

const path = require("path");
const getLogin = (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "login.html"));
};

module.exports = {
  postLogin,
  getLogin,
};
