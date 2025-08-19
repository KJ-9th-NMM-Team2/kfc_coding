import { Card } from 'react-bootstrap';

export default function FestivalDetailDesc({festival}) {
    return (
        <div>
            <Card className="shadow overflow-hidden">
                <div 
                    className="d-flex align-items-center justify-content-center text-white"
                    style={{
                        height: '400px',
                        background: 'linear-gradient(135deg, #1e3a8a 0%, #7c3aed 100%)'
                    }}
                >
                    <div className="text-center">
                        <div className="display-1 mb-3">🏛️</div>
                        <p className="fs-4 fw-bold">2025 군산 국가유산 야행 </p>
                        <p className="fs-5">축제 포스터</p>
                    </div>
                </div>

                <Card.Body className="p-4">
                    <Card.Title className="fs-3 fw-bold mb-4 text-dark">축제 소개</Card.Title>
                    <Card.Text className="text-muted lh-lg mb-4">
                        군산 국가유산 야행은 군산 원도심 국가유산 일원에서 총 4일간 진행하는 야간 국가유산 향유 행사입니다.
                        한여름 밤, 원도심 국가유산 일원에서 빛과 소리, 예술과 이야기로 채워진 9夜(야) 테마 프로그램이 진행됩니다.
                    </Card.Text>

                    <div className="bg-primary bg-opacity-10 rounded p-4 mb-4">
                        <h3 className="fw-bold text-primary mb-3">축제 특징</h3>
                        <ul className="list-unstyled text-primary">
                            <li className="d-flex align-items-center mb-2">
                                <span 
                                    className="rounded-circle bg-primary me-3"
                                    style={{width: '8px', height: '8px'}}
                                ></span>
                                가족, 연인, 친구와 함께 즐기는 문화유산 체험
                            </li>
                            <li className="d-flex align-items-center mb-2">
                                <span 
                                    className="rounded-circle bg-primary me-3"
                                    style={{width: '8px', height: '8px'}}
                                ></span>
                                과거와 현재가 만나는 거리에서의 특별한 경험
                            </li>
                            <li className="d-flex align-items-center">
                                <span 
                                    className="rounded-circle bg-primary me-3"
                                    style={{width: '8px', height: '8px'}}
                                ></span>
                                문화유산 학습과 체험, 맛있는 먹거리와 공연
                            </li>
                        </ul>
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
}