import { useState, useEffect } from "react";
import { Card, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Loading from "./Loading";

import axios from "axios";

export default function FestivalRecommendationSection({ id }) {
  const [festivals, setFestivals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFestivals() {
      try {
        setLoading(true);
        const response = await axios(`/api/festivals/doing3/${id}`);

        if (Array.isArray(response.data)) {
          setFestivals(response.data);
          console.log("Festivals loaded:", response.data.length);
        } else {
          console.log("API에서 배열 형태의 데이터를 반환하지 않습니다.");
          setFestivals([]);
        }
      } catch (error) {
        console.log("Error fetching festivals:", error);
        setFestivals([]);
      } finally {
        setLoading(false);
      }
    }
    fetchFestivals();
  }, []);

  <Loading loading={loading} />;

  // 데이터가 없을 때
  if (festivals.length === 0) {
    return (
      <section className="my-5">
        <h4 className="fw-bold mb-4">이런 축제는 어때요?</h4>
        <div className="text-center">
          <p>추천할 축제 정보가 없습니다.</p>
        </div>
      </section>
    );
  }

  console.log(festivals);

  return (
    <section className="my-5">
      {/* 제목 */}
      <h4 className="fw-bold mb-4">이런 축제는 어때요?</h4>

      {/* 카드 리스트 */}
      <Row xs={1} md={3} className="g-4">
        {festivals.map((festival, index) => (
          <Col key={index}>
            <Link
              to={`/festivals/${festival._id}`}
              style={{ textDecoration: "none" }}
            >
              <Card className="h-100 border-0 shadow-sm">
                <Card.Img
                  src={festival.thumbnail_url}
                  alt={festival.name}
                  style={{
                    height: "200px",
                    objectFit: "cover",
                  }}
                />
                <Card.Body className="text-center">
                  <Card.Title className="fw-bold fs-5">
                    {festival.name}
                  </Card.Title>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </section>
  );
}
