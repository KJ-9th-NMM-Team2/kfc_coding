const express = require('express');
const router = express.Router();

const {
  getAdminLogin,
  authAdminToken,
  createFestival,
  deleateFestival,
  upload,
  editFestival,
} = require("../controllers/adminControllers.js");

// post /api/admin
// Admin 정보 확인
router.route('/login').post(getAdminLogin);

// post /api/admin
// Admin 토큰 검증
router.route('/authToken').post(authAdminToken);

// post /api/admin
// Admin Create Festival
router.route('/createFestival').post(upload, createFestival); // upload 미들웨어를 라우트에 적용

// 축제 삭제
router.route('/deleateFestival').post(deleateFestival);

// 축제 수정
router.route('/editfestivalpage').post(editFestival);

module.exports = router;