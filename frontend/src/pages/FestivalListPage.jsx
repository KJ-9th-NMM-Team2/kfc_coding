import React, { useEffect, useState, useRef } from "react";
import { Container } from "react-bootstrap";
import { scrollTo } from "../components/scrollTo";
import FestivalSearch from "../components/FestivalSearch";
import FestivalVisualList from "../components/FestivalVisualList";
import FestivalCardList from "../components/FestivalCardList";

function FestivalListPage() {
  const [festivals, setFestivals] = useState([]);
  const [mainFestivals, setMainFestivals] = useState([]);

  // 자동스크롤 용도
  const festivalCardListRef = useRef(null);
  const shouldScroll = useRef(false);

  useEffect(() => {
    const fetchFestivals = async () => {
      try {
        const res = await fetch("/api/festivals");
        if (!res.ok) {
          throw new Error(`API 요청 실패: ${res.status}`);
        }
        const data = await res.json();
        // console.log("모든 축제 데이터:", data);
        setFestivals(data);
        setMainFestivals(data);
      } catch (error) {
        console.error("모든 축제 데이터 가져오기 실패:", error);
      }
    };
    fetchFestivals();
  }, []);

  useEffect(() => {
    if (shouldScroll.current) {
      scrollTo(festivalCardListRef);
      shouldScroll.current = false;
    }
  }, [festivals]);

  return (
    <Container fluid="sm">
      <div
        className="festival_list_page"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "1rem",
        }}
      >
        {/* <a href="/festivals/68a3165616876786b3a4b469">테스트용 : 상세페이지</a> */}
        <FestivalSearch
          onSearch={(data) => {
            shouldScroll.current = true;
            setFestivals(data);
          }}
        />
        <FestivalVisualList
          festivals={
            mainFestivals.slice(
              0,
              3
            ) /* 임시-나중에 추천 축제 3가지를 넣어줘야 함. */
          }
        />
        <FestivalCardList festivals={festivals} ref={festivalCardListRef} />
      </div>
    </Container>
  );
}

export default FestivalListPage;
