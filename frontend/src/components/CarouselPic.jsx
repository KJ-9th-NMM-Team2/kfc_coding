import React from "react";
import "./CarouselPic.css";

export function CarouselPic(props) {
  const slide = props.slide;
  console.log(slide);
  return (
    <div className="carousel-bg-wrapper position-relative">
      {/* 흐린 배경 이미지 */}
      <img
        src={slide.thumbnail_url}
        alt="background"
        className="carousel-blur-bg"
      />
      {/* 가운데 포스터 이미지 */}
      <img
        src={slide.poster_url}
        alt="poster"
        className="carousel-poster-center"
      />
      {/* 오른쪽으로 밀린 정보 텍스트 */}
      <div className="carousel-info-right">
        <h3>{slide.name}</h3>
        <p>{slide.short_description}</p>
        <p>{`${slide.start_date} - ${slide.end_date}`}</p>
        <p>{slide.location}</p>
      </div>
    </div>
  );
}

export function MiniCarouselPic(props) {
  const slide = props.slide;
  return (
    <>
      <img
        className="d-block w-100 carousel-bg-mobile-wrapper"
        src={slide.thumbnail_url}
      />
      <div className="carousel-info-center">
        <h3>{slide.name}</h3>
        <p>{slide.short_description}</p>
        <p>{`${slide.start_date} - ${slide.end_date}`}</p>
        <p>{slide.location}</p>
      </div>
    </>
  );
}
