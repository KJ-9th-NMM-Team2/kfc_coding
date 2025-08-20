// src/pages/AdminMainPage.jsx
import { useEffect, useMemo, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col, Card, Button, Table, Badge, Spinner, Alert } from "react-bootstrap";

export default function AdminMainPage() {
    const navigate = useNavigate();
    const [festivals, setFestivals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [authChecking, setAuthChecking] = useState(true);
    const token = useMemo(() => localStorage.getItem("admin"), []);

    const isAuthed = !!token;

    // 통계
    const totalCount = festivals.length;
    const ongoingCount = useMemo(() => {
        const now = new Date();
        return festivals.filter((f) => f.end_date && new Date(f.end_date) >= now).length;
    }, [festivals]);

    useEffect(() => {
        const checkAuth = async () => {
            if (!isAuthed) {
                setAuthChecking(false);
                return;
            }
            try {
                await axios.post("/api/admin/authToken");
            } catch {
                localStorage.removeItem("admin");
                navigate("/admin", { replace: true });
                return;
            } finally {
                setAuthChecking(false);
            }
        };

        const fetchFestivals = async () => {
            try {
                const res = await axios.get("/api/festivals");
                const list = res.data?.festivals ?? res.data ?? [];
                setFestivals(list);
            } catch {
                setFestivals([]);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
        fetchFestivals();
    }, [isAuthed, navigate]);

    const handleLogout = () => {
        localStorage.removeItem("admin");
        delete axios.defaults.headers.common["Authorization"];
        navigate("/admin", { replace: true });
    };

    const handleCreate = () => {
        navigate("/admin/createFestival");
    };

    const handleEdit = (id) => {
        navigate(`/admin/createFestival?edit=${id}`);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("정말 삭제하시겠습니까?")) return;
        try {
            await axios.delete(`/api/admin/festivals/${id}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("admin")}` }
            });
            setFestivals((prev) => prev.filter((f) => f._id !== id));
        } catch (e) {
            console.error(e);
            alert(e?.response?.data?.message || "삭제 중 오류가 발생했습니다.");
        }
    };

    if (authChecking) {
        return (
            <Container className="py-5 d-flex justify-content-center">
                <Spinner animation="border" />
            </Container>
        );
    }

    return (
        <Container fluid className="py-4">
            <Row className="align-items-center mb-3">
                <Col>
                    <h2 className="mb-1">
                        관리자 페이지{" "}
                        {isAuthed ? <Badge bg="success" className="ms-2">인증됨</Badge> : <Badge bg="secondary" className="ms-2">미인증</Badge>}
                    </h2>
                </Col>
                <Col xs="auto" className="d-flex gap-2">
                    {isAuthed ? (
                        <>
                            <Button variant="primary" onClick={handleCreate}>새 축제 생성</Button>
                            <Button variant="outline-danger" onClick={handleLogout}>로그아웃</Button>
                        </>
                    ) : (
                        <Button as={Link} to="/admin" variant="primary">로그인</Button>
                    )}
                </Col>
            </Row>

            <Row className="g-4">
                <Col md={4}>
                    <Card className="h-100 shadow-sm border-0 rounded-4">
                        <Card.Body>
                            <Card.Title className="mb-3">요약 통계</Card.Title>
                            {loading ? (
                                <Spinner animation="border" />
                            ) : (
                                <Row>
                                    <Col xs={6} className="mb-3">
                                        <div className="text-muted small">총 축제 수</div>
                                        <div className="fs-3 fw-bold">{totalCount}</div>
                                    </Col>
                                    <Col xs={6} className="mb-3">
                                        <div className="text-muted small">진행중</div>
                                        <div className="fs-3 fw-bold">{ongoingCount}</div>
                                    </Col>
                                </Row>
                            )}
                        </Card.Body>
                    </Card>
                </Col>

            </Row>

            <Row className="g-4 mt-1">
                <Col>
                    <Card className="shadow-sm border-0 rounded-4">
                        <Card.Body>
                            <Card.Title className="mb-3">축제 리스트</Card.Title>
                            {loading ? (
                                <Spinner animation="border" />
                            ) : festivals.length === 0 ? (
                                <div className="text-muted">표시할 항목이 없습니다.</div>
                            ) : (
                                <div className="table-responsive">
                                    <Table hover className="align-middle">
                                        <thead>
                                            <tr>
                                                <th>이름</th>
                                                <th>지역</th>
                                                <th>장소</th>
                                                <th>시작일</th>
                                                <th>종료일</th>
                                                <th style={{ width: 220 }}>작업</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {festivals.map((f) => (
                                                <tr key={f._id}>
                                                    <td>{f.name}</td>
                                                    <td>{f.region}</td>
                                                    <td>{f.location}</td>
                                                    <td>{f.start_date ? new Date(f.start_date).toLocaleDateString() : "-"}</td>
                                                    <td>{f.end_date ? new Date(f.end_date).toLocaleDateString() : "-"}</td>
                                                    <td>
                                                        <div className="d-flex gap-2">
                                                            <Button as={Link} to={`/festivals/${f._id}`} size="sm" variant="outline-secondary">
                                                                상세
                                                            </Button>
                                                            {isAuthed && (
                                                                <>
                                                                    <Button size="sm" variant="outline-primary" onClick={() => handleEdit(f._id)}>
                                                                        수정
                                                                    </Button>
                                                                    <Button size="sm" variant="danger" onClick={() => handleDelete(f._id)}>
                                                                        삭제
                                                                    </Button>
                                                                </>
                                                            )}
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </div>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}
