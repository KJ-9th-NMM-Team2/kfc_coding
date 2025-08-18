import { Card } from 'react-bootstrap';

export default function FestivalContactInfoCard() {
    return (
        <Card className="bg-light border-0 shadow-sm rounded-3">
            <Card.Body className="p-3">
                {/* 콘텐츠 관리부서 */}
                <div className="mb-2 small text-muted">
                    <span className="fw-semibold">콘텐츠 관리부서:</span> 지역관광육성팀
                    <span className="fw-semibold">축제 정보 등록/수정 문의:</span>
                    <a
                        href="mailto:festivalinfo@knto.or.kr"
                        className="text-primary text-decoration-none"
                    >
                        festivalinfo@knto.or.kr
                    </a>
                </div>

                {/* 축제 정보 등록/수정 문의 */}
                <div className="small text-muted">
                    <span>자주 묻는 질문</span>
                    <a href=''></a>
                    
                </div>
            </Card.Body>
        </Card>
    );
}