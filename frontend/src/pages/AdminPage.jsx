import { useState } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AdminCreateForm } from "../components/admin/AdminCreateForm";
import Handlers from "../components/handler/AdminHandler";

import axios from "axios";

export default function AdminPage() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handlers = Handlers(setId);

  return (
    <Container
      fluid
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "80vh" }}
    >
      <Row>
        <Col>
          <Card
            style={{ width: "25rem" }}
            className="p-4 shadow-lg border-0 rounded-4"
          >
            <Card.Body>
              <Card.Title as="h2" className="text-center mb-4 fw-bold">
                관리자 로그인
              </Card.Title>
              <Form
                onSubmit={async (e) => {
                  const result = await handlers.loginButtonSubmit(
                    e,
                    id,
                    password
                  );
                  if (result) {
                    navigate("/admin/mainpage", { replace: true });
                  }
                }}
              >
                <AdminCreateForm
                  controlId="formBasicId"
                  title="아이디"
                  value={id}
                  name=""
                  type="text"
                  onChange={(e) => setId(e.target.value.trim())}
                />
                <AdminCreateForm
                  controlId="formBasicPassword"
                  title="비밀번호"
                  value={password}
                  name=""
                  type="password"
                  onChange={(e) => setPassword(e.target.value.trim())}
                />

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
