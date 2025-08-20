const asyncHandler = require("express-async-handler");
const Festival = require("../models/Festival.js");

// GET /api/festivals
// 모든 축제 가져오기
const getAllFestivals = asyncHandler(async (req, res) => {
  // 현재 시간 받아오기
  const now = new Date();
  // 페이지 크기 계산(기본 20개)
  const limit = Math.min(Math.max(parseInt(req.query.limit, 10) || 20, 1), 100);
  const filter = {
    end_date: { $gte: now }, // 기본 조건: 이미 끝난 축제 제외
  };

  let { region, category, date } = req.query;

  if (date === "개최중") {
    filter.start_date = { $lte: now };
    filter.end_date = { $gte: now };
  } else if (date === "개최예정") {
    filter.start_date = { $gt: now };
  } else if (date) {
    const month = parseInt(date.replace(/[^0-9]/g, ""), 10); // 문자열에서 숫자만 뽑기
    if (!isNaN(month) && month >= 1 && month <= 12) {
      const year = now.getFullYear();
      const startOfMonth = new Date(year, month - 1, 1); // 해당 x월 1일 00:00:00
      const endOfMonth = new Date(year, month, 0, 23, 59, 59); // 해당 x월 31일 23:59:59

      filter.$and = [
        { start_date: { $lte: endOfMonth } },
        { end_date: { $gte: startOfMonth } },
      ];
    }
  }

  if (region) {
    filter.region = region; // 지역이 지정되면 그 값만
  }
  if (category) {
    filter.category = category; // 카테고리가 지정되면 그 값만
  }

  const festivals = await Festival.find(filter)
    .sort({ start_date: 1, _id: 1 })
    .limit(limit);

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
    return res.status(404).json({ message: "해당 축제를 찾을 수 없습니다." });
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
    )
    .sort({ _id: -1 });
  res.json(festivals);
});

// GET /api/festivals/month
// 월별 축제 가져오기
const getMonthFestivals = asyncHandler(async (req, res) => {
  const { year, month } = req.query;

  if (!year || !month) {
    return res.status(400).json({ error: "year와 month는 필수입니다" });
  }

  const yearNum = parseInt(year);
  const monthNum = parseInt(month);
  const daysInMonth = new Date(yearNum, monthNum, 0).getDate();

  // 해당 월 축제 조회 후 JavaScript로 계산
  const firstDay = new Date(yearNum, monthNum - 1, 1);
  const lastDay = new Date(yearNum, monthNum, 0, 23, 59, 59);

  const festivals = await Festival.find({
    start_date: { $lte: lastDay },
    end_date: { $gte: firstDay },
  });

  const dailyCounts = {};

  for (let day = 1; day <= daysInMonth; day++) {
    const currentDate = new Date(yearNum, monthNum - 1, day);

    dailyCounts[day] = festivals.filter((festival) => {
      const start = new Date(
        festival.start_date.getFullYear(),
        festival.start_date.getMonth(),
        festival.start_date.getDate()
      );
      const end = new Date(
        festival.end_date.getFullYear(),
        festival.end_date.getMonth(),
        festival.end_date.getDate()
      );
      const current = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate()
      );

      return current >= start && current <= end;
    }).length;
  }
  res.json(dailyCounts);
});

// GET /api/festivals/date
// 한 날짜의 모든 축제 가져오기
const getDateFestivals = asyncHandler(async (req, res) => {
  const yearNum = parseInt(req.query.year);
  const monthNum = parseInt(req.query.month);
  const dayNum = parseInt(req.query.day);

  const currentDate = new Date(yearNum, monthNum, dayNum);
  const startOfDay = new Date(yearNum, monthNum, dayNum, 0, 0, 0);
  const endOfDay = new Date(yearNum, monthNum, dayNum, 23, 59, 59);

  const festivals = await Festival.find({
    start_date: { $lte: endOfDay },
    end_date: { $gte: startOfDay },
  });

  res.json(festivals);
});

// GET /api/festivals/doing3/:id
// 진행 중 3개 축제 가져오기
const getThreeFestivals = asyncHandler(async (req, res) => {
  const current_id = req.params.id;
  const today = new Date();
  today.setDate(today.getDate() + 1); // 내일부터

  const festivals = await Festival.find({
    _id: { $ne: current_id }, // 현재 축제 제외
    start_date: { $gte: today }, // 내일부터 시작하는 것
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
  getMonthFestivals,
  getDateFestivals,
  getThreeFestivals,
};
