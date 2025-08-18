// server/index.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const dbConnect = require("./config/dbConnect.js");

// MongoDB 데이터베이스에 연결
dbConnect();

/* 미들웨어 */
// 프론트엔드 쪽 요청 처리에 필요
app.use(cors());
// 요청받은 json 데이터 파싱에 필요
// e.g., form으로 전달받은 데이터
app.use(express.urlencoded({ extended: true }));
// e.g., json으로 전달받은 데이터
app.use(express.json());
// /api/festivals 경로의 요청 처리하는 라우터 미들웨어
app.use("/api/festivals", require("./routes/festivalRoutes.js"));

// 3000번 포트에서 서버 실행.
app.listen(3000, () => console.log("서버 실행 중"));
