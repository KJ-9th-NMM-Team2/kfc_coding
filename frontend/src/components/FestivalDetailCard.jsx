import { Badge, Card } from 'react-bootstrap';

export default function FestivalDeatilCard({festivalDates}) {
    return (
        <Card className="shadow">
            <Card.Body>
                <Card.Title className="fs-5 fw-bold text-dark border-bottom pb-2 mb-3">축제 정보</Card.Title>

                <div className="d-grid gap-3">
                    <div>
                        <div className="d-flex align-items-center mb-2">
                            <span className="fs-4 me-2">📅</span>
                            <span className="fw-semibold text-dark">날짜</span>
                        </div>
                        <div className="ms-5">
                            {/* {festivalDates.map((date, index) => (
                                <Badge 
                                    key={index} 
                                    bg="success" 
                                    className="me-2 mb-1 px-3 py-2 fw-normal"
                                >
                                    {date}
                                </Badge>
                            ))} */}
                        </div>
                    </div>

                    <div>
                        <div className="d-flex align-items-center mb-2">
                            <span className="fs-4 me-2">📍</span>
                            <span className="fw-semibold text-dark">위치</span>
                        </div>
                        <p className="ms-5 text-muted small mb-0">
                            전북특별자치도 군산시 구영2길 43 (영화동)<br />
                            군산 원도심 국가유산 일원
                        </p>
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
                        <p className="ms-5 text-muted mb-0">군산시</p>
                    </div>

                    <div>
                        <div className="d-flex align-items-center mb-2">
                            <span className="fs-4 me-2">📞</span>
                            <span className="fw-semibold text-dark">문의</span>
                        </div>
                        <p className="ms-5 text-muted mb-0">063-453-2447</p>
                    </div>
                </div>
            </Card.Body>
        </Card>
    )
}