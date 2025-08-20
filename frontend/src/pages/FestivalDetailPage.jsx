import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FestivalDetailHeroSection from "../components/FestivalDetailHeroSection.jsx";
import FestivalDetailDesc from "../components/FestivalDetailDesc.jsx";
import FestivalDetailCard from "../components/FestivalDetailCard.jsx";
import FestivalDetailSocialLinkCard from "../components/FestivalDetailSocialLinkCard.jsx";
import FestivalContactInfoCard from "../components/FesitvalContactInfoCard.jsx";
import FestivalDetailOthers from "../components/FestivalDetailOthers.jsx";
import FestivalDetailMap from "../components/FestivalDetailMap.jsx";
import { Card, Container, Row, Col } from "react-bootstrap";
import FestivalDetailShortDesc from "../components/FestivalDetailShortDesc.jsx";
import "./FestivalDetailPage.css";

// import { useFestival } from '../components/FestivalDetailFindDBData.jsx';

// 실제 API 데이터를 사용
const FestivalDetailPage = () => {
  const { id } = useParams(); // /festivals/abc 로 접속 -> id =abc

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
        setFestival(id ? data : Array.isArray(data) ? data[0] : null);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchFestival();
    window.scrollTo(0, 0); // 페이지 상단 스크롤
  }, [id]);

  useEffect(() => {
    if (festival?.thumbnail_url) {
      document.body.style.width = "100%";
      document.body.style.backgroundImage = `url(${festival.thumbnail_url})`;
      document.body.style.backgroundSize = "cover";
      document.body.style.backgroundPosition = "center";
      document.body.style.backgroundRepeat = "no-repeat";
      document.body.style.backgroundAttachment = "fixed";
    }

    // 헤더를 투명하게 만들고 텍스트를 흰색으로 변경
    const header = document.querySelector(".Header");
    if (header) {
      header.style.background = "transparent";
      header.style.backgroundColor = "transparent";
      header.classList.remove("bg-white");
      header.classList.add("text-white");

      // 네비게이션 링크들도 흰색으로
      const navLinks = header.querySelectorAll(".nav-link, .navbar-brand");
      navLinks.forEach((link) => {
        link.style.color = "white";
        link.classList.add("text-white");
      });

      // 로고 이미지 색상 반전
      const logo = header.querySelector(".mainLogo");
      if (logo) {
        logo.style.filter = "invert(1) brightness(1)";
      }
    }

    return () => {
      document.body.style.width = "";
      document.body.style.backgroundImage = "";
      document.body.style.backgroundSize = "";
      document.body.style.backgroundPosition = "";
      document.body.style.backgroundRepeat = "";
      document.body.style.backgroundAttachment = "";

      // 헤더 스타일 원복
      const header = document.querySelector(".Header");
      if (header) {
        header.style.background = "";
        header.style.backgroundColor = "";
        header.classList.add("bg-white");
        header.classList.remove("text-white");

        const navLinks = header.querySelectorAll(".nav-link, .navbar-brand");
        navLinks.forEach((link) => {
          link.style.color = "";
          link.classList.remove("text-white");
        });

        // 로고 이미지 색상 원복
        const logo = header.querySelector(".mainLogo");
        if (logo) {
          logo.style.filter = "";
        }
      }
    };
  }, [festival?.thumbnail_url]);

  // 날짜 YYYY--MM--DD 형식으로 변환 함수 정의
  const formatDate = (iso) => {
    if (!iso) return "";
    try {
      const d = new Date(iso);
      const yyyy = d.getFullYear();
      const mm = String(d.getMonth() + 1).padStart(2, "0");
      const dd = String(d.getDate()).padStart(2, "0");
      return `${yyyy}.${mm}.${dd}`; // 여기서 . 으로 구분
    } catch {
      return String(iso).slice(0, 10).replace(/-/g, ".");
    }
  };
  if (loading) {
    return (
      <Container
        fluid
        className="min-vh-100 bg-light d-flex align-items-center justify-content-center"
      >
        <div>불러오는 중...</div>
      </Container>
    );
  }

  // Festival 데이터가 있으면 시작일~종료일 배열 생성
  // 없으면 빈 배열 반환
  const festivalDates = festival
    ? [`${formatDate(festival.start_date)} ~ ${formatDate(festival.end_date)}`]
    : [];

  // 에러처리
  if (error) {
    return (
      <Container
        fluid
        className="min-vh-100 bg-light d-flex align-items-center justify-content-center"
      >
        <div>에러: {error}</div>
      </Container>
    );
  }

  return (
    <>
      {/* Spacer to push content down initially */}
      <div style={{ height: "95vh" }}></div>

      {/* Main Content */}
      <div className="content-container">
        <Container className="festivalDetailPage pt-5">
          <Row>
            {/* ShortDescription 부분 */}
            <FestivalDetailShortDesc festival={festival} />
          </Row>
          <Row>
            <Col md={4}>
              {/* 축제 메인 포스터 렌더링 */}
              <FestivalDetailDesc festival={festival} />
            </Col>

            <Col md={8} className="d-grid gap-3">
              {/* 날짜,위치,가격,주최,문의,홈페이지 */}
              <FestivalDetailCard festival={festival} />
            </Col>
          </Row>

          {/* 길찾기 부분 */}
          <Row className="mt-4">
            <FestivalDetailMap location={festival?.location} />
          </Row>
          <Row>
            <FestivalDetailOthers id={festival?._id} />
          </Row>
          <Row>
            <Col lg={11}>
              {/* Contact Info Card */}
              <FestivalContactInfoCard festival={festival} />
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default FestivalDetailPage;
