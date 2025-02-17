import React, { useEffect, useState } from "react";
import Day from "./Day2";
import { fetchEventsByMonth, fetchEventTypes } from "../services/api";

const SafetyCross = ({ onDayClick }) => {
  // const days = Array.from({ length: 31 }, (_, i) => i + 1);

  const parts = window.location.pathname.split("/").filter(Boolean);
  const tag = parts.length > 0 ? Number(parts[0]) : 1;
  const currentDay = new Date().getDate();
  console.log(tag);

  const [events, setEvents] = useState([]);
  const [renderSignal, setRenderSignal] = useState(false);
  const [eventTypeList, setEventTypeList] = useState([]);

  useEffect(() => {
    if (tag) {
      loadEvents();
      loadEventTypes();
      const interval = setInterval(() => {
        loadEvents();
        loadEventTypes();
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [tag]);

  useEffect(() => {
    console.log("RS", renderSignal);
  }, [renderSignal]);

  useEffect(() => {
    console.log("Event Types:", eventTypeList);
  }, [eventTypeList]);

  const loadEvents = async () => {
    let monthStart = new Date();
    monthStart.setMonth(monthStart.getMonth() - 1);
    monthStart.setDate(31);

    let monthEnd = new Date();
    monthEnd.setDate(31);

    console.log(formatDate(monthStart), formatDate(monthEnd));
    console.log(monthStart.getDate(), monthEnd);

    setRenderSignal((old) => !old);

    fetchEventsByMonth({ from: monthStart, to: monthEnd, tag: tag }).then(
      (res) => setEvents(res)
    );
  };

  const loadEventTypes = async () => {
    fetchEventTypes(tag)
      .then((types) => {
        console.log("Fetched event types:", types);
        setEventTypeList(types);
      })
      .catch((err) => console.error("Error fetching event types:", err));
  };

  const formatDate = (date) => {
    let year = date.getFullYear();
    let month = String(date.getMonth() + 1).padStart(2, "0");
    let day = String(date.getDate()).padStart(2, "0");

    return year + "-" + month + "-" + day;
  };

  const rows = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9, 10, 11, 12, 13],
    [14, 15, 16, 17, 18, 19, 20],
    [21, 22, 23, 24, 25, 26, 27],
    [28, 29, 30],
    [null, 31, null],
  ];

  return (
    <div className="safety-cross">
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="safety-cross-row">
          {row.map((day) => {
            if (day === null) {
              return <div className="day"></div>;
            }
            const event = events.find((e) => {
              return new Date(e.date).getDate() === day;
            });

            const color =
              day < currentDay && !event
                ? "green"
                : event?.tip_eveniment?.color || "#A9A9A9";

            return (
              <Day
                key={day}
                day={day}
                color={color}
                event={event}
                onClick={() => onDayClick(event)}
              />
            );
          })}
        </div>
      ))}

      {/* <div className="safety-cross-legend">
        <div className="text-legenda">Legenda</div>
        {eventTypeList.length > 0 ? (
          eventTypeList.map((type, index) => (
            <li key={type.id}>
              <div
                className="legend-color"
                style={{ backgroundColor: type.color }}
              ></div>
              {"  "} {type.title}
            </li>
          ))
        ) : (
          <li>Niciun tip de eveniment</li>
        )}
      </div> */}
    </div>
  );
};

export default SafetyCross;
