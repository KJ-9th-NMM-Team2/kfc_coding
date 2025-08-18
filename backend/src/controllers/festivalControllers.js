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
  // Festival 이용해서 가져오기. 임시.
  res.send("하나의 축제 가져오기");
});

// GET /api/festivals/top5
// 첫 5개 축제 가져오기
const getFiveFestivals = asyncHandler(async (req, res) => {
  console.log("요청이 들어왓어요");
  const festivals = await Festival.find()
    .limit(5)
    .select(
      "name short_description start_date end_date location thumbnail_url poster_url"
    );
  console.log(festivals);
  res.json(festivals);
});

module.exports = {
  getAllFestivals,
  getOneFestival,
  getFiveFestivals,
};
