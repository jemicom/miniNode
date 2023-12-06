const connection = require("../model/database");
const pool = connection();

const idChecked = (req, res, next, value) => {
  console.log("id : ", value);

  if (value === undefined) {
    // 미들웨어 만들기, 현재 무조건 파라미터가 없는 경우 getUsers
    // 처리 안됨 => getUser
    // id 숫자, 0 false, 0이아닌 숫자 true
    res.status(400).send({
      success: false,
      status: "실패",
      message: "데이터를 넘겨 주세요.",
    });
  }
  next();
};

const getUsers = async (req, res) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const sql = `select * from users`;
    const rows = await conn.query(sql);

    if (rows.length) {
      res.status(200).json({ success: true, status: "성공", data: rows });
    } else {
      res
        .status(400)
        .json({ success: false, status: "실패", data: "not found" });
    }
  } catch (err) {
    console.log(err);
  } finally {
    if (conn) {
      conn.end();
    }
  }
};

const getUser = async (req, res) => {
  // const id = req.params.id;
  const { id, fullname } = req.params;

  let conn;
  try {
    conn = await pool.getConnection();
    const sql = `select * from users 
                   where id = ${id} or fullname = "${fullname}"`;
    const rows = await conn.query(sql);

    if (rows.length) {
      res.status(200).json({ success: true, status: "성공", data: rows });
    } else {
      res
        .status(400)
        .json({ success: false, status: "실패", data: "not found" });
    }
  } catch (err) {
    console.log(err);
  } finally {
    if (conn) {
      conn.end();
    }
  }
};

const validateBody = (req, res, next) => {
  const { fullname, email, password } = req.body;
  if (!fullname || !email || !password) {
    return res.status(400).json({
      success: false,
      status: "실패",
      message: "공백인 데이터로 등록 불가",
    });
  }
  next();
};

const createUser = async (req, res) => {
  const { fullname, email, password } = req.body;
  console.log(req.body);

  let conn;
  try {
    conn = await pool.getConnection();
    const sql = `insert into users(fullname, email, password) 
                    values(?,?,?)`;
    const rows = await conn.query(sql, [fullname, email, password]);
    console.log(rows);

    if (rows.affectedRows) {
      const newUser = { fullname, email, password };
      res.status(200).json({ success: true, status: "성공", data: newUser });
    } else {
      res
        .status(400)
        .json({ success: false, status: "실패", data: "not found" });
    }
  } catch (err) {
    console.log(err);
  } finally {
    if (conn) {
      conn.end();
    }
  }
};

const deleteUser = async (req, res) => {
  const { id, fullname, email, password } = req.body;
  console.log(req.body);

  let conn;
  try {
    conn = await pool.getConnection();
    const sql = `delete from users  
                where id=${id} and
                fullname="${fullname}" and
                email="${email}"`;
    const rows = await conn.query(sql);
    console.log(rows);

    if (rows.affectedRows) {
      res.status(200).json({ success: true, status: "성공", data: "deleted" });
    } else {
      res
        .status(400)
        .json({ success: false, status: "실패", data: "not deleted" });
    }
  } catch (err) {
    console.log(err);
  } finally {
    if (conn) {
      conn.end();
    }
  }
};

const updateUser = async (req, res) => {
  const { id, fullname, email, password } = req.body;
  console.log(req.body);

  let conn;
  try {
    conn = await pool.getConnection();
    const sql = `update users set fullname="${fullname}",
                  email="${email}",
                  password="${password}"
                  where id=${id};`;
    const rows = await conn.query(sql);
    console.log(rows);

    if (rows.affectedRows) {
      res.status(200).json({ success: true, status: "성공", data: "updated" });
    } else {
      res
        .status(400)
        .json({ success: false, status: "실패", data: "not updated" });
    }
  } catch (err) {
    console.log(err);
  } finally {
    if (conn) {
      conn.end();
    }
  }
};

module.exports = {
  idChecked,
  validateBody,
  getUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser,
};
