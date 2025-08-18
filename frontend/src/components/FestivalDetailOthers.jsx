import { useState, useEffect } from "react";
import { Card, Row, Col } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

/* 왜 여기서 Link를 클릭하면 들어가지지 않을까.....분명 onClick은 발생하는데 내일 해결해야 할 문제 */
/* 왜 여기서 Link를 클릭하면 들어가지지 않을까.....분명 onClick은 발생하는데 내일 해결해야 할 문제 */
/* 왜 여기서 Link를 클릭하면 들어가지지 않을까.....분명 onClick은 발생하는데 내일 해결해야 할 문제 */

/* 왜 여기서 Link를 클릭하면 들어가지지 않을까.....분명 onClick은 발생하는데 내일 해결해야 할 문제 */

/* 왜 여기서 Link를 클릭하면 들어가지지 않을까.....분명 onClick은 발생하는데 내일 해결해야 할 문제 */
/* 왜 여기서 Link를 클릭하면 들어가지지 않을까.....분명 onClick은 발생하는데 내일 해결해야 할 문제 */
/* 왜 여기서 Link를 클릭하면 들어가지지 않을까.....분명 onClick은 발생하는데 내일 해결해야 할 문제 */
/* 왜 여기서 Link를 클릭하면 들어가지지 않을까.....분명 onClick은 발생하는데 내일 해결해야 할 문제 */


export default function FestivalRecommendationSection({id}) {
    const [festivals, setFestivals] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

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

    // console.log(festivals);
    // 데이터가 있을 때만 로그 출력
    // useEffect(() => {
    //     if (festivals.length > 0) {
    //         console.log(festivals[0].poster_url);
    //         console.log(festivals[0].name);
    //     }
    // }, [festivals]);

    // 로딩 중일 때
    if (loading) {
        return (
            <section className="my-5">
                <h4 className="fw-bold mb-4">이런 축제는 어때요?</h4>
                <div className="text-center">
                    <p>축제 정보를 불러오는 중...</p>
                </div>
            </section>
        );
    }

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
                            style={{
                                textDecoration: 'none',
                                color: 'inherit',
                                // display: 'block' // 중요: Link를 블록 요소로 만들기
                            }}
                            onClick={(e) => {
                                console.log('Link clicked!', festival._id);
                                // 클릭 이벤트가 발생하는지 확인
                            }}
                        >
                            <Card className="h-100 border-0 shadow-sm">
                                <Card.Img
                                    src={festival.poster_url}
                                    alt={festival.name}
                                    style={{ 
                                        height: '200px', 
                                        objectFit: 'cover',
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