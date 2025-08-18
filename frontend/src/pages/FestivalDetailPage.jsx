import React from 'react';
import FestivalDetailHeroSection from '../components/FestivalDeatilHeroSection.jsx';
import FestivalDetailDesc from '../components/FestivalDetailDesc.jsx';
import FestivalDeatilCard from '../components/FestivalDeatilCard.jsx';
import FestivalDeatilSocialLinkCard from '../components/FestivalDeatilSocialLinkCard.jsx';
import FestivalContactInfoCard from '../components/FesitvalContactInfoCard.jsx';
import { Container, Nav, Navbar, Row, Col } from 'react-bootstrap';

// Mock 데이터 테스트
const festivalDetailMock = [
  {
    name: '군산 국가유산 야행',
    'short-description': '빛과 소리로 물드는 군산 원도심의 야간 축제',
    start_date: '2025-08-01',
    end_date: '2025-08-04'
  }
];


const FestivalDetailPage = () => {
    const festival = festivalDetailMock[0];
    const festivalDates = festival ? [`${festival.start_date} ~ ${festival.end_date}`] : [];

    return (
        <Container fluid className="min-vh-100 bg-light">
            {/* Navigation Bar */}
            <Navbar bg="white" expand="lg" className="shadow-sm">
                <Container>
                    <Navbar.Brand className="fs-4 fw-bold text-primary">대한민국 구석구석</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <Nav.Link>지역축제</Nav.Link>
                            <Nav.Link>문화유산</Nav.Link>
                            <Nav.Link>관광정보</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {/* Hero Section */}
            <FestivalDetailHeroSection festival={festival} festivalDates={festivalDates} />

            {/* Main Content */}
            <Container className="py-5">
                <Row>
                    <Col md={8}>
                        {/* Festival 소개 */}
                        <FestivalDetailDesc />
                    </Col>
                    <Col md={4}>
                        <div className="d-grid gap-3">
                            {/* Festival Details Card */}
                            <FestivalDeatilCard />

                            {/* Social & Links Card */}
                            <FestivalDeatilSocialLinkCard />

                            {/* Contact Info Card */}
                            <FestivalContactInfoCard />
                        </div>
                    </Col>
                </Row>
            </Container>

            {/* Footer */}
        <footer>
            <Container>
                <Row> 
                <Col className="mb-2">군산 국가유산 야행과 함께하는 특별한 여름밤</Col>
                <Col>
                    문화유산과 현대가 어우러진 독특한 경험을 선사합니다
                </Col>
                </Row>
            </Container>
        </footer>
        </Container>
    );
};

export default FestivalDetailPage;