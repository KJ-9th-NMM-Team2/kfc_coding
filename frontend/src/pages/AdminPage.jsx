import { useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function AdminPage() {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        // TODO: 여기에 실제 로그인 처리 로직을 추가합니다.
        // 예: API 호출, 상태 업데이트 등
        try {
            const res = await axios.post('/api/admin/login', {
                id, password
            });
            const token = res.data.token;
            // 1. 웹 브라우저의 로컬 스토리지에 저장
            localStorage.setItem('admin', token);

            // 2. 이후 요청에 자동으로 토큰을 포함시키기 위해 axios 기본 헤더 설정
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            navigate("/admin/mainpage", { replace: true });
        } catch (error) {
            if (error.response && error.response.status === 401) {
                alert("아이디 혹은 비밀번호가 일치하지 않습니다.");
            } else {
                alert("로그인 중 오류가 발생했습니다.");
            }
        }
    };

    return (
        <Container fluid className="d-flex align-items-center justify-content-center" style={{ minHeight: '80vh' }}>
            <Row>
                <Col>
                    <Card style={{ width: '25rem' }} className="p-4 shadow-lg border-0 rounded-4">
                        <Card.Body>
                            <Card.Title as="h2" className="text-center mb-4 fw-bold">관리자 로그인</Card.Title>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3" controlId="formBasicId">
                                    <Form.Label className="fw-semibold">아이디</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="아이디를 입력하세요"
                                        value={id}
                                        onChange={(e) => setId(e.target.value.trim())}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-4" controlId="formBasicPassword">
                                    <Form.Label className="fw-semibold">비밀번호</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="비밀번호를 입력하세요"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value.trim())}
                                        required
                                    />
                                </Form.Group>

                                <div className="d-grid">
                                    <Button variant="primary" type="submit" size="lg">
                                        로그인
                                    </Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}