export const fetchEvents = async () => {
  const response = await fetch("http://localhost:5000/");
  if (!response.ok) throw new Error("failed to fetch events");
  return response.json();
};

export const fetchEventsByMonth = async (timeInterval) => {
  const response = await fetch("http://localhost:5000/eventsByMonth", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(timeInterval),
  });
  if (!response.ok) throw new Error("Failed to save event");
  return response.json();
};

export const fetchEventTypes = async () => {
  const response = await fetch("http://localhost:5000/eventTypes");
  if (!response.ok) throw new Error("failed to fetch event types");
  return response.json();
};
export const saveEvent = async (event) => {
  const response = await fetch("http://localhost:5000/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(event),
  });
  if (!response.ok) throw new Error("Failed to save event");
  return response.json();
};
export const saveEventType = async (eventType) => {
  const response = await fetch("http://localhost:5000/eventType", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(eventType),
  });
  if (!response.ok) throw new Error("Failed to save event type");
  return response.json();
};

export const deleteEventType = async (id) => {
  const response = await fetch(`http://localhost:5000/eventType`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({id:id})
  });
  if (!response.ok) throw new Error("Failed to delete event type");
  return response.json();
};

export const deleteEvent = async (event) => {
  const response = await fetch("http://localhost:5000/event", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(event)
  });
  if (!response.ok) throw new Error("Failed to delete event type");
  return response.json();
};

