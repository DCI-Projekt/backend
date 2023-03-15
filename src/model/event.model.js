import mongoose from "mongoose";

// Event Schema

const eventSchema = mongoose.Schema({

title: {type: String, required: true, unique: true},
beginning: { type: Date, default: Date.now },
duration: { type: Date, default: Date.now },
description: {type: String, required: true},
participant: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
attending: {type: Number}
},{ timestamps: true });


// erstelle neues Model-Objekt fuer Event
const Event = mongoose.model('Event', eventSchema);


//