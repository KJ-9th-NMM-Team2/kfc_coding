import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { authAdminToken } from "../api/api";
import { initialFestivalData } from "../components/InitialFestivalData.jsx";
import { AdminCreateForm } from "../components/admin/AdminCreateForm.jsx";

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFestivalData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCategoryChange = (e) => {
    // radio용
    const { value } = e.target;
    setFestivalData((prevData) => ({
      ...prevData,
      category: value,
    }));
    
    // checkbox용
    // const { value, checked } = e.target;
    // setFestivalData((prevData) => {
    //   const newCategories = checked
    //     ? [...prevData.category, value]
    //     : prevData.category.filter((cat) => cat !== value);
    //   return { ...prevData, category: newCategories };
    // });
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
          <AdminCreateForm controlId="formGridName" title="축제명" name="name" handleInputChange={handleInputChange} value={festivalData.name} requiredStatus={true} />
          <AdminCreateForm controlId="formGridLocation" title="개최 장소" name="location" handleInputChange={handleInputChange} value={festivalData.location} requiredStatus={true} />          
        </Row>

        <AdminCreateForm controlId="formShortDescription" title="한 줄 소개" name="short_description" handleInputChange={handleInputChange} value={festivalData.short_description} />
        <AdminCreateForm controlId="formDescription" title="축제 설명" name="description" handleInputChange={handleInputChange} value={festivalData.description} type={"textarea"}/>
        
        <Row className="mb-3">
          <AdminCreateForm controlId="formStartDate" title="시작일" name="start_date" handleInputChange={handleInputChange} value={festivalData.start_date} type={"date"}/>
          <AdminCreateForm controlId="formEndDate" title="종료일" name="end_date" handleInputChange={handleInputChange} value={festivalData.end_date} type={"date"}/>
        </Row>

        <Row className="mb-3">
          <AdminCreateForm controlId="formPrice" title="입장료" name="price" handleInputChange={handleInputChange} value={festivalData.price}/>
          <AdminCreateForm controlId="formOwner" title="주체 기관" name="owner" handleInputChange={handleInputChange} value={festivalData.owner}/>
          <AdminCreateForm controlId="formContact" title="연락처" name="contact" handleInputChange={handleInputChange} value={festivalData.contact}/>
        </Row>

        <AdminCreateForm controlId="formContact" title="공식 홈페이지" name="website" handleInputChange={handleInputChange} value={festivalData.website}/>

        <Row className="mb-3">
          <AdminCreateForm controlId="formPosterUrl" title="포스터 사진" name="poster_url" handleInputChange={handleInputChange} value={festivalData.poster_url}/>

          <AdminCreateForm controlId="formThumbnailUrl" title="썸네일 사진" name="thumbnail_url" handleInputChange={handleInputChange} value={festivalData.thumbnail_url}/>
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
          <AdminCreateForm controlId="formRegion" title="지역" name="region" handleInputChange={handleInputChange} value={festivalData.region}/>
          <AdminCreateForm controlId="formCategory" title="카테고리" name="" handleInputChange={handleInputChange} handleCategoryChange={handleCategoryChange} value={festivalData.category} festivalData={festivalData}/>
        </Row>

        <Button variant="primary" type="submit">
          축제 등록
        </Button>
      </Form>
    </Container>
  );
}
