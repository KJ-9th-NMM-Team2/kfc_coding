import React from "react";
import Calendar from "../components/Calendar";
import { useState } from "react";
import { Container } from "react-bootstrap";

export default function CalendarPage() {
  // 현재 날짜를 state로 관리
  const [currentDate, setCurrentDate] = useState(new Date());

  // 연도, 월 정보 추출
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // 이전 월로 이동
  const toPrevMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() - 1);
    setCurrentDate(newDate);
  };

  // 다음 월로 이동
  const toNextMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + 1);
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
    <Container>
      <h1>월별 축제 달력</h1>
      <div>
        {year}.{month + 1}
      </div>
      <button onClick={toPrevMonth}>이전</button>
      <button onClick={toNextMonth}>이후</button>
      <Calendar dates={getCalendarDates()} year={year} month={month + 1} />
    </Container>
  );
}
