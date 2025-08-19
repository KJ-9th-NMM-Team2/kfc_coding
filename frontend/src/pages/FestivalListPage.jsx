import React, { useEffect, useState } from "react";

import FestivalSearch from "../components/FestivalSearch";
import FestivalVisualList from "../components/FestivalVisualList";
import FestivalCardList from "../components/FestivalCardList";
import FestivalContactInfoCard from "../components/FesitvalContactInfoCard";
import { Stack } from "react-bootstrap";

function FestivalListPage() {
  const [festivals, setFestivals] = useState([]);

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
      } catch (error) {
        console.error("모든 축제 데이터 가져오기 실패:", error);
      }
    };
    fetchFestivals();
  }, []);

  return (
    <div className="festival_list_page">
      <Stack gap={3}>
        {/* <a href="/festivals/68a3165616876786b3a4b469">테스트용 : 상세페이지</a> */}
        <FestivalSearch />
        <FestivalVisualList
          festivals={
            festivals.slice(
              0,
              3
            ) /* 임시-나중에 추천 축제 3가지를 넣어줘야 함. */
          }
        />
        <FestivalCardList festivals={festivals} />
        <FestivalContactInfoCard />
      </Stack>
    </div>
  );
}

export default FestivalListPage;
