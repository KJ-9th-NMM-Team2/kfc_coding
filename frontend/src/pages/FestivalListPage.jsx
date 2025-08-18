import React from "react";

import FestivalSearch from "../components/FestivalSearch";
import FestivalVisualList from "../components/FesivalVisualList";
import FestivalCardList from "../components/FestivalCardList";
import FestivalContactInfoCard from "../components/FesitvalContactInfoCard";
import { Stack } from "react-bootstrap";

function FestivalListPage() {
  return (
    <div className="festival_list_page">
      <a href="/festivals/:1">테스트용 : 1번 인덱스 상세페이지</a>
      <Stack gap={3}>
        <FestivalSearch />
        <FestivalVisualList festivals={[] /* 추천 축제 세가지 */} />
        <FestivalCardList festivals={[] /* 검색 결과축제 */} />
        <FestivalContactInfoCard name="나만무 2팀" email="NMMteam2@jungle.com" phone="123-456-7890" />
      </Stack>
    </div>
  );
}

export default FestivalListPage;