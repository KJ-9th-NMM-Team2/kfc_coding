const asyncHandler = require("express-async-handler");
const Festival = require("../models/Festival.js");

// GET /api/festivals
// 모든 축제 가져오기
const getAllFestivals = asyncHandler(async (req, res) => {
  const now = new Date();
  const limit = Math.min(Math.max(parseInt(req.query.limit, 10) || 20, 1), 100);

  const festivals = await Festival.find(
    { end_date: { $gte: now } }, // 이미 끝난 축제 제외
    "name start_date end_date region location thumbnail_url" // 필요한 필드만
  )
    .sort({ start_date: 1, _id: 1 }) // 시작일 오름차순(보조정렬 _id)
    .limit(limit);

  res.status(200).json(festivals);
});

// GET /api/festivals/:id
// id에 해당하는 하나의 축제 가져오기
const getOneFestival = asyncHandler(async (req, res) => {
  // 라우트 파라미터(:id)로 전달된 ID 값을 req.params.id로 가져옵니다.
  const festivalId = req.params.id;
  //console.log(Festival);
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

module.exports = {
  getAllFestivals,
  getOneFestival,
  getFiveFestivals,
};
