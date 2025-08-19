import { Card, Button } from 'react-bootstrap';

export default function FestivalDeatilSocialLinkCard({festival}) {
    return (
        <Card className="shadow">
            <Card.Body>
                <Card.Title className="fs-5 fw-bold text-dark border-bottom pb-2 mb-3">링크 & 소셜</Card.Title>

                <div className="d-grid gap-2">
                    <a
                        href={festival.website}
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
                           
     
                        </div>
                    </a>

                    <div className="d-flex align-items-center p-3 bg-danger bg-opacity-10 rounded">
                        <span className="fs-4 me-3">📸</span>
                        <div>
                            <div className="fw-semibold text-danger">인스타그램</div>
                            <div className="small text-danger">@ssumday24</div>
                        </div>
                    </div>


                </div>
            </Card.Body>
        </Card>
    )
}