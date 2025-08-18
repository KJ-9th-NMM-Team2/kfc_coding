const mongoose = require("mongoose");

// Festival 컬렉션에 도큐먼트를 input할 때 지켜야 할 양식.
const festivalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    description: "축제명",
  },
  short_description: {
    type: String,
    description: "한줄 소개",
  },
  description: {
    type: String,
    description: "축제 설명",
  },
  start_date: {
    type: Date,
    description: "시작일",
  },
  end_date: {
    type: Date,
    description: "종료일",
  },
  location: {
    type: String,
    required: true,
    description: "개최 장소",
  },
  price: {
    type: String,
    description: "입장료",
  },
  owner: {
    type: String,
    description: "주체 기관",
  },
  contact: {
    type: String,
    description: "연락처",
  },
  website: {
    type: String,
    description: "공식 홈페이지",
  },
  poster_url: {
    type: String,
    description: "축제 포스터 서버 내 경로",
  },
  thumbnail_url: {
    type: String,
    description: "축제 썸네일 서버 내 경로",
  },
  images: [
    {
      type: String,
      description: "이미지 URL",
    },
  ],
  region: {
    type: String,
    required: true,
    enum: [
      "서울",
      "인천",
      "대전",
      "대구",
      "광주",
      "부산",
      "울산",
      "세종특별자치시",
      "경기도",
      "강원특별자치도",
      "충청북도",
      "충청남도",
      "경상북도",
      "경상남도",
      "전북특별자치도",
      "전라남도",
      "제주특별자치도",
    ],
    description: "지역 - 검색용",
  },
  category: {
    type: String,
    required: true,
    enum: ["물놀이", "여름", "가족과함께", "야행", "문화예술", "공연"],
    description: "축제 카테고리 - 검색용",
  },
});

// Festival 모델을 만들면, 이후 Festival.find() 식으로 몽고db 메서드 사용 가능.
const Festival = mongoose.model("Festival", festivalSchema);
module.exports = Festival;
