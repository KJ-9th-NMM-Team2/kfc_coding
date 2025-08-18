import React from "react";
import "./Header.css";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <Navbar
      as={Container}
      className="bg-white text-dark py-2 align-items-center"
    >
      {/* 바로가기 링크 */}
      <Nav className="ms-3 me-auto d-flex align-items-center">
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <img src="/logos/mainlogo.png" className="mainLogo" alt="Main Logo" />
        </Navbar.Brand>
        <Nav.Link
          as={Link}
          to="/festivals"
          className="d-flex align-items-center fw-bold"
        >
          행사 찾기
        </Nav.Link>
      </Nav>
    </Navbar>
  );
}
