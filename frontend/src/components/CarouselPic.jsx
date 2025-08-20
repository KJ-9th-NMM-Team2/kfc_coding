import React from "react";
import "./CarouselPic.css";
import { Link } from "react-router-dom";

function formatDate(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}.${month}.${day}`;
}

export function CarouselPic(props) {
  const slide = props.slide;
  return (
    <div className="carousel-bg-wrapper position-relative">
      {/* 흐린 배경 이미지 */}
      <img
        src={
          slide.thumbnail_url || "/images/placeholder-16-9-medium-pattern.svg"
        }
        alt="background"
        className="carousel-blur-bg"
        onError={(e) => {
          e.target.src = "/images/placeholder-16-9-medium-pattern.svg";
        }}
      />
      {/* 가운데 포스터 이미지 */}
      <img
        src={slide.poster_url || "/images/placeholder-3-4-medium.svg"}
        alt="poster"
        className="carousel-poster-center"
        onError={(e) => {
          e.target.src = "/images/placeholder-3-4-medium.svg";
        }}
      />
      {/* 오른쪽으로 밀린 정보 텍스트 */}
      <div className="carousel-info-right" style={{ color: "white" }}>
        <h3 className="fw-bold text-white">{slide.name}</h3>
        <p>{slide.short_description}</p>
        <p>{`${formatDate(slide.start_date)} - ${formatDate(
          slide.end_date
        )}`}</p>
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
        src={
          slide.thumbnail_url || "/images/placeholder-16-9-medium-pattern.svg"
        }
        onError={(e) => {
          e.target.src = "/images/placeholder-16-9-medium-pattern.svg";
        }}
      />
      <div className="carousel-info-center">
        <Link className="text-decoration-none" to={`festivals/${slide._id}`}>
          <h3 className="fw-bold text-white">{slide.name}</h3>
        </Link>
        <p>{slide.short_description}</p>
        <p>{`${formatDate(slide.start_date)} - ${formatDate(
          slide.end_date
        )}`}</p>
        <p>{slide.location}</p>
      </div>
    </>
  );
}
