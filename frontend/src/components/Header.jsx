import React from "react";
import "./Header.css";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <Navbar className="sticky-top bg-white text-dark py-2 align-items-center Header">
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
          전국축제
        </Nav.Link>
        <Nav.Link
          as={Link}
          to="/calendar"
          className="d-flex align-items-center fw-bold"
        >
          축제달력
        </Nav.Link>
      </Nav>
    </Navbar>
  );
}
