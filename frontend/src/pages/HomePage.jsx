import React from "react";
import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import { CarouselPic, MiniCarouselPic } from "../components/CarouselPic";
import Carousel from "react-bootstrap/Carousel";
import "./HomePage.css";
import { getFiveFestivals } from "../api/api.js";
import { Link } from "react-router-dom";

export default function HomePage() {
  // 담벼락 carousel에 띄울 행사 정보
  const [slides, setSlides] = useState([]);

  // 처음으로 렌더링될 때, getFiveFestivals API를 호출하여 행사 정보를 가져옴
  useEffect(() => {
    getFiveFestivals().then((data) => {
      setSlides(data);
    });
  }, []);

  return (
    <Container>
      {/* 데스크톱: 흐린 배경만 덮고 정보 텍스트 중앙 표시 */}
      <div className="d-none d-md-block">
        <Carousel>
          {slides.map((slide, idx) => (
            <Carousel.Item key={idx} as={Link} to={`festivals/${slide._id}`}>
              <CarouselPic slide={slide} />
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
      {/* 모바일: 기존 레이아웃 */}
      <div className="d-block d-md-none">
        <Carousel>
          {slides.map((slide, idx) => (
            <Carousel.Item key={idx}>
              <MiniCarouselPic slide={slide}></MiniCarouselPic>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </Container>
  );
}
