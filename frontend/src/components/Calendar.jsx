import React, { useEffect, useState } from "react";
import { getMonthFestivals } from "../api/api";

export default function Calendar(props) {
  const dates = props.dates;
  const today = new Date();

  // 일별 행사 개수
  const [monthInfo, setMonthInfo] = useState([]);

  // 렌더링될 때마다 일별 행사 개수를 긁어온다
  useEffect(() => {
    getMonthFestivals(props.year, props.month - 1).then(setMonthInfo);
  }, [props.year, props.month]);

  // 달력 뷰
  return (
    <table>
      <thead>
        <tr>
          <th>일</th>
          <th>월</th>
          <th>화</th>
          <th>수</th>
          <th>목</th>
          <th>금</th>
          <th>토</th>
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: Math.ceil(dates.length / 7) }, (_, weekIndex) => (
          <tr key={weekIndex}>
            {dates
              .slice(weekIndex * 7, weekIndex * 7 + 7)
              .map((date, dayIndex) => {
                const isMonth = date.getMonth() + 1 === props.month;
                const isToday = date.toDateString() === today.toDateString();
                let dateBox = <td></td>;

                if (isMonth) {
                  dateBox = (
                    <td
                      key={weekIndex * 7 + dayIndex}
                      style={{
                        fontWeight: isToday ? "bold" : "normal",
                        color: isMonth ? "black" : "grey",
                        textAlign: "center",
                        padding: "10px",
                      }}
                    >
                      {date.getDate()}
                    </td>
                  );
                }

                return dateBox;
              })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
