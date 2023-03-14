import mongoose from "mongoose";
import * as RoleModel from './role.model.js';

// Definiere User Schema
const userSchema = mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: mongoose.Schema.Types.ObjectId, ref: 'Role' },
    admin: { type: Boolean },
    events: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Events' }]

}, {timestamps: true});


// Erstellung eines neuen Model-Objektes fuer User
// automatische Erstellung einer Users Collection in der MongoDB, sofern noch keine vorhanden ist
const User = mongoose.model('User', userSchema);

// DB-Funktion zum Abrufen eines bestimmten User-Eintrags per username
export async function findUserByUsername(username) {
    return await User.findOne({username: username}).populate('role');
}

// DB-Funktion zum Erstellen eines neuen User-Eintrags
export async function insertNewUser(userBody) {
    try {
        // Finde Rolleneintrag per Name der Rolle
        const role = await RoleModel.findByName(RoleModel.rolesEnum.user);

        //  role-Feld wird im Body ersetzt durch die gefundene ID des Role-Eintrags aus der DB
        userBody.role = role._id;

        // Erstelle neue Instanz des User Models
        const newUser = new User(userBody);

        // Speichere neue Instanz
        return await newUser.save();

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

// DB-Funktion zum Abrufen aller User-Eintraege
export async function getAll() {
    return await User.find();
}