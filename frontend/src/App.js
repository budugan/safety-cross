import React, { useState, useEffect } from "react";
import AdminPanel from "./components/AdminPanel2";
import SafetyCross from "./components/SafetyCross2";
import EventModal from "./components/EventModal";
import { fetchEvents, saveEvent } from "./services/api"; //de facut cu variabila
import "./index.css";

const App = () => {
  const [isAdmin, setIsAdmin] = useState(window.location.pathname === "/admin");
  const [modalEvent, setModalEvent] = useState(null);

 

 

  return (
    <div>
      <h1>{isAdmin ? "Admin Panel" : ""}</h1>
      {isAdmin ? (
        <AdminPanel  />
      ) : (
        <SafetyCross onDayClick={(event) => {setModalEvent(event); console.log("OnClick",event)}}  />
      )}
      {modalEvent && <EventModal event={modalEvent} onClose={() => setModalEvent(null)} />}
    </div>
  );
};

export default App;
