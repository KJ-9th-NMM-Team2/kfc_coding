import { Badge, Card } from "react-bootstrap";

export default function FestivalDeatilCard({ festival }) {
  // 날짜 YYYY--MM--DD 형식으로 변환하는 함수
  const formatDate = (iso) => {
    if (!iso) return "";
    try {
      const d = new Date(iso);
      const yyyy = d.getFullYear();
      const mm = String(d.getMonth() + 1).padStart(2, "0");
      const dd = String(d.getDate()).padStart(2, "0");
      return `${yyyy}.${mm}.${dd}`;
    } catch {
      return String(iso).slice(0, 10).replace(/-/g, ".");
    }
  };

  return (
    <Card className="shadow">
      <Card.Body>
        <Card.Title className="fs-5 fw-bold text-dark border-bottom pb-2 mb-3">
          {" "}
          축제 정보{" "}
        </Card.Title>

        <div className="d-grid gap-3">
          <div>
            <div className="d-flex align-items-center mb-2">
              <span className="fs-4 me-2">📅</span>

              {/* 축제기간 2025.MM.DD ~ 2025.MM.DD */}
              {festival.start_date && festival.end_date && (
                <Card.Text>
                  {formatDate(festival.start_date)} ~{" "}
                  {formatDate(festival.end_date)}
                </Card.Text>
              )}
            </div>
          </div>

          <div>
            <div className="d-flex align-items-center mb-2">
              <span className="fs-4 me-2">📍</span>
              <span className="fw-semibold text-dark">위치</span>
            </div>
            <p className="ps-5 text-muted small mb-0">{festival.location}</p>
          </div>

          <div>
            <div className="d-flex align-items-center mb-2">
              <span className="fs-4 me-2">💰</span>
              <span className="fw-semibold text-dark">가격</span>
            </div>
            <div className="ms-5">
              <Badge bg="danger" className="px-3 py-2 fw-bold">
                무료
              </Badge>
            </div>
          </div>

          <div>
            <div className="d-flex align-items-center mb-2">
              <span className="fs-4 me-2">🏢</span>
              <span className="fw-semibold text-dark">주최</span>
            </div>
            <p className="ms-5 text-muted mb-0">{festival.region}</p>
          </div>

          <div>
            <div className="d-flex align-items-center mb-2">
              <span className="fs-4 me-2">📞</span>
              <span className="fw-semibold text-dark">문의</span>
            </div>
            <p className="ms-5 text-muted mb-0">{festival.contact}</p>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}
