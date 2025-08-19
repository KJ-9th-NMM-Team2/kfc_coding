const asyncHandler = require("express-async-handler");
const Festival = require("../models/Festival.js");

// GET /api/festivals
// 모든 축제 가져오기
const getAllFestivals = asyncHandler(async (req, res) => {
  const festivals = await Festival.find();

  if (!festivals || festivals.length === 0) {
    return res.status(404).json({ message: '모든 축제를 불러오는 중 문제가 발생했습니다.' });
  }

  res.status(200).json(festivals);
});

// GET /api/festivals/:id
// id에 해당하는 하나의 축제 가져오기
const getOneFestival = asyncHandler(async (req, res) => {
  // 라우트 파라미터(:id)로 전달된 ID 값을 req.params.id로 가져옵니다.
  const festivalId = req.params.id;
  //console.log(Festival);
  // _Id 필드를 기준으로 찾기
  const festival = await Festival.findById(festivalId);

  if (!festival) {
    return res.status(404).json({ message: '해당 축제를 찾을 수 없습니다.' });
  }

  // "특정" festival 반환
  res.status(200).json(festival);
  // } catch (error) {

  //   console.error('특정 축제 조회 중 에러 발생:', error);
  //   res.status(500).json({ message: '서버에서 오류가 발생했습니다.' });
  // }
});

// GET /api/festivals/top5
// 첫 5개 축제 가져오기
const getFiveFestivals = asyncHandler(async (req, res) => {
  const festivals = await Festival.find()
    .limit(5)
    .select(
      "name short_description start_date end_date location thumbnail_url poster_url"
    );
  res.json(festivals);
});

// GET /api/festivals/doing3/:id
// 진행 중 3개 축제 가져오기
const getThreeFestivals = asyncHandler(async (req, res) => {
  const current_id = req.params.id;
  const today = new Date();
  today.setDate(today.getDate() + 1); // 내일부터

  const festivals = await Festival.find({
    _id: { $ne: current_id } ,    // 현재 축제 제외
    start_date: { $gte: today },  // 내일부터 시작하는 것
  })
    .limit(3)
    .select(
      "name short_description start_date end_date location thumbnail_url poster_url"
    )
    .sort({ start_date: 1 });

  res.json(festivals);
});

module.exports = {
  getAllFestivals,
  getOneFestival,
  getFiveFestivals,
  getThreeFestivals,
};
