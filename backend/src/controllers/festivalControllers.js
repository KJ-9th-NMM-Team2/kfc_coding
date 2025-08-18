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

module.exports = {
  getAllFestivals,
  getOneFestival,
};
