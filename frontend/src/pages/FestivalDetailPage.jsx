import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
import FestivalDetailHeroSection from '../components/FestivalDetailHeroSection.jsx';
import FestivalDetailDesc from '../components/FestivalDetailDesc.jsx';
import FestivalDeatilCard from '../components/FestivalDetailCard.jsx';
import FesivalDeatilSocialLinkCard from '../components/FestivalDetailSocialLinkCard.jsx';
import FestivalContactInfoCard from '../components/FesitvalContactInfoCard.jsx';
import { Container, Nav, Navbar, Row, Col } from 'react-bootstrap';
// import { useFestival } from '../components/FestivalDetailFindDBData.jsx';
import { useParams } from 'react-router-dom';

// 실제 API 데이터를 사용
const FestivalDetailPage = () => {
    const { id } = useParams(); // /festivals/abc 로 접속 -> id =abc 
    console.log("URL 에서 가져온 ID:", id);
    // const { festival, loading, error } = useFestival(id);

    const [festival, setFestival] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFestival = async () => {
            try {
                const endpoint = id ? `/api/festivals/${id}` : `/api/festivals`;
                const res = await fetch(endpoint);
                if (!res.ok) {
                    throw new Error(`API 요청 실패: ${res.status}`);
                }
                const data = await res.json();
                // id가 없을 때는 목록에서 첫 번째 항목을 사용
                setFestival(id ? data : (Array.isArray(data) ? data[0] : null));
            } catch (e) {
                setError(e.message);
            } finally {
                setLoading(false);
            }
        };
        fetchFestival();
    }, [id]);

    const formatDate = (iso) => {
        if (!iso) return '';
        try {
            const d = new Date(iso);
            if (Number.isNaN(d.getTime())) return String(iso).slice(0, 10);
            const yyyy = d.getFullYear();
            const mm = String(d.getMonth() + 1).padStart(2, '0');
            const dd = String(d.getDate()).padStart(2, '0');
            return `${yyyy}-${mm}-${dd}`;
        } catch {
            return String(iso).slice(0, 10);
        }
    };

    const festivalDates = festival ? [`${formatDate(festival.start_date)} ~ ${formatDate(festival.end_date)}`] : [];

    if (loading) {
        return (
            <Container fluid className="min-vh-100 bg-light d-flex align-items-center justify-content-center">
                <div>불러오는 중...</div>
            </Container>
        );
    }

    if (error) {
        return (
            <Container fluid className="min-vh-100 bg-light d-flex align-items-center justify-content-center">
                <div>에러: {error}</div>
            </Container>
        );
    }

    if (!festival) {
        return (
            <Container fluid className="min-vh-100 bg-light d-flex align-items-center justify-content-center">
                <div>표시할 축제 데이터가 없습니다.</div>
            </Container>
        );
    }
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
                        <FestivalDetailDesc festival={festival}/>
                    </Col>
                    <Col md={4}>
                        <div className="d-grid gap-3">
                            {/* Festival Details Card */}
                            <FestivalDeatilCard festival={festival}/>

                            {/* Social & Links Card */}
                            <FestivalDeatilSocialLinkCard festival={festival}/>

                            {/* Contact Info Card */}
                            <FestivalContactInfoCard festival={festival}/>
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