const path = require("path");

const clearCookie = (req, res) => {
  const { cookie_id } = req.body;

  res.clearCookie(cookie_id);
  res.send({ success: true, message: "쿠키 삭제" });
};

// page열리면서 쿠키 만들기
const setCookie = (req, res) => {
  let id = "nodejs";
  res.cookie("NID_use", {
    id,
    name: "kim",
    Expires: `${new Date() + 1}`,
    authorized: true,
  });

  res.send({ success: true, message: "쿠키생성" });
};

// page 열기
const getCookie = (req, res) => {
  res.sendFile(path.join(__dirname, "../views/cookies.html"));
};

module.exports = { setCookie, clearCookie, getCookie };
