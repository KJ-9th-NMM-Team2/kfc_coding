import React, { useState, useEffect, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Container, Form, Button, Row, Spinner } from "react-bootstrap";
import { authAdminToken } from "../api/api";
import axios from "axios";
import { initialFestivalData } from "../components/InitialFestivalData.jsx";
import { AdminCreateForm } from "../components/admin/AdminCreateForm.jsx";
import Handlers from "../components/handler/AdminHandler.jsx";


const toDateInput = (v) => {
    if (!v) return "";
    const d = new Date(v);
    if (Number.isNaN(d.getTime())) return "";
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
};

export default function AdminEditFestivalPage() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const editId = searchParams.get("edit");

    const [festivalData, setFestivalData] = useState(initialFestivalData);
    const [loading, setLoading] = useState(true);
    const handlers = Handlers(setFestivalData);
    const token = useMemo(() => localStorage.getItem("admin"), []);

    // 인증 및 axios 헤더 세팅
    useEffect(() => {
        const bootstrap = async () => {
            if (!token) {
                alert("로그인이 필요합니다.");
                navigate("/admin", { replace: true });
                return;
            }
            if (!(await authAdminToken(token))) {
                navigate("/admin", { replace: true });
                return;
            }
            axios.defaults.headers.common.Authorization = `Bearer ${token}`;
        };
        bootstrap();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // 수정 대상 로딩
    useEffect(() => {
        const fetchFestival = async () => {
            if (!editId) {
                alert("수정할 항목의 ID가 없습니다.");
                navigate("/admin/mainpage", { replace: true });
                return;
            }
            try {
                const { data } = await axios.get(`/api/festivals/${editId}`);
                const patched = {
                    ...initialFestivalData,
                    ...data,
                    start_date: toDateInput(data.start_date),
                    end_date: toDateInput(data.end_date),
                    images: Array.isArray(data.images) ? data.images : [],
                };
                setFestivalData(patched);
            } catch (e) {
                alert("대상을 불러오지 못했습니다.");
                navigate("/admin/mainpage", { replace: true });
                return;
            } finally {
                setLoading(false);
            }
        };
        fetchFestival();
    }, [editId, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // 서버 규약에 맞게 엔드포인트 선택
            // 1) 권장 REST: PUT /api/admin/festivals/:id
            await axios.put(`/api/admin/festivals/${editId}`, festivalData, {
                headers: { Authorization: `Bearer ${token}` },
            });

            // 2) 만약 기존에 /api/admin/updateFestival 형태라면 아래로 교체
            // await axios.post(`/api/admin/updateFestival`, { id: editId, ...festivalData }, {
            //   headers: { Authorization: `Bearer ${token}` },
            // });

            alert("수정이 완료되었습니다.");
            navigate("/admin/mainpage", { replace: true });
        } catch (e) {
            const msg = e?.response?.data?.message || "수정 중 오류가 발생했습니다.";
            alert(msg);
        }
    };

    if (loading) {
        return (
            <Container className="py-5 d-flex justify-content-center">
                <Spinner animation="border" />
            </Container>
        );
    }
    return (
        <Container className="my-5">
            <h2 className="mb-4">축제 정보 수정</h2>
            <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <AdminCreateForm
                        controlId="formGridName"
                        title="축제명"
                        name="name"
                        onChange={handlers.inputChange}
                        value={festivalData.name}
                        requiredStatus={true}
                    />
                    <AdminCreateForm
                        controlId="formGridLocation"
                        title="개최 장소"
                        name="location"
                        onChange={handlers.inputChange}
                        value={festivalData.location}
                        requiredStatus={true}
                    />
                </Row>

                <AdminCreateForm
                    controlId="formShortDescription"
                    title="한 줄 소개"
                    name="short_description"
                    onChange={handlers.inputChange}
                    value={festivalData.short_description}
                />
                <AdminCreateForm
                    controlId="formDescription"
                    title="축제 설명"
                    name="description"
                    onChange={handlers.inputChange}
                    value={festivalData.description}
                    type={"textarea"}
                />

                <Row className="mb-3">
                    <AdminCreateForm
                        controlId="formStartDate"
                        title="시작일"
                        name="start_date"
                        onChange={handlers.inputChange}
                        value={festivalData.start_date}
                        type={"date"}
                    />
                    <AdminCreateForm
                        controlId="formEndDate"
                        title="종료일"
                        name="end_date"
                        onChange={handlers.inputChange}
                        value={festivalData.end_date}
                        type={"date"}
                    />
                </Row>

                <Row className="mb-3">
                    <AdminCreateForm
                        controlId="formPrice"
                        title="입장료"
                        name="price"
                        onChange={handlers.inputChange}
                        value={festivalData.price}
                    />
                    <AdminCreateForm
                        controlId="formOwner"
                        title="주체 기관"
                        name="owner"
                        onChange={handlers.inputChange}
                        value={festivalData.owner}
                    />
                    <AdminCreateForm
                        controlId="formContact"
                        title="연락처"
                        name="contact"
                        onChange={handlers.inputChange}
                        value={festivalData.contact}
                    />
                </Row>

                <AdminCreateForm
                    controlId="formWebsite"
                    title="공식 홈페이지"
                    name="website"
                    onChange={handlers.inputChange}
                    value={festivalData.website}
                />

                <Row className="mb-3">
                    <AdminCreateForm
                        controlId="formPosterUrl"
                        title="포스터 사진"
                        name="poster_url"
                        onChange={handlers.inputChange}
                        value={festivalData.poster_url}
                    />
                    <AdminCreateForm
                        controlId="formThumbnailUrl"
                        title="썸네일 사진"
                        name="thumbnail_url"
                        onChange={handlers.inputChange}
                        value={festivalData.thumbnail_url}
                    />
                </Row>

                <Form.Group className="mb-3">
                    <Form.Label>이미지 URL</Form.Label>
                    {festivalData.images.map((image, index) => (
                        <div key={index} className="mb-2">
                            <Form.Control
                                type="text"
                                value={image}
                                onChange={(e) => handlers.imageChange(e, index, festivalData)}
                            />
                        </div>
                    ))}
                    <Button variant="outline-secondary" onClick={handlers.addImageField}>
                        이미지 필드 추가
                    </Button>
                </Form.Group>

                <Row className="mb-3">
                    <AdminCreateForm
                        controlId="formRegion"
                        title="지역"
                        name="region"
                        onChange={handlers.inputChange}
                        value={festivalData.region}
                    />
                    <AdminCreateForm
                        controlId="formCategory"
                        title="카테고리"
                        type="radio"
                        onChange={handlers.categoryChange}
                        value={festivalData.category}
                        festivalData={festivalData}
                    />
                </Row>

                <Button variant="primary" type="submit">
                    축제 수정
                </Button>
            </Form>
        </Container>
    );
}
