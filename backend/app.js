const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database'); // DB 연결모듈

const app = express();

// 1. MongoDB 연결
connectDB();

// 미들웨어 
app.use(cors()); //서로다른 포트 연결
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// localhost:3000/
app.get('/', (req, res) => {
  res.json({ message: 'KFC Coding Backend API' });
});

// 3. API 라우터 설정 - /api/festivals 로 접속시 festivalRoutes 에서 처리
app.use("/api/festivals", require("./routes/festivalRoutes.js"));

// ===== 에러처리 =====
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: '서버 에러가 발생했습니다.' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`서버가 포트 ${PORT}에서 실행 중입니다.`);
});