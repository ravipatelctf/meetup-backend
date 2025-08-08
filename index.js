const {initializeDatabase} = require("./db/db.connect");
const Event = require("./models/event.models");

// const fs = require("fs");

const express = require("express");
const app = express();
app.use(express.json());

const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

initializeDatabase();

// ----------------------------------------------------------------
// seed the data in database
// const jsonData = fs.readFileSync("events.json", "utf-8");
// const eventsData = JSON.parse(jsonData);

// function seedData() {
//     try {
//         for (const eventData of eventsData) {
//             const newEvent = new Event({
//                 title: eventData.title,
//                 eventImageUrl: eventData.eventImageUrl,
//                 eventImageAlt: eventData.eventImageAlt,
//                 eventStartDate: eventData.eventStartDate,
//                 eventEndDate: eventData.eventEndDate,
//                 ticketPrice: eventData.ticketPrice,
//                 location: eventData.location,
//                 eventType: eventData.eventType,
//                 hostedBy: eventData.hostedBy,
//                 details: eventData.details,
//                 dressCode: eventData.dressCode,
//                 ageRestrictions: eventData.ageRestrictions,
//                 eventTags: eventData.eventTags,
//                 speakers: eventData.speakers,
//             });
//             newEvent.save();
//         }
//     } catch (error) {
//         throw error;
//     }
// }

// seedData();
// ----------------------------------------------------------------

// get all events

async function readAllEvents() {
    try {
        const events = await Event.find();
        return events;
    } catch (error) {
        throw error;
    }
}

app.get("/events", async (req, res) => {
    try {
        const events = await readAllEvents();
        
        if (events) {
            res
                .status(200)
                .send(events);
        } else {
            res
                .status(404)
                .json({error: "Events Not Found!"});
        }
    } catch (error) {
        res
            .status(500)
            .json({error: "Failed to fetch all events!"});
    }
});

// -------------------------------------------------------------

app.get("/", (req, res) => {
    res.send("Hello from Meetup App.");
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
})