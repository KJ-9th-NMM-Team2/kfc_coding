const express = require('express');
const router = express.Router();

const {
  getAdminLogin,
  authAdminToken,
  createFestival,
} = require("../controllers/adminControllers.js");

// post /api/admin
// Admin 정보 확인
router.route('/login').post(getAdminLogin);

// post /api/admin
// Admin 토큰 검증
router.route('/authToken').post(authAdminToken);

// post /api/admin
// Admin Create Festival
router.route('/createFestival').post(createFestival);

module.exports = router;