import React, { useEffect } from "react";

const EventModal = ({ event, onClose }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      onClose();
    }, 30000); 

    return () => clearTimeout(timeout);
  }, [onClose]);

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Detalii eveniment:</h2>
        <p><strong>Titlu:</strong> {event?.title || "Fara titlu"}</p>
        <p><strong>Categorie:</strong> {event?.tip_eveniment?.title || "Fara categorie"}</p>
        <p><strong>Descriere:</strong> {event?.description || "Fara descriere"}</p>
        <button onClick={onClose} className="close-modal">Închide</button>
      </div>
    </div>
  );
};

export default EventModal;
