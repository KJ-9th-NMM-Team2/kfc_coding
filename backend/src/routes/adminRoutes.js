const express = require('express');
const router = express.Router();

const {
  getAdminLogin,
  authAdminToken,
} = require("../controllers/adminControllers.js");

// post /api/admin
// admin 정보 확인
router.route('/login').post(getAdminLogin);

// post /api/admin
// admin 토큰 검증
router.route('/authToken').post(authAdminToken);

module.exports = router;