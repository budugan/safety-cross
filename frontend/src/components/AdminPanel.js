import React, { useState } from "react";

const AdminPanel = ({ events, onDayClick }) => {
  const [selectedDay, setSelectedDay] = useState(null);

  return (
    <div className="admin-panel">
      <h2>Edit Events</h2>
      <label>
        Select Day:
        <select onChange={(e) => setSelectedDay(parseInt(e.target.value))}>
          <option value="">-Select-</option>
          {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
            <option key={day} value={day}>
              Day {day}
            </option>
          ))}
        </select>
      </label>

      {selectedDay && (
        <div>
          <h3>Day {selectedDay}</h3>
          <button onClick={() => onDayClick(selectedDay)}>Edit Event</button>
          <p>
            Status: {events.find((e) => e.day === selectedDay)?.status || "not found"}
          </p>
          <p>
            Details:{" "}
            {events.find((e) => e.day === selectedDay)?.details || "not found"}
          </p>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
