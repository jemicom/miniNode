// post : insert
// get : select *
// get : select 1
// delete : delete
// put : update
const mariadb = require("mariadb");

// svc.sel4.cloudtype.app:30179
// host:port
// host : svc.sel4.cloudtype.app
// port : 30179

const pool = mariadb.createPool({
  host: "127.0.0.1",
  user: "root",
  port: "3307",
  database: "study",
  password: "12345",
  connectionLimit: 5,
});

// 읽어들이지 몰라서 순차처리
const getEmployees = async (req, res) => {
  let conn;
  try {
    conn = await pool.getConnection(); // 번호표를 발급 받음
    const sql = "SELECT * FROM employees";
    const rows = await conn.query(sql);

    res.json(rows);
  } catch (err) {
    console.log(err);
  } finally {
    if (conn) {
      conn.end(); // 번호표 찌기
    }
  }
};

// select * from employees
//-> where emp_no >= "10043";
const getEmployee = async (req, res) => {
  const { emp_no } = req.params;
  // { emp_no : 번호 }

  let conn;
  try {
    conn = await pool.getConnection();
    // const sql = `select * from employees where emp_no = ${emp_no}`;
    // // const sql = `select * from employees where emp_no = 10021`;
    // const rows = await conn.query(sql);
    const sql = `select * from employees where emp_no = ?`;
    const rows = await conn.query(sql, [emp_no]);

    //console.log(rows); // []
    if (rows.length <= 0) {
      res.json({ success: false, message: "data not found" });
    } else {
      res.json({ success: true, message: rows });
    }
  } catch (err) {
    console.group(err);
  } finally {
    if (conn) {
      conn.end();
    }
  }
};

// post : 사원등록 postEmployees
const createEmployee = async (req, res) => {
  const { emp_no, birth_date, first_name, last_name, gender, hire_date } =
    req.body;

  let conn;
  try {
    if (
      !emp_no ||
      !birth_date ||
      !first_name ||
      !last_name ||
      !gender ||
      !hire_date
    ) {
      res.send({ success: false, message: "데이터를 확인할 수 없습니다." });
    } else {
      conn = await pool.getConnection(); // 번호표를 발급 받음

      // const sql = `insert into employees values (
      //     ${emp_no}, "${birth_date}", "${first_name}", "${last_name}", "${gender}", "${hire_date}" )`;
      // const rows = await conn.query(sql);

      const sql = `insert into employees values ( ?, ?, ?, ?, ?, ? )`;
      const rows = await conn.query(sql, [
        emp_no,
        birth_date,
        first_name,
        last_name,
        gender,
        hire_date,
      ]);

      console.log(rows);
      // OkPacket { affectedRows: 1, insertId: 50021n, warningStatus: 0 }

      // 0 이미 false,
      if (rows.affectedRows) {
        let resData = { success: true, message: "정상 등록되었습니다." };
        res.send(resData);
      } else {
        let resData = {
          success: false,
          message: "등록할 수 없는 데이타입니다.",
        };
        res.send(resData);
      }
    }
  } catch (err) {
    console.log(err);
  } finally {
    if (conn) {
      conn.end(); // 번호표 찌기
    }
  }
};

const deleteEmployee = async (req, res) => {
  const { emp_no } = req.body;

  let conn;
  try {
    conn = await pool.getConnection(); // 번호표를 발급 받음

    if (conn) {
      const sql = `delete from employees where emp_no = ?`;
      const rows = await conn.query(sql, [emp_no]);

      console.log(rows);
      // OkPacket { affectedRows: 1, insertId: 0n, warningStatus: 0 }

      if (rows.affectedRows) {
        let resData = { success: true, message: "삭제 되었습니다." };
        res.send(resData);
      } else {
        let resData = {
          success: false,
          message: "삭제 할수 없는 데이타입니다.",
        };
        res.send(resData);
      }
    } else {
      res.send({ success: false, message: "데이터베이스에 오류 발생" });
    }
  } catch (err) {
    console.log(err);
  } finally {
    if (conn) {
      conn.end(); // 번호표 찌기
    }
  }
};

const updateEmployee = async (req, res) => {
  const { emp_no, birth_date, first_name, last_name, gender, hire_date } =
    req.body;

  let conn;
  try {
    conn = await pool.getConnection(); // 번호표를 발급 받음

    // emp_no 해당하는 데이터가 없다면 수정할 수 없다
    // emp_no 있는지 확인
    // select count(*) from employees where emp_no = emp_no;
    // 개수가 있으면 update
    // const findSql = `select * from employees where emp_no = "${emp_no}";`;
    const findSql = `select count(*) as cnt from employees where emp_no = "${emp_no}";`;
    const findRow = await conn.query(findSql);
    const { cnt } = findRow[0];
    console.log("findRow", findRow, parseInt(cnt)); // findRow [ { cnt: 0n } ]
    // 0n =>  숫자로 바꾸려면 parseInt()

    // if (!findRow.affectedRows) {
    if (!cnt) {
      res.send({ success: false, message: "데이터를 찾을 수 없습니다." });
      return false;
    }

    const sql = `update employees set 
                first_name = "${first_name}", last_name = "${last_name}" 
                where emp_no = ${emp_no}`;
    const rows = await conn.query(sql);
    console.log(rows);
    // OkPacket { affectedRows: 1, insertId: 0n, warningStatus: 0 }

    if (rows.affectedRows) {
      let resData = { success: true, message: "수정 완료 되었습니다." };
      res.send(resData);
    } else {
      let resData = { success: false, message: "수정할 수 없습니다." };
      res.send(resData);
    }
  } catch (err) {
    console.log(err);
  } finally {
    if (conn) {
      conn.end(); // 번호표 찌기
    }
  }
};

module.exports = {
  getEmployees,
  getEmployee,
  createEmployee,
  deleteEmployee,
  updateEmployee,
};

// update 수정해보세요.
// register를 제작해보세요.
