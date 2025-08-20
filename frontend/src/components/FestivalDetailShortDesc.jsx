import { Card, Container, Badge, Button } from "react-bootstrap";

import { HeartFill } from "react-bootstrap-icons";

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

  return (
    <Card className="mb-3">
      <Card.Body className="lh-lg fw-bold">
        {/* 축제간단설명 */}
        <Card.Title className="fs-4 fw-bold">
          {festival.short_description}
        </Card.Title>

        {/*축제이름 */}
        <Card.Text className="fs-2 fw-bold">{festival.name}</Card.Text>

        {/* 축제 진행 중 or 축제 종료 */}
        <Badge bg="danger" className="fs-4 fw-bold mb-4 px-3 py-2">
          {leftDays}
        </Badge>

        {/* 축제기간 */}
        {festival.start_date && festival.end_date && (
          <Card.Text className="fw-bold fs-5">
            {formatDate(festival.start_date)} ~ {formatDate(festival.end_date)}
          </Card.Text>
        )}

        {/* 좋아요, 공유, 조회수*/}
        <Card.Text className="fw-bold">
          <div className="d-flex align-items-center">
            <Button variant="outline-danger" size="md" className="me-3">
              <HeartFill className="me-1" /> {/* 아이콘 */}
              {festival.likes || 0}
            </Button>

            <span className="text-muted me-3">
              공유: {festival.shares || 0}
            </span>

            <span className="text-muted">조회수: {festival.views || 0}</span>
          </div>
        </Card.Text>

        {/* 행사 내용 */}
        <Card.Text
          className="pretendard text-secondary"
          style={{ whiteSpace: "pre-line" }}
        >
          {festival.description}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
