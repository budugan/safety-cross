import React from "react";
import Day from "./Day";

const SafetyCross = ({ events, onDayClick }) => {
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  const currentDay = new Date().getDate();
  

  return (
    <div className="safety-cross">
      {days.map((day) => {
        const event = events.find((e) => e.day === day);

        let status;

        if (day < currentDay) {
          if (event) {
            status = event.status;
          } else {
            status = "safe";
          }
        } else {
          if (event && event.status) {
            status = event.status;
          } else {
            status = "nedefinit";
          }
        }

        return (
          <Day
            key={day}
            day={day}
            status={status}
            onClick={() => onDayClick(day)}
          />
        );
      })}
    </div>
  );
};

export default SafetyCross;
