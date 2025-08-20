import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { authAdminToken } from "../api/api";
import { initialFestivalData } from "../components/InitialFestivalData.jsx";

export default function AdminCreateFestivalPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const adminAuthToken = async () => {
      const token = localStorage.getItem("admin");
      if (!token) {
        // 토큰이 없으면 로그인 페이지로 리디렉션
        alert("로그인이 필요합니다.");
        navigate("/admin", { replace: true });
        return;
      }

      if (!(await authAdminToken(token))) {
        navigate("/admin", { replace: true });
      }
    };
    adminAuthToken();
  }, []);

  const [festivalData, setFestivalData] = useState(initialFestivalData);

  const regions = [
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
  ];
  const categories = [
    "물놀이",
    "여름",
    "가족과함께",
    "야행",
    "문화예술",
    "공연",
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFestivalData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    setFestivalData((prevData) => {
      const newCategories = checked
        ? [...prevData.category, value]
        : prevData.category.filter((cat) => cat !== value);
      return { ...prevData, category: newCategories };
    });
  };

  const handleImageChange = (e, index) => {
    const newImages = [...festivalData.images];
    newImages[index] = e.target.value;
    setFestivalData((prevData) => ({
      ...prevData,
      images: newImages,
    }));
  };

  const addImageField = () => {
    setFestivalData((prevData) => ({
      ...prevData,
      images: [...prevData.images, ""],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // 여기에서 API 호출 로직을 구현합니다.
    // festivalData 객체를 백엔드에 전송
    const res = await axios.post("/api/admin/createFestival", festivalData);
    setFestivalData(initialFestivalData);
    alert(res.data.message);
  };
  return (
    <Container className="my-5">
      <h2 className="mb-4">축제 정보 등록</h2>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridName">
            <Form.Label>
              축제명 <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={festivalData.name}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridLocation">
            <Form.Label>
              개최 장소 <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              name="location"
              value={festivalData.location}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
        </Row>

        <Form.Group className="mb-3" controlId="formShortDescription">
          <Form.Label>한 줄 소개</Form.Label>
          <Form.Control
            as="textarea"
            rows={1}
            name="short_description"
            value={festivalData.short_description}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formDescription">
          <Form.Label>축제 설명</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="description"
            value={festivalData.description}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formStartDate">
            <Form.Label>시작일</Form.Label>
            <Form.Control
              type="date"
              name="start_date"
              value={festivalData.start_date}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formEndDate">
            <Form.Label>종료일</Form.Label>
            <Form.Control
              type="date"
              name="end_date"
              value={festivalData.end_date}
              onChange={handleInputChange}
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formPrice">
            <Form.Label>입장료</Form.Label>
            <Form.Control
              type="text"
              name="price"
              value={festivalData.price}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formOwner">
            <Form.Label>주체 기관</Form.Label>
            <Form.Control
              type="text"
              name="owner"
              value={festivalData.owner}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formContact">
            <Form.Label>연락처</Form.Label>
            <Form.Control
              type="text"
              name="contact"
              value={festivalData.contact}
              onChange={handleInputChange}
            />
          </Form.Group>
        </Row>

        <Form.Group className="mb-3" controlId="formWebsite">
          <Form.Label>공식 홈페이지</Form.Label>
          <Form.Control
            type="url"
            name="website"
            value={festivalData.website}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formPosterUrl">
            <Form.Label>포스터 URL</Form.Label>
            <Form.Control
              type="path"
              name="poster_url"
              value={festivalData.poster_url}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formThumbnailUrl">
            <Form.Label>썸네일 URL</Form.Label>
            <Form.Control
              type="path"
              name="thumbnail_url"
              value={festivalData.thumbnail_url}
              onChange={handleInputChange}
            />
          </Form.Group>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label>이미지 URL</Form.Label>
          {festivalData.images.map((image, index) => (
            <div key={index} className="mb-2">
              <Form.Control
                type="path"
                value={image}
                onChange={(e) => handleImageChange(e, index)}
              />
            </div>
          ))}
          <Button variant="outline-secondary" onClick={addImageField}>
            이미지 필드 추가
          </Button>
        </Form.Group>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formRegion">
            <Form.Label>
              지역 <span className="text-danger">*</span>
            </Form.Label>
            <Form.Select
              name="region"
              value={festivalData.region}
              onChange={handleInputChange}
              required
            >
              <option value="">지역 선택</option>
              {regions.map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group as={Col} controlId="formCategory">
            <Form.Label>
              카테고리 <span className="text-danger">*</span>
            </Form.Label>
            {categories.map((category) => (
              <Form.Check
                key={category}
                type="radio"
                id={`category-${category}`}
                label={category}
                value={category}
                onChange={handleCategoryChange}
                checked={festivalData.category.includes(category)}
              />
            ))}
          </Form.Group>
        </Row>

        <Button variant="primary" type="submit">
          축제 등록
        </Button>
      </Form>
    </Container>
  );
}
