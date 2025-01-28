import React, { useEffect, useState } from "react";
import Day from "./Day2";
import { fetchEventsByMonth, fetchEventTypes } from "../services/api";


const SafetyCross = ({  onDayClick }) => {
 // const days = Array.from({ length: 31 }, (_, i) => i + 1);

  const currentDay = new Date().getDate();
  
  const [events, setEvents] = useState([]);
  const [renderSignal, setRenderSignal]=useState(false);
  
  useEffect(()=>{

    loadEvents();

    let interval = setInterval(()=>loadEvents() , 5000);

    return ()=>{
      clearInterval(interval);
    }
  }

    
    , [])

    useEffect(()=>{
      console.log("RS", renderSignal);

    },[renderSignal])

  const loadEvents = async ()=> {
    let monthStart = new Date();
    monthStart.setMonth(monthStart.getMonth()-1);
    monthStart.setDate(31);

    let monthEnd = new Date();
    monthEnd.setDate(31);

    console.log(formatDate(monthStart),formatDate(monthEnd));
    console.log(monthStart.getDate(),monthEnd);

    setRenderSignal(old=>!old);

    fetchEventsByMonth({from: monthStart, to: monthEnd}).then((res)=> setEvents(res));
    }


  const formatDate = (date)=>{
    let year = date.getFullYear();
    let month = String(date.getMonth()+1).padStart(2, "0");
    let day =  String(date.getDate()).padStart(2, "0");

    return year + "-" + month + "-" + day;
  }  

  const rows = [
    [1, 2, 3], 
    [4, 5, 6], 
    [7, 8, 9, 10, 11, 12, 13],
    [14, 15, 16,17, 18, 19, 20], 
    [21, 22, 23, 24, 25, 26, 27],
    [ 28, 29, 30],
    [null,31, null],
  ];


  return (
  <div className="safety-cross">
    {rows.map((row, rowIndex) => (
      <div key={rowIndex} className="safety-cross-row">
        {row.map((day) => {
          if (day === null){
            return <div className="day"></div>
          }
          const event = events.find((e) => {
            return new Date(e.date).getDate() === day;
          });

          const color =
            day < currentDay && !event ? "green" : event?.tip_eveniment?.color || "grey";

          return (
            <Day
              key={day}
              day={day}
              color={color}
              event={event}
              onClick={() => onDayClick(event)} 
            />
          );
        })}
      </div>
    ))}
  </div>
);
}
export default SafetyCross