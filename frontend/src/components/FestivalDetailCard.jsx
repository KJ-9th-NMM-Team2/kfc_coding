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
    <Card className="shadow h-100" style={{ maxHeight: "593.33px" }}>
      <Card.Body className="d-flex flex-column">
        <Card.Title className="fs-6 fw-bold text-dark border-bottom pb-2 mb-2">
          축제 정보
        </Card.Title>

        <div className="d-grid gap-1 flex-grow-1">
          {/* 축제 날짜 */}
          <div className="d-flex align-items-center">
            <span style={{ fontSize: "24px", marginRight: "12px" }}>📅</span>
            {festival.start_date && festival.end_date && (
              <p className="mb-0" style={{
                fontSize: "16px",
                fontWeight: "500",
                color: "#1A1A24",
                lineHeight: "29px"
              }}>
                {formatDate(festival.start_date)} ~ {formatDate(festival.end_date)}
              </p>
            )}
          </div>

          {/* 위치 */}
          <div className="d-flex align-items-center">
            <span style={{ fontSize: "24px", marginRight: "12px" }}>📍</span>
            <p className="mb-0" style={{
              fontSize: "16px",
              fontWeight: "500",
              color: "#1A1A24",
              lineHeight: "29px"
            }}>
              {festival.location}
            </p>
          </div>

          {/* 가격 */}
          <div className="d-flex align-items-center">
            <span style={{ fontSize: "24px", marginRight: "12px" }}>💰</span>
            <Badge bg="danger" className="px-2 py-1 fw-bold" style={{ 
              fontSize: "14px",
              fontWeight: "500"
            }}>
              무료
            </Badge>
          </div>

          {/* 주최 */}
          <div className="d-flex align-items-center">
            <span style={{ fontSize: "24px", marginRight: "12px" }}>🏢</span>
            <p className="mb-0" style={{
              fontSize: "16px",
              fontWeight: "500",
              color: "#1A1A24",
              lineHeight: "29px"
            }}>
              {festival.region}
            </p>
          </div>

          {/* 카테고리 */}
          <div className="d-flex align-items-center">
            <span style={{ fontSize: "24px", marginRight: "12px" }}>🎇</span>
            <p className="mb-0" style={{
              fontSize: "16px",
              fontWeight: "500",
              color: "#1A1A24",
              lineHeight: "29px"
            }}>
              {festival.category}
            </p>
          </div>

          {/* 문의 */}
          <div className="d-flex align-items-center">
            <span style={{ fontSize: "24px", marginRight: "12px" }}>📞</span>
            <p className="mb-0" style={{
              fontSize: "16px",
              fontWeight: "500",
              color: "#1A1A24",
              lineHeight: "29px",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: "calc(100% - 60px)"
            }}>
              {festival.contact}
            </p>
          </div>

          {/* 공식 홈페이지 */}
          <div className="d-flex align-items-center">
            <span style={{ fontSize: "24px", marginRight: "12px" }}>🌐</span>
            <a 
              href={festival.website} 
              className="text-decoration-none mb-0" 
              style={{
                fontSize: "16px",
                fontWeight: "500",
                color: "#1A1A24",
                lineHeight: "29px",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                maxWidth: "calc(100% - 60px)"
              }}
              target="_blank"
              rel="noopener noreferrer"
            >
              {festival.website}
            </a>
          </div>

          {/* 인스타그램 */}
          <div className="d-flex align-items-center">
            <span style={{ fontSize: "24px", marginRight: "12px" }}>📸</span>
            <p className="mb-0" style={{
              fontSize: "16px",
              fontWeight: "500",
              color: "#1A1A24",
              lineHeight: "29px"
            }}>
              @ssumday24
            </p>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}