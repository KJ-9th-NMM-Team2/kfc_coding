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
            const ok = await authAdminToken(token);
            if (!ok) {
                navigate("/admin", { replace: true });
                return;
            }
            axios.defaults.headers.common.Authorization = `Bearer ${token}`;
        };
        bootstrap();
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

    // 필수 필드 간단 검증
    const required = (v) => v && String(v).trim().length > 0;
    const isDateInput = (s) => !s || /^\d{4}-\d{2}-\d{2}$/.test(s);

    const validate = () => {
        const errs = [];
        if (!required(festivalData.name)) errs.push("축제명은 필수입니다.");
        if (!required(festivalData.location)) errs.push("개최 장소는 필수입니다.");
        if (!isDateInput(festivalData.start_date)) errs.push("시작일 형식이 올바르지 않습니다(YYYY-MM-DD).");
        if (!isDateInput(festivalData.end_date)) errs.push("종료일 형식이 올바르지 않습니다(YYYY-MM-DD).");
        return errs;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const errs = validate();
        if (errs.length) {
            alert(errs.join("\n"));
            return;
        }

        // 서버는 body.id를 읽음
        const payloadForSubmit = { id: editId, ...festivalData };

        try {
            await axios.post("/api/admin/editfestivalpage", payloadForSubmit, {
                headers: { Authorization: `Bearer ${token}` },
            });
            alert("수정이 완료되었습니다.");
            navigate("/admin/mainpage", { replace: true });
        } catch (err) {
            console.error("UPDATE ERROR(editfestivalpage):", {
                status: err?.response?.status,
                data: err?.response?.data,
                message: err?.message,
                requestUrl: "/api/admin/editfestivalpage",
                payload: payloadForSubmit, // ← 존재하는 변수만 참조
            });
            const msg =
                err?.response?.data?.message ||
                err?.response?.data?.error ||
                (typeof err?.response?.data === "string" ? err.response.data : "") ||
                err?.message ||
                "수정 중 오류가 발생했습니다.";
            alert(msg);
        }
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
                        requiredStatus
                    />
                    <AdminCreateForm
                        controlId="formGridLocation"
                        title="개최 장소"
                        name="location"
                        onChange={handlers.inputChange}
                        value={festivalData.location}
                        requiredStatus
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
                    type="textarea"
                />

                <Row className="mb-3">
                    <AdminCreateForm
                        controlId="formStartDate"
                        title="시작일"
                        name="start_date"
                        onChange={handlers.inputChange}
                        value={festivalData.start_date}
                        type="date"
                    />
                    <AdminCreateForm
                        controlId="formEndDate"
                        title="종료일"
                        name="end_date"
                        onChange={handlers.inputChange}
                        value={festivalData.end_date}
                        type="date"
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
                    <Button type="button" variant="outline-secondary" onClick={handlers.addImageField}>
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