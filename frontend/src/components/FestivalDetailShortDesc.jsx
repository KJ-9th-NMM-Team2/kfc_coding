import { Card, Container, Badge } from "react-bootstrap";

export default function FestivalDetailShortDesc({ festival }) {
  // 날짜 YYYY--MM--DD 형식으로 변환 함수 정의
  const formatDate = (iso) => {
    if (!iso) return "";
    try {
      const d = new Date(iso);
      const yyyy = d.getFullYear();
      const mm = String(d.getMonth() + 1).padStart(2, "0");
      const dd = String(d.getDate()).padStart(2, "0");
      return `${yyyy}.${mm}.${dd}`; // 여기서 . 으로 구분
    } catch {
      return String(iso).slice(0, 10).replace(/-/g, ".");
    }
  };

  // 남은 일수 계산
  const dateDiff = Date.parse(festival.start_date) - Date.now();
  const calLeftDays = Math.ceil(dateDiff / (1000 * 60 * 60 * 24));

  const leftDays =
    Date.parse(festival.start_date) > Date.now()
      ? `D-${calLeftDays}`
      : Date.parse(festival.end_date) < Date.now()
      ? "축제 종료"
      : "축제 진행 중";

  // console.log(festival); // 디버깅용
  return (
    <Card className="mb-3">
      <Card.Body>
        {/* 축제 - 간단설명 */}
        <Card.Title>{festival.short_description}</Card.Title>

        {/*축제 - 이름 */}
        <Card.Text>{festival.name}</Card.Text>

        {/* 축제 - 기간 */}
        {festival.start_date && festival.end_date && (
          <Card.Text>
            {formatDate(festival.start_date)} ~ {formatDate(festival.end_date)}
          </Card.Text>
        )}

        {/* 축제 - 진행 중 or 종료 */}
        <Badge bg="danger" className="fs-6 fw-bold mb-4 px-3 py-2">
          {leftDays}
        </Badge>

        {/* 좋아요, 공유, 조회수*/}
        <Card.Text>
          좋아요: {festival.likes || 0} | 공유: {festival.shares || 0} | 조회수:{" "}
          {festival.views || 0}
        </Card.Text>

        {/* 행사 내용 */}
        <Card.Text>{festival.description}</Card.Text>

        


      </Card.Body>
    </Card>
  );
}
