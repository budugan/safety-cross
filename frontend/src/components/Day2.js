import React from "react";

const Day = ({ day, color,event, onClick }) => {
  

  return (
    <div
      onClick={()=> onClick(event)}
      className="day"
      style={{ backgroundColor: color}}
    >
      {day}
    </div>

  );
};

export default Day;