import React from "react";
import Calendar from "../components/Calendar";
import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import FestivalVisualList from "../components/FestivalVisualList";
import { getDateFestivals } from "../api/api";

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
    <Container>
      <h1>월별 축제 달력</h1>
      <div>
        {year}.{month + 1}
      </div>
      <button onClick={toPrevMonth}>이전</button>
      <button onClick={toNextMonth}>이후</button>
      <Calendar
        dates={getCalendarDates()}
        year={year}
        month={month + 1}
        day={day}
        onChangeDay={(day) => {
          changeDay(day);
        }}
      />
      <h2>축제 리스트</h2>
      <FestivalVisualList festivals={todayFestivals} />
    </Container>
  );
}
