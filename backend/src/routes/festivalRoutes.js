const express = require("express");
const router = express.Router();

const {
  getOneFestival,
  getAllFestivals,
  getFiveFestivals,
} = require("../controllers/festivalControllers.js");

// 라우터 미들웨어
// 같은 경로 내 다양한 메서드가 존재할 시, 이를 묶어서 관리할 수 있음

// GET /api/festivals
// 모든 축제 가져오기
router.route("/").get(getAllFestivals);

// GET /api/festivals/top5
// 첫 5개의 축제 가져오기
router.route("/top5").get(getFiveFestivals);

// GET /api/festivals/:id
// id에 해당하는 하나의 축제 가져오기
router.route("/:id").get(getOneFestival);

module.exports = router;
