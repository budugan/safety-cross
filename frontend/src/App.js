import React, { useState, useEffect } from "react";
import AdminPanel from "./components/AdminPanel2";
import SafetyCross from "./components/SafetyCross2";
import EventModal from "./components/EventModal";
import { fetchEvents, saveEvent } from "./services/api"; //de facut cu variabila
import "./index.css";
import Legend from "./components/Legend";

const App = () => {
  //const [isAdmin, setIsAdmin] = useState(window.location.pathname === "/admin");
  const [modalEvent, setModalEvent] = useState(null);

  if (window.location.pathname === "/") {
    window.location.replace("/1");
    return null; // Stop rendering until redirected
  }

  // Get the full pathname, e.g., "/1/admin" or "/1/"
  const pathname = window.location.pathname;
  // Determine if we are on the admin page by checking for "admin" (case insensitive)
  const isAdmin = pathname.toLowerCase().includes("admin");

  // Extract the tag (cross id) from the URL:
  // Split the pathname on "/" and filter out any empty strings.
  const parts = pathname.split("/").filter(Boolean);
  // We assume the first segment is always the tag.
  const tag = parts.length > 0 ? Number(parts[0]) : 1;

  const legend = pathname.toLowerCase().includes("legend")

 

  return (
    <div>
      {isAdmin  &&
        <AdminPanel tag={tag}  />}
      {legend && <Legend tag={tag}/>}
       {!isAdmin && !legend &&  <SafetyCross tag={tag} onDayClick={(event) => {setModalEvent(event); console.log("OnClick",event)}}  />
      }
      {modalEvent && <EventModal event={modalEvent} onClose={() => setModalEvent(null)} />}
    </div>
  );
};

export default App;
