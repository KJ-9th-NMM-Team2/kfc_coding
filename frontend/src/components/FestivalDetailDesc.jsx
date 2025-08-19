import { Card } from "react-bootstrap";

// 메인 포스터렌더링
export default function FestivalDetailDesc({ festival }) {
  // 이미지 경로 못찾을때 예외처리
  if (!festival.poster_url) {
    return <div>축제 이미지를 불러올 수 없습니다.</div>;
  }

  const backgroundStyle = {
    height: "400px",
    background: "linear-gradient(135deg, #1e3a8a 0%, #7c3aed 100%)",

    backgroundImage: `url(${festival.poster_url})`, // poster_url 적용
    backgroundSize: "cover",
    backgroundPosition: "center",

  };

  return (
    <div>
      <Card className="shadow overflow-hidden">
        <div
          className="d-flex align-items-center justify-content-center text-white"
          style={backgroundStyle} // 위의 backgroundStyle 적용
        ></div>
      </Card>
    </div>
  );
}
