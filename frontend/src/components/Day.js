import React from "react";

const Day = ({ day, status, onClick, color}) => {
  const colors = {
    safe: "green",
    warning: "yellow",
    incident: "red",
    nedefinit: "white"
  };

  return (
    <div
      onClick={onClick}
      className="day"
      style={{ backgroundColor: colors[status] || "grey" }}
    >
      {day}
    </div>
  );
};

export default Day;