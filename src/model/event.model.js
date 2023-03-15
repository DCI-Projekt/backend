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


// DB-Funktion zum Abrufen eines bestimmten Event-Eintrags per Event-Titel
export async function findEventByEventTitle(eventTitle) {
    return await Event.findOne({eventTitle: eventTitle}).populate('Events');
}



// DB-Funktion zum Erstellen eines neuen Event-Eintrags
export async function insertNewEvent(eventBody) {
    try {
       
        // Erstelle neue Instanz des Event Models
        const newEvent = new Event(eventBody);

        // Speichere neue Instanz
        return await newEvent.save();

    } catch (error) {
        // Pruefe, ob Conflict durch Dupletten-Verletzung
        if ( (error.hasOwnProperty('code')) && (error.code === 11000) ) {
            // entsprechendes Fehlerobjekt wird gesendet
            throw {
                code: 409,
                message: error.message
            };

        } else {
            // Muss ein Validierungsproblem sein
            // entsprechendes Fehlerobjekt wird gesendet
            throw {
                code: 400,
                message: error.message
            };
        }
    }
}


// DB-Funktion zum Abrufen aller Event-Eintraege
export async function getAll() {
    return await Event.find();
}
