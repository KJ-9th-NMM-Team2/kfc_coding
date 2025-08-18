// DB와 통신하기 위한 Festival 모델
const Festival = require('../models/Festival');

/**
 * @desc    모든 축제 목록을 가져옵니다.
 * @route   GET /api/festivals
 */
const getAllFestivals = async (req, res) => {
  try {
    const festivals = await Festival.find({});
    
    res.status(200).json(festivals);

  } catch (error) {
    console.error('모든 축제 조회 중 에러 발생:', error);
    res.status(500).json({ message: '서버에서 오류가 발생했습니다.' });
  }
};

/**
 * @desc    ID로 특정 축제 하나의 상세 정보를 가져옵니다.
 * @route   GET /api/festivals/:id
 */
const getOneFestival = async (req, res) => {
  try {
    // 라우트 파라미터(:id)로 전달된 ID 값을 req.params.id로 가져옵니다.
    const festivalId = req.params.id;
    
    const festival = await Festival.findById(festivalId);

    if (!festival) {
      return res.status(404).json({ message: '해당 축제를 찾을 수 없습니다.' });
    }
    
    // festival 반환
    res.status(200).json(festival);
  } catch (error) {
    
    console.error('특정 축제 조회 중 에러 발생:', error);
    res.status(500).json({ message: '서버에서 오류가 발생했습니다.' });
  }
};


module.exports = {
  getAllFestivals,
  getOneFestival,
};