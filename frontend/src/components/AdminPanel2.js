import React, { useEffect, useState } from "react";
import {
  fetchEventTypes,
  saveEvent,
  saveEventType,
  deleteEventType,
  deleteEvent,
  fetchEventsByMonth,
} from "../services/api";

export default function AdminPanel() {
  const [eventTitle, setEventTitle] = useState("");
  const [eventType, setEventType] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventDate, setEventDate] = useState("");

  const [eventName, setEventName] = useState("");
  const [eventColor, setEventColor] = useState("");

  const [eventTypeList, setEventTypeList] = useState([]);
  const [events, setEvents] = useState([]);

  const [selectedMonth, setSelectedMonth] = useState(
    new Date().toISOString().slice(0, 7) 
  );

  const parts = window.location.pathname.split("/").filter(Boolean);
  const tag = parts.length > 0 ? Number(parts[0]) : 1;

  useEffect(() => {
    loadEventTypes();
    loadEvents();
  }, [selectedMonth]);

  let loadEventTypes = () => {
    fetchEventTypes(tag).then((evTyps) => setEventTypeList(evTyps));
  };

  const loadEvents = async () => {
    const selectedDate = new Date(selectedMonth);
    const monthStart = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      1
    );
    const monthEnd = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth() + 1,
      0
    );
    fetchEventsByMonth({
      from: formatDate(monthStart),
      to: formatDate(monthEnd),
      tag: tag,
    })
      .then((res) => setEvents(res))
      .catch(() => alert("Failed to fetch events"));
  };

  const formatDate = (date) => {
    let year = date.getFullYear();
    let month = String(date.getMonth() + 1).padStart(2, "0");
    let day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const formatEventDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ro-RO"); 
  };

  let postEvent = () => {
    saveEvent({
      type: eventType,
      title: eventTitle,
      description: eventDescription,
      date: eventDate,
      tag: tag,
    }).then(() => {
      setEventTitle("");
      setEventType("");
      setEventDescription("");
      setEventDate("");
      alert("Eveniment adaugat");
      setTimeout(() => {
        loadEvents();
      }, 500);
    });
  };

  let postEventType = () => {
    saveEventType({
      title: eventName,
      color: eventColor,
      tag: tag,
    }).then(() => {
      loadEventTypes();
      setEventColor("");
      setEventName("");
      alert("Tip eveniment adaugat");
    });
  };

  const handleDeleteEventType = (id) => {
    if (
      window.confirm("Esti sigur ca vrei sa stergi acest tip de eveniment?")
    ) {
      deleteEventType(id)
        .then(() => {
          loadEventTypes();
          alert("Tip eveniment sters");
        })
        .catch((error) => {
          alert("Eroare la stergerea tipului de eveniment");
        });
    }
  };

  const handleDeleteEvent = (id) => {
    if (window.confirm("Esti sigur ca vrei sa stergi acest eveniment?")) {
      deleteEvent({ id: id })
        .then(() => {
          loadEvents();
          alert("Eveniment sters");
        })
        .catch((error) => {
          alert("Eroare la stergerea evenimentului");
        });
    }
  };

  let generateDropdown = () => {
    let result = [];

    result.push(
      <option value="" disabled>
        -- Alege o optiune --
      </option>
    );
    for (let index in eventTypeList) {
      result.push(
        <option key={index} value={eventTypeList[index].id}>
          {eventTypeList[index].title}
        </option>
      );
    }

    return (
      <select
        className="form-select"
        value={eventType}
        onChange={(e) => setEventType(e.target.value)}
      >
        {result}
      </select>
    );
  };

  return (
    <div className="admin-panel">
      <h1 className="admin-panel-title">Admininistrare Crucea {tag}</h1>
      <div className="admin-panel-container">
        <div className="admin-panel-card">
          <h2>Inregistrare Eveniment</h2>
          <div className="form-group">
            <label>Data</label>
            <input
              type="date"
              value={eventDate}
              onInput={(e) => setEventDate(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Tip Eveniment</label>
            {generateDropdown()}
          </div>
          <div className="form-group">
            <label>Nume Eveniment</label>
            <input
              type="text"
              placeholder="Introduceti numele evenimentului"
              value={eventTitle}
              onInput={(e) => setEventTitle(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Descriere Eveniment</label>
            <textarea
              placeholder="Introduceti detalii despre eveniment"
              value={eventDescription}
              onInput={(e) => setEventDescription(e.target.value)}
            />
          </div>
          <button className="btn-primary" onClick={() => postEvent()}>
            Adauga Eveniment
          </button>
        </div>

        <div className="admin-panel-card">
          <h2>Creare Nou Tip Eveniment</h2>
          <div className="form-group">
            <label>Denumire Eveniment</label>
            <input
              type="text"
              placeholder="Introduceti numele tipului de eveniment"
              value={eventName}
              onInput={(e) => setEventName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Alege Culoare Eveniment</label>
            <input
              className="color-picker"
              type="color"
              value={eventColor}
              onInput={(e) => setEventColor(e.target.value)}
            />
          </div>

          <button className="btn-primary" onClick={() => postEventType()}>
            Adauga Tip Eveniment
          </button>
        </div>
        <div className="admin-panel-card">
          <h2>Tipuri de evenimente existente</h2>
          <ul className="event-type-list">
            {eventTypeList.map((type) => (
              <li key={type.id} className="event-type-item">
                <span className="event-type-title">{type.title}</span>
                <div
                  className="delete-event-type"
                  onClick={() => handleDeleteEventType(type.id)}
                ></div>
              </li>
            ))}
          </ul>
        </div>
        <div className="admin-panel-card">
          <h2> Evenimente Existente</h2>
          <div className="form-group">
            <input
              type="month"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
            />
          </div>
          <ul className="event-list">
            {events.map((event) => (
              <li className="event-item" key={event.id}>
                {event.title} {"- adaugat la "} ({formatEventDate(event.date)})
                <div
                  className="delete-event"
                  onClick={() => handleDeleteEvent(event.id)}
                ></div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
