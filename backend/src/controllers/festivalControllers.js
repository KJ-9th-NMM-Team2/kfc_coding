const asyncHandler = require("express-async-handler");
const Festival = require("../models/Festival.js");

// GET /api/festivals
// 모든 축제 가져오기
const getAllFestivals = asyncHandler(async (req, res) => {
  // Festival 이용해서 가져오기. 임시.
  res.send("모든 축제 가져오기");
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

module.exports = {
  getAllFestivals,
  getOneFestival,
};
