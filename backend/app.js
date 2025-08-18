const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database'); // database.js 임포트

const app = express();

// MongoDB 연결
connectDB();

// 미들웨어 설정
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 기본 라우트
app.get('/', (req, res) => {
  res.json({ message: 'KFC Coding Backend API' });
});

// API 라우트 (나중에 추가할 예정)
// app.use('/api/users', require('./routes/users'));
// app.use('/api/posts', require('./routes/posts'));

// 에러 핸들링 미들웨어
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: '서버 에러가 발생했습니다.' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`서버가 포트 ${PORT}에서 실행 중입니다.`);
});
