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
  const {from,to} = req.body;

  try{
    let result = await Eveniment.findAll({
      where: {
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
  const {description, title, date, type } = req.body;

  try{
    await Eveniment.create({description:description, title:title, date:date, evTypeId:type })
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
  const { title, color } = req.body;

  try{
    await TipEveniment.create({title:title, color:color});
    res.status(201);
    res.json({});
  }
  catch(e){console.log("failed to add event",e)
    res.status(500);
    res.json({});
  }
 
};

const getEventTypes = async (req, res) => {
 
  try{
    res.status(200);
    res.json( await TipEveniment.findAll());
 
  }
  catch(e){console.log("failed to fetch events",e)
    res.status(500);
    res.josn({});
  }
 
};


module.exports = {
  getEvents,
  postEvent,
  postEventType,
  getEventTypes,
  getEventsByMonth
};
