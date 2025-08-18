import { Card, Button } from 'react-bootstrap';

export default function FestivalDeatilSocialLinkCard() {
    return (
        <Card className="shadow">
            <Card.Body>
                <Card.Title className="fs-5 fw-bold text-dark border-bottom pb-2 mb-3">링크 & 소셜</Card.Title>

                <div className="d-grid gap-2">
                    <a
                        href="https://gsnightculture.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="d-flex align-items-center p-3 bg-primary bg-opacity-10 rounded text-decoration-none"
                        style={{transition: 'background-color 0.2s'}}
                        onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(13, 110, 253, 0.2)'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = 'rgba(13, 110, 253, 0.1)'}
                    >
                        <span className="fs-4 me-3">🌐</span>
                        <div>
                            <div className="fw-semibold text-primary">공식 홈페이지</div>
                            <div className="small text-primary">gsnightculture.com</div>
                        </div>
                    </a>

                    <div className="d-flex align-items-center p-3 bg-danger bg-opacity-10 rounded">
                        <span className="fs-4 me-3">📸</span>
                        <div>
                            <div className="fw-semibold text-danger">인스타그램</div>
                            <div className="small text-danger">@2025_gunsan_night_trip</div>
                        </div>
                    </div>

                    <Button
                        variant="warning"
                        className="d-flex align-items-center justify-content-center p-3"
                        onClick={() => window.open('https://map.kakao.com/link/to/군산 국가유산 야행,35.99019795680884,126.70986638828877', '_blank')}
                    >
                        <span className="fs-4 me-3">🗺️</span>
                        <span className="fw-semibold">길찾기</span>
                    </Button>
                </div>
            </Card.Body>
        </Card>
    )
}