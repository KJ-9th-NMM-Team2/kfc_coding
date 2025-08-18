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
      "경기",
      "강원",
      "충북",
      "충남",
      "전북",
      "전남",
      "경북",
      "경남",
      "부산",
      "대구",
      "인천",
      "광주",
      "대전",
      "울산",
      "세종",
      "제주",
    ],
    description: "지역 - 검색용",
  },
  category: {
    type: String,
    required: true,
    enum: [
      "전통문화",
      "음식",
      "자연경관",
      "예술문화",
      "체험",
      "음악",
      "스포츠",
      "기타",
    ],
    description: "축제 카테고리 - 검색용",
  },
});

// Festival 모델을 만들면, 이후 Festival.find() 식으로 몽고db 메서드 사용 가능.
const Festival = mongoose.model("Festival", festivalSchema);

// Festival 모델 Export
module.exports = Festival;