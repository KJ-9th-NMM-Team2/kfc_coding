// 우리 데이터베이스의 모든 데이터 삭제 뒤 (이거 조심하세요.), 새로운 데이터를 집어넣음.
// node seedDb.js 로 실행.

const mongoose = require("mongoose");
require("dotenv").config({ path: "../.env" });
const Festival = require("../src/models/Festival");

// 더미 데이터
const seedFestivals = [
  {
    name: "서울 불꽃 축제",
    short_description: "한강에서 펼쳐지는 화려한 불꽃쇼",
    description:
      "서울의 밤하늘을 수놓는 대규모 불꽃놀이와 다양한 공연이 함께하는 축제입니다.",
    start_date: "2025-10-05",
    end_date: "2025-10-05",
    location: "여의도 한강공원",
    price: "무료",
    owner: "서울특별시",
    contact: "02-1234-5678",
    website: "https://seoulfireworks.com",
    poster_url: "/uploads/posters/seoul_fireworks.jpg",
    thumbnail_url: "/uploads/thumbnails/seoul_fireworks_thumb.jpg",
    images: [
      "/uploads/images/seoul_fireworks_1.jpg",
      "/uploads/images/seoul_fireworks_2.jpg",
    ],
    region: "서울",
    category: "공연",
  },
  {
    name: "춘천 마임 축제",
    short_description: "몸짓으로 소통하는 예술의 장",
    description:
      "국내외 마임 아티스트들이 참여하는 공연과 체험 프로그램이 가득한 축제입니다.",
    start_date: "2025-08-23",
    end_date: "2025-08-27",
    location: "춘천시 일대",
    price: "일부 유료",
    owner: "춘천마임축제조직위원회",
    contact: "033-123-4567",
    website: "https://mimefestival.com",
    poster_url: "/uploads/posters/chuncheon_mime.jpg",
    thumbnail_url: "/uploads/thumbnails/chuncheon_mime_thumb.jpg",
    images: [
      "/uploads/images/chuncheon_mime_1.jpg",
      "/uploads/images/chuncheon_mime_2.jpg",
    ],
    region: "강원특별자치도",
    category: "공연",
  },
  {
    name: "전주 한옥마을 음식 축제",
    short_description: "전통과 현대가 어우러진 맛의 향연",
    description:
      "전주 한옥마을에서 다양한 전통 음식과 퓨전 요리를 즐길 수 있는 축제입니다.",
    start_date: "2025-09-10",
    end_date: "2025-09-13",
    location: "전주 한옥마을",
    price: "무료",
    owner: "전주시",
    contact: "063-987-6543",
    website: "https://jeonjufoodfest.com",
    poster_url: "/uploads/posters/jeonju_food.jpg",
    thumbnail_url: "/uploads/thumbnails/jeonju_food_thumb.jpg",
    images: [
      "/uploads/images/jeonju_food_1.jpg",
      "/uploads/images/jeonju_food_2.jpg",
    ],
    region: "전북특별자치도",
    category: "가족과함께",
  },
  {
    name: "부산 바다 축제",
    short_description: "푸른 바다와 함께하는 여름의 축제",
    description:
      "해운대, 광안리 등 부산의 대표 해변에서 펼쳐지는 다양한 해양 스포츠와 공연이 있는 축제입니다.",
    start_date: "2025-09-01",
    end_date: "2025-09-07",
    location: "부산 해운대, 광안리",
    price: "무료",
    owner: "부산광역시",
    contact: "051-123-7890",
    website: "https://busanseafestival.com",
    poster_url: "/uploads/posters/busan_sea.jpg",
    thumbnail_url: "/uploads/thumbnails/busan_sea_thumb.jpg",
    images: [
      "/uploads/images/busan_sea_1.jpg",
      "/uploads/images/busan_sea_2.jpg",
    ],
    region: "부산",
    category: "물놀이",
  },
  {
    name: "제주 들불 축제",
    short_description: "제주의 봄을 알리는 들불의 향연",
    description:
      "제주 들판에서 펼쳐지는 전통 들불놀이와 다양한 체험 프로그램이 있는 축제입니다.",
    start_date: "2025-08-25",
    end_date: "2025-08-31",
    location: "제주시 애월읍",
    price: "무료",
    owner: "제주특별자치도",
    contact: "064-321-4321",
    website: "https://jejudulbul.com",
    poster_url: "/uploads/posters/jeju_dulbul.jpg",
    thumbnail_url: "/uploads/thumbnails/jeju_dulbul_thumb.jpg",
    images: [
      "/uploads/images/jeju_dulbul_1.jpg",
      "/uploads/images/jeju_dulbul_2.jpg",
    ],
    region: "제주특별자치도",
    category: "야행",
  },
];

// DB 연결 및 데이터 삽입
console.log(process.env.DB_CONNECT);
mongoose
  .connect(process.env.DB_CONNECT)
  .then(async () => {
    await Festival.deleteMany({});
    await Festival.insertMany(seedFestivals);
    console.log("Seed 데이터가 성공적으로 삽입되었습니다.");
    mongoose.disconnect();
  })
  .catch((err) => {
    console.error("DB 연결 또는 데이터 삽입 오류:", err);
  });
