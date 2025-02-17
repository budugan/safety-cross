import React, { useEffect, useState } from "react";
import { fetchEventTypes } from "../services/api";

const Legend = ({ tag }) => {
  const [eventTypes, setEventTypes] = useState([]);

  useEffect(() => {
    const loadEventTypes = () => {
      fetchEventTypes(tag)
        .then((types) => {
          setEventTypes(types);
        })
        .catch((err) => {
          console.error("Error fetching event types", err);
        });
    };

    loadEventTypes();
    const intervalId = setInterval(() => {
      loadEventTypes();
    }, 5000);

    return () => clearInterval(intervalId);
  }, [tag]);

  return (
    <div className="safety-cross-legend">
      <div className="text-legenda">Legenda</div>
        {eventTypes.length > 0 ? (
          eventTypes.map((type, index) => (
            <li key={type.id} className="legend-item">
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
    </div>
  );
};

export default Legend;
