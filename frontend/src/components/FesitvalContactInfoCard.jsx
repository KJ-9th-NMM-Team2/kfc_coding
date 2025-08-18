import { Card } from 'react-bootstrap';

export default function FestivalContactInfoCard() {
    return (
        <Card className="bg-light">
            <Card.Body className="p-3">
                <div className="mb-2 small text-muted">
                    <span className="fw-semibold">콘텐츠 관리:</span> 지역관광육성팀
                </div>
                <div className="small text-muted">
                    <span className="fw-semibold">축제정보 문의:</span><br />
                    <a href="mailto:festivalinfo@knto.or.kr" className="text-primary text-decoration-none">
                        festivalinfo@knto.or.kr
                    </a>
                </div>
            </Card.Body>
        </Card>
    )
}