const express = require("express");
const cors = require("cors");
const persistance = require("./handlers/persistance")


const eventDataHandler = require("./handlers/eventDataHandler");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", eventDataHandler.getEvents);
app.get("/eventTypes", eventDataHandler.getEventTypes);

app.post("/", eventDataHandler.postEvent);

app.post("/eventType", eventDataHandler.postEventType);
app.post("/eventsByMonth", eventDataHandler.getEventsByMonth);

app.delete("/eventType", eventDataHandler.deleteEventType);
app.delete("/event", eventDataHandler.deleteEvent);


app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
