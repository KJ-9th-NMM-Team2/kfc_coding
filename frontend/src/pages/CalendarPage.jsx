import React from "react";
import Calendar from "../components/Calendar";
import { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  ButtonGroup,
} from "react-bootstrap";
import Badge from "react-bootstrap/Badge";
import FestivalVisualList from "../components/FestivalVisualList";
import { getDateFestivals } from "../api/api";
import "./CalendarPage.css";

export default function CalendarPage() {
  // 현재 날짜를 state로 관리
  const [currentDate, setCurrentDate] = useState(new Date());
  const [todayFestivals, setTodayFestivals] = useState([]);

  // 현재 날짜의 축제 목록
  useEffect(() => {
    getDateFestivals(currentDate).then(setTodayFestivals);
  }, [currentDate]);

  // 연도, 월, 일 정보 추출
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const day = currentDate.getDate();

  // 이전 월로 이동
  const toPrevMonth = () => {
    let newMonth = currentDate.getMonth() - 1;
    let newYear = currentDate.getFullYear();
    if (newMonth < 0) {
      newMonth = 11;
      newYear -= 1;
    }
    const currentDay = currentDate.getDate();
    const lastDayOfTargetMonth = new Date(newYear, newMonth + 1, 0).getDate();
    const newDay = Math.min(currentDay, lastDayOfTargetMonth);
    const newDate = new Date(newYear, newMonth, newDay);
    setCurrentDate(newDate);
  };

  // 다음 월로 이동
  const toNextMonth = () => {
    let newMonth = currentDate.getMonth() + 1;
    let newYear = currentDate.getFullYear();
    if (newMonth > 11) {
      newMonth = 0;
      newYear += 1;
    }
    const currentDay = currentDate.getDate();
    const lastDayOfTargetMonth = new Date(newYear, newMonth + 1, 0).getDate();
    const newDay = Math.min(currentDay, lastDayOfTargetMonth);
    const newDate = new Date(newYear, newMonth, newDay);
    setCurrentDate(newDate);
  };

  // 날짜 변경
  const changeDay = (day) => {
    const newDate = new Date(currentDate);
    newDate.setDate(day);
    setCurrentDate(newDate);
  };

  // 달력에 표시한 날짜
  const getCalendarDates = () => {
    const dates = [];

    // 현재 달의 첫 날짜
    const firstDay = new Date(year, month, 1);

    // 달력에 해당 월이 포함된 첫 주의 시작일(일요일)을 구함.
    // (getDay()는 요일 가져옴. 0 일, 1 월, 6 토...)
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    // 6주 x 7일 = 42일을 리스트에 삽입.
    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      dates.push(date);
    }

    return dates;
  };

  return (
    <div className="calendar-page">
      <Container className="calendar-page-container">
        {/* Header Section */}
        <Row className="mb-4">
          <Col>
            <div className="calendar-header-card">
              <div>
                <h2 className="calendar-title">축제 달력</h2>
                <p className="calendar-subtitle">
                  대한민국 전국 축제 정보를 한눈에 확인하세요
                </p>
              </div>
              <ButtonGroup className="calendar-nav">
                <Button
                  className="calendar-nav-button"
                  onClick={toPrevMonth}
                >
                  ◀ 이전
                </Button>
                <Button
                  className="calendar-nav-button current"
                  disabled
                >
                  {year}년 {month + 1}월
                </Button>
                <Button
                  className="calendar-nav-button"
                  onClick={toNextMonth}
                >
                  다음 ▶
                </Button>
              </ButtonGroup>
            </div>
          </Col>
        </Row>

        {/* Calendar Section */}
        <Row className="mb-4">
          <Col>
            <div className="calendar-section">
              <Calendar
                dates={getCalendarDates()}
                year={year}
                month={month + 1}
                day={day}
                onChangeDay={(day) => {
                  changeDay(day);
                }}
              />
            </div>
          </Col>
        </Row>

        {/* Festival List Section */}
        <Row>
          <Col>
            <div className="calendar-section">
              <div className="festival-list-header">
                <h4 className="festival-list-title">
                  <span className="festival-list-indicator"></span>
                  {currentDate.getFullYear()}년 {currentDate.getMonth() + 1}월{" "}
                  {currentDate.getDate()}일 축제
                  <Badge bg="secondary" className="festival-count-badge">
                    {todayFestivals.length}개
                  </Badge>
                </h4>
              </div>
              <div className="festival-list-content">
                <FestivalVisualList festivals={todayFestivals} />
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
