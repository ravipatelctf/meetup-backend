const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    title: String,
    eventImageUrl: String,
    eventImageAlt: String,
    eventStartDate: String,
    eventEndDate: String,
    ticketPrice: Number,
    location: String,
    eventType: {
        type: String,
        enum: ["Online", "Offline"],
    },
    hostedBy: String,
    details: String,
    dressCode: String,
    ageRestrictions: Number,
    eventTags: [{
        type: String,
    }],
    speakers: [{
        type: Object,
    }],
},
{
    timestamps: true,
},
);

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
