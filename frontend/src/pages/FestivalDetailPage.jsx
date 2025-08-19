import { useEffect, useState } from "react";
// import { useParams } from 'react-router-dom';
import FestivalDetailHeroSection from "../components/FestivalDetailHeroSection.jsx";
import FestivalDetailDesc from "../components/FestivalDetailDesc.jsx";
import FestivalDetailCard from "../components/FestivalDetailCard.jsx";
import FestivalDetailSocialLinkCard from "../components/FestivalDetailSocialLinkCard.jsx";
import FestivalContactInfoCard from "../components/FesitvalContactInfoCard.jsx";
import FestivalDetailOthers from "../components/FestivalDetailOthers.jsx";
import FestivalDetailMap from "../components/FestivalDetailMap.jsx";
import { Container, Row, Col } from "react-bootstrap";
// import { useFestival } from '../components/FestivalDetailFindDBData.jsx';
import { useParams } from "react-router-dom";

//[08.19] 컴포넌트 추가
import FestivalDetailShortDesc from "../components/FestivalDetailShortDesc.jsx";

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
  }, [id]);

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
      {/* Main Content */}
      <Container className="py-5">
        <Row>
          {/* Hero Section - 썸네일 렌더링 */}
          <FestivalDetailHeroSection festival={festival} />

          {/* ShortDescription 부분 */}
          <FestivalDetailShortDesc festival={festival} />
        </Row>

        <Row>
          {/* 축제 메인 포스터 렌더링 */}
          <FestivalDetailDesc festival={festival} />

          <div className="d-grid gap-3">
            {/* 위치,가격,주최,문의 */}
            <FestivalDetailCard festival={festival} />
          </div>
        </Row>

        <Row>
          {/* 길찾기 부분 - API Key사용 */}
          <FestivalDetailMap location={festival?.location} />
        </Row>
        <Row>
          {/* 이런 축제는 어때요? 부분 */}
          <FestivalDetailOthers id={festival?._id} />
        </Row>
        <Row lg={11}>
          {/* Contact Info Card */}
          <FestivalContactInfoCard festival={festival} />
        </Row>
      </Container>
    </>
  );
};

export default FestivalDetailPage;
