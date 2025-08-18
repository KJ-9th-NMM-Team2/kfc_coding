// config/dbConnect.js
// mongoose: express에서 mongodb 사용할 수 있게 해줌
// dotenv: .env, 중 환경변수 관리용
const mongoose = require("mongoose");
require("dotenv").config();

// async: 비동기 처리
const dbConnect = async () => {
  try {
    console.log(process.env.DB_CONNECT);
    // .env 파일에 DB_CONNECT 변수에 주소가 작성되어 있어야 함
    // await: 일단 DB에 접속 완료 후, DB Connected가 뜨게끔 처리
    const connect = await mongoose.connect(process.env.DB_CONNECT);
    console.log("DB Connected");
  } catch (err) {
    console.log(err);
  }
};

module.exports = dbConnect;
