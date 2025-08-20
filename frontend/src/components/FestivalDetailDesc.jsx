import { Card } from "react-bootstrap"; // 카드 컴포넌트 import

// 메인 포스터렌더링
export default function FestivalDetailDesc({ festival }) {
  // 이미지 경로 못찾을때 예외처리
  if (!festival.poster_url) {
    return <div>축제 이미지를 불러올 수 없습니다.</div>;
  }

  
  return (
      <Card className="shadow overflow-hidden" >
        <img src={festival.poster_url}/>
      </Card>
    
  );
}

