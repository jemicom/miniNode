// 모듈 만들어 두고 계속 사용하기
const fs = require("fs");
const fsPromise = fs.promises;
const { format } = require("date-fns");
const { v4: uuidv4 } = require("uuid"); // npm i uuid

const logEvents = async (message) => {
  const today = new Date();
  const date = format(today, "yy-MM-dd\tHH:mm:ss");
  const log = `\n ${date} \t ${uuidv4()} \t ${message} `;

  try {
    if (!fs.existsSync("./log")) {
      await fsPromise.mkdir("./log");
    }

    await fsPromise.appendFile("./log/eventLog.txt", log);
  } catch (err) {
    console.log(err);
  }
};

//logEvents("전달되는 메시지");
// 전달되는 메시지가 동일하면 구분하기 힘듬

// for (let a = 0; a < 10; a++) {
//   const num = Math.random(); // 구분인자
//   logEvents(num);
// }

module.exports = logEvents;

// 맥 : zsh => bash
// $ %
// 현재 폴더만 표시 => 상위 폴더 표시 되게 바꿀수
// 리눅스 : 모든 수업에서 모두 가르치진 않음
// 서버 끄기 : ctrl + c 나 ctrl + d
