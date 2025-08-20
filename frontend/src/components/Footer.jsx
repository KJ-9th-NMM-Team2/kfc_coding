import React from "react";
import { Container, Row, Col, Nav } from "react-bootstrap";
import "./Footer.css";

export default function Footer() {
  return (
    <footer role="contentinfo" className="bg-white">
      <Container className="py-4">
        {/* 상단 링크 */}
        <Row className="mb-1">
          <Col>
            <a
              href="https://knto.or.kr/helpdeskPolicyPrivacyHomepage"
              target="_blank"
              title="개인정보처리방침"
              className="me-3 text-decoration-none fw-bold"
            >
              개인정보처리방침
            </a>

            <a
              href="https://korean.visitkorea.or.kr/term/term01.do"
              target="_blank"
              title="위치기반 서비스 이용약관"
              className="me-3 text-decoration-none text-muted"
            >
              위치기반 서비스 이용약관
            </a>

            <a
              href="https://korean.visitkorea.or.kr/term/term04.do"
              target="_blank"
              title="개인위치정보 처리방침"
              className="me-3 text-decoration-none text-muted"
            >
              개인위치정보 처리방침
            </a>

            <a
              href="https://knto.or.kr/helpdeskCopyrightguide"
              target="_blank"
              title="저작권정책"
              className="me-3 text-decoration-none text-muted"
            >
              저작권정책
            </a>

            <a
              href="https://knto.or.kr/charter"
              target="_blank"
              title="고객서비스헌장"
              className="me-3 text-decoration-none text-muted"
            >
              고객서비스헌장
            </a>

            <a
              href="https://knto.or.kr/helpdeskPolicyEmailrejection"
              target="_blank"
              title="전자우편무단수집거부"
              className="me-3 text-decoration-none text-muted"
            >
              전자우편무단수집거부
            </a>

            <a
              href="https://knto.or.kr/mapHead"
              target="_blank"
              title="찾아오시는 길"
              className="me-3 text-decoration-none text-muted"
            >
              찾아오시는 길
            </a>

            <a
              href="/kfes/common/faq.do"
              className="me-3 text-decoration-none text-muted fw-bold"
            >
              자주 묻는 질문
            </a>
          </Col>
        </Row>

        {/* 주소 정보 */}
        <Row className="mb-1 border-bottom text-muted">
          <Col as="address">
            <span className="me-3">우)26464 강원도 원주시 세계로 10</span>
            <span className="me-3">
              TEL:{" "}
              <a
                href="tel:033-738-3000"
                className="text-muted text-decoration-none"
              >
                033-738-3000
              </a>
            </span>
            <span className="me-3">사업자등록번호: 202-81-50707</span>
            <span className="me-3">통신판매업신고: 제2022-강원원주-0381호</span>
          </Col>
        </Row>

        {/* 하단 로고 및 저작권 */}
        <Row className="align-items-center">
          <Col md="6">
            <span className="text-muted">© 한국관광공사</span>
          </Col>
          <Col md="6">
            <Nav className="justify-content-end">
              <Nav.Item>
                <Nav.Link
                  href="https://www.wa.or.kr/board/list.asp?search=total&amp;SearchString=%B4%EB%C7%D1%B9%CE%B1%B9%20%B1%B8%BC%AE%B1%B8%BC%AE&amp;BoardID=0006"
                  target="_blank"
                >
                  <img
                    src="/logos/f_logo1.png"
                    alt="과학기술정보통신부 WEB접근성"
                    className="d-none d-md-inline bigIcon"
                  />
                  <img
                    src="/logos/f_logo1_m.png"
                    alt="과학기술정보통신부 WEB접근성"
                    className="d-inline d-md-none smallIcon"
                  />
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  href="https://conlab.visitkorea.or.kr"
                  target="_blank"
                >
                  <img
                    src="/logos/f_logo2.png"
                    alt="콘랩"
                    className="d-none d-md-inline bigIcon"
                  />
                  <img
                    src="/logos/f_logo2_m.png"
                    alt="콘랩"
                    className="d-inline d-md-none smallIcon"
                  />
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="https://kto.visitkorea.or.kr" target="_blank">
                  <img
                    src="/logos/f_logo3.png"
                    alt="한국관광공사"
                    className="d-none d-md-inline bigIcon"
                  />
                  <img
                    src="/logos/f_logo3_m.png"
                    alt="한국관광공사"
                    className="d-inline d-md-none smallIcon"
                  />
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="https://www.mcst.go.kr" target="_blank">
                  <img
                    src="/logos/f_logo4.png"
                    alt="문화체육관광부"
                    className="d-none d-md-inline bigIcon"
                  />
                  <img
                    src="/logos/f_logo4_m.png"
                    alt="문화체육관광부"
                    className="d-inline d-md-none smallIcon"
                  />
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
