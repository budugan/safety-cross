const {Eveniment,TipEveniment} = require("./persistance")
const {Op} = require("sequelize")


let events = [];

const getEventList = (req, res) => {
  res.json(events);
};
const getEvents = async (req, res) => {
 
  try{
    res.status(200);
    res.json( await Eveniment.findAll({include:TipEveniment}));
 
  }
  catch(e){console.log("failed to fetch events",e)
    res.status(500);
    res.json({});
  }
 
};



const getEventsByMonth = async (req, res) => {

  try{
    const {from,to,tag} = req.body;

    let result = await Eveniment.findAll({
      where: {
        tag,
        date: {
          [Op.between]:[from, to]
        }
      },
      include: [TipEveniment]
        
      
    });

    res.status(201);
    res.json(result);
  }
  catch(e){
    console.log("failed to add event",e)
    res.status(500);
    res.json({});
  }


};


const postEvent = async (req, res) => {
  const {description, title, date, type,tag } = req.body;

  try{
    await Eveniment.create({description:description, title:title, date:date, evTypeId:type ,tag:tag})
    res.status(201);
    res.json({});
  }
  catch(e){
    console.log("failed to add event",e)
    res.status(500);
    res.json({});
  }

  // validare input
//   if (!day || !status) {
//     return res.status(400).json({ error: 'Day and status are required' });
//   }

  // caut eveniment dupa ziua lui
  // const existingEvent = events.find((event) => event.day === day);

  //daca exista actualizez, altfel creez event nou
  // if (existingEvent) {
  //   existingEvent.status = status;
  //   existingEvent.details = description;
  //   res.json(existingEvent);
  // } else {
  //   const newEvent = { day, status, description };
  //   events.push(newEvent);
  //   res.status(201).json(newEvent);
  // }
};



const postEventType = async(req, res) => {
  const { title, color,tag } = req.body;

  try{
    await TipEveniment.create({title:title, color:color,tag:tag});
    res.status(201);
    res.json({});
  }
  catch(e){console.log("failed to add event",e)
    res.status(500);
    res.json({});
  }

};

const getEventTypes = async (req, res) => {
 const tag = req.query.tag;
 if (!tag) return res.status(400).json({ error: "Missing tag" });
  try{
    res.status(200);
    res.json( await TipEveniment.findAll({where: {tag}}));
 
  }
  catch(e){console.log("failed to fetch events",e)
    res.status(500);
    res.josn({});
  }
 
};

const deleteEventType = async (req, res) => {
  const { id } = req.body; 
  console.log(req.body)
  try {
    const deleted = await TipEveniment.destroy({
      where: { id: Number(id) }
    });

    if (deleted) {
      res.status(200).json({ message: "Event type deleted successfully" });
    } else {
      res.status(404).json({ message: "Event type not found" });
    }
  } catch (e) {
    console.log("Failed to delete event type", e);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteEvent = async (req, res) => {
  const { id } = req.body; 

  console.log(req.body)
  try {
    const deleted = await Eveniment.destroy({
      where: { id: Number(id) }
    });

    if (deleted) {
      res.status(200).json({ message: "Event deleted successfully" });
    } else {
      res.status(404).json({ message: "Event not found" });
    }
  } catch (e) {
    console.log("Failed to delete event", e);
    res.status(500).json({ message: "Server error" });
  }
};




module.exports = {
  getEvents,
  postEvent,
  postEventType,
  getEventTypes,
  getEventsByMonth,
  deleteEventType,
  deleteEvent
};
