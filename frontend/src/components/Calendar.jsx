import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import Badge from "react-bootstrap/Badge";
import { getMonthFestivals } from "../api/api";
import "./Calendar.css";

export default function Calendar(props) {
  const dates = props.dates;
  const today = new Date();
  const selectedDate = new Date(props.year, props.month - 1, props.day);

  // 일별 행사 개수
  const [monthInfo, setMonthInfo] = useState([]);

  // 렌더링될 때마다 일별 행사 개수를 긁어온다
  useEffect(() => {
    getMonthFestivals(props.year, props.month).then(setMonthInfo);
  }, [props.year, props.month]);

  // 달력 뷰
  return (
    <div className="calendar-wrapper">
      <Table className="calendar-table">
        <thead>
          <tr>
            <th className="calendar-header sunday">일</th>
            <th className="calendar-header weekday">월</th>
            <th className="calendar-header weekday">화</th>
            <th className="calendar-header weekday">수</th>
            <th className="calendar-header weekday">목</th>
            <th className="calendar-header weekday">금</th>
            <th className="calendar-header saturday">토</th>
          </tr>
        </thead>
        <tbody>
          {Array.from(
            { length: Math.ceil(dates.length / 7) },
            (_, weekIndex) => (
              <tr key={weekIndex}>
                {dates
                  .slice(weekIndex * 7, weekIndex * 7 + 7)
                  .map((date, dayIndex) => {
                    const isMonth = date.getMonth() + 1 === props.month;
                    const isToday =
                      date.toDateString() === today.toDateString();
                    const isSelected =
                      date.toDateString() === selectedDate.toDateString();
                    console.log(
                      date.toDateString(),
                      selectedDate.toDateString()
                    );
                    let dateBox = (
                      <td className="calendar-cell-empty">
                        <div className="p-2">
                          {/* 이번 달이 아닌 날짜는 숫자를 표시하지 않음 */}
                        </div>
                      </td>
                    );

                    if (isMonth) {
                      const dayOfWeek = (weekIndex * 7 + dayIndex) % 7;
                      const isSunday = dayOfWeek === 0;
                      const isSaturday = dayOfWeek === 6;

                      let cellClasses = "calendar-cell";
                      if (isSelected) cellClasses += " selected";
                      if (isToday) cellClasses += " today";

                      let dateClasses = "calendar-date";
                      if (isToday) dateClasses += " today";
                      else dateClasses += " normal";

                      if (isSunday) dateClasses += " sunday";
                      else if (isSaturday) dateClasses += " saturday";
                      else dateClasses += " weekday";

                      dateBox = (
                        <td
                          key={weekIndex * 7 + dayIndex}
                          className={cellClasses}
                          onClick={() => props.onChangeDay(date.getDate())}
                        >
                          <div className="calendar-cell-content">
                            <div className={`${dateClasses} mb-1`}>
                              {date.getDate()}
                            </div>
                            {monthInfo[date.getDate()] > 0 && (
                              <Badge pill className="festival-count">
                                {monthInfo[date.getDate()]}
                              </Badge>
                            )}
                          </div>
                        </td>
                      );
                    }

                    return dateBox;
                  })}
              </tr>
            )
          )}
        </tbody>
      </Table>
    </div>
  );
}
