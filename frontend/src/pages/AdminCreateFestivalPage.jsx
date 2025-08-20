import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, Row } from "react-bootstrap";
import { authAdminToken } from "../api/api";
import { initialFestivalData } from "../components/InitialFestivalData.jsx";
import { AdminCreateForm } from "../components/admin/AdminCreateForm.jsx";
import { ChooseFestivalImage } from "../components/admin/ChooseFestivalImage.jsx";
import Handlers from "../components/handler/AdminHandler.jsx";

export default function AdminCreateFestivalPage() {
  const navigate = useNavigate();
  const [festivalData, setFestivalData] = useState(initialFestivalData);
  // 파일 객체를 저장할 상태
  const [postFile, setPostFile] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [images, setImages] = useState([]);
  const handlers = Handlers(setFestivalData);
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

  return (
    <Container className="my-5">
      <h2 className="mb-4">축제 정보 등록</h2>
      <Form onSubmit={(e) => { handlers.submit(e, festivalData, postFile, thumbnailFile, images, setPostFile, setThumbnailFile, setImages) }}>
        <Row className="mb-3">
          <AdminCreateForm controlId="formGridName" title="축제명" name="name" onChange={handlers.inputChange} value={festivalData.name} requiredStatus={true} />
          <AdminCreateForm controlId="formGridLocation" title="개최 장소" name="location" onChange={handlers.inputChange} value={festivalData.location} requiredStatus={true} />
        </Row>

        <AdminCreateForm controlId="formShortDescription" title="한 줄 소개" name="short_description" onChange={handlers.inputChange} value={festivalData.short_description} />
        <AdminCreateForm controlId="formDescription" title="축제 설명" name="description" onChange={handlers.inputChange} value={festivalData.description} type={"textarea"} />

        <Row className="mb-3">
          <AdminCreateForm controlId="formStartDate" title="시작일" name="start_date" onChange={handlers.inputChange} value={festivalData.start_date} type={"date"} />
          <AdminCreateForm controlId="formEndDate" title="종료일" name="end_date" onChange={handlers.inputChange} value={festivalData.end_date} type={"date"} />
        </Row>

        <Row className="mb-3">
          <AdminCreateForm controlId="formPrice" title="입장료" name="price" onChange={handlers.inputChange} value={festivalData.price} />
          <AdminCreateForm controlId="formOwner" title="주체 기관" name="owner" onChange={handlers.inputChange} value={festivalData.owner} />
          <AdminCreateForm controlId="formContact" title="연락처" name="contact" onChange={handlers.inputChange} value={festivalData.contact} />
        </Row>

        <AdminCreateForm controlId="formContact" title="공식 홈페이지" name="website" onChange={handlers.inputChange} value={festivalData.website} />

        <Row className="mb-3">
          <AdminCreateForm controlId="formPosterUrl" title="포스터 사진" name="poster_url" type="file" onChange={handlers.inputChange} onChangeFile={(e) => handlers.chooseFile(e, setPostFile)} value={festivalData.poster_url}/>

          <AdminCreateForm controlId="formThumbnailUrl" title="썸네일 사진" name="thumbnail_url" type="file" onChange={handlers.inputChange} onChangeFile={(e) => handlers.chooseFile(e, setThumbnailFile)} value={festivalData.thumbnail_url}/>
        </Row>

        {/* <AdminCreateForm title="이미지 URL" name="images" type="path" onChange={handlers.inputChange} onChangeFile={(e) => handlers.addImageField(e, setImages)} festivalData={festivalData} onClickButton={handlers.addUrlField}/> */}
        <Form.Group className="mb-3">
            <Form.Label>이미지 URL</Form.Label>
            {festivalData.images.map((image, index) => (
                <div key={index} className="mb-2">
                    <Form.Control
                        type='text'
                        value={image}
                        name='images'
                        onChange={(e) => handlers.imageChange(e, index, festivalData)}
                    />
                </div>
            ))}
        </Form.Group>
        <ChooseFestivalImage controlId={"formImageFiles"} title="파일 선택" type="file" name={"images"} onChange={((e) => handlers.addImageField(e, setImages))}/>
        <Button
        className="btn btn-secondary ms-3 mt-3" 
        style={{ whiteSpace: 'nowrap' }}
        onClick={handlers.addUrlField}
        >
        URL 추가
        </Button>

        <Row className="mb-10">
          <AdminCreateForm controlId="formRegion" title="지역" name="region" onChange={handlers.inputChange} value={festivalData.region} requiredStatus={true}/>
          <AdminCreateForm controlId="formCategory" title="카테고리" type="radio" onChange={handlers.categoryChange} value={festivalData.category} festivalData={festivalData} requiredStatus={true}/>
        </Row>

        <Button 
          variant="primary" 
          type="submit"
          className="btn btn-secondary ms-3 mt-3" 
          style={{ whiteSpace: 'nowrap' }}
        >
          축제 등록
        </Button>
      </Form>
    </Container>
  );
}
