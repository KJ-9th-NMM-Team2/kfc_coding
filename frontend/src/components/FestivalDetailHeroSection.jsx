import { Card } from "react-bootstrap";

export default function FestivalDetailHeroSection({ festival }) {
  const backgroundStyle = {
    height: "400px",
    background: "linear-gradient(135deg, #1e3a8a 0%, #7c3aed 100%)",
    backgroundImage: `url(${festival.thumbnail_url})`, // 썸네일 이미지 적용
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
