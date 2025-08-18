import "../css/FestivalContactInfoCard.css"
import { Card } from 'react-bootstrap';

export default function FestivalContactInfoCard() {
    return (
        <Card className="bg-light border-0 shadow-sm rounded-3">
            <Card.Body className="p-3">
                {/* 콘텐츠 관리부서 */}
                <div className="mb-2 small text-muted">
                    <span className="fw-semibold me-2">콘텐츠 관리부서:</span>
                    지역관광육성팀&nbsp;&nbsp;&nbsp;
                    <span className="fw-semibold me-2">축제 정보 등록/수정 문의:</span>
                    <a
                        href="mailto:festivalinfo@knto.or.kr"
                        className="text-primary text-decoration-none"
                    >
                        festivalinfo@knto.or.kr
                    </a>
                </div>

                <div className="mb-2 small text-muted">

                </div>

                {/* 하단 링크 */}
                <div className="small text-muted">
                    <span className="me-3">자주 묻는 질문</span>
                    <a href="#" className="contact-link me-3">
                        축제 지자체/유관부서
                    </a>
                    <a href="#" className="contact-link">
                        일반 사용자
                    </a>
                </div>
            </Card.Body>
        </Card>
    );
}