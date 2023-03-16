import mongoose from "mongoose";
import * as RoleModel from './role.model.js';

const userSchema = mongoose.Schema({
    username: { type: String, required: true, unique: true }, // Der Benutzername ist ein String und einzigartig
    email: { type: String, required: true, unique: true }, // Die E-Mail-Adresse ist ein String und einzigartig
    password: { type: String, required: true }, // Das Passwort ist ein String und erforderlich
    role: { type: mongoose.Schema.Types.ObjectId, ref: 'Role' }, // Die Benutzerrolle ist ein Verweis auf ein "Role"-Objekt
    admin: { type: Boolean }, // Der "admin"-Status ist ein Boolean-Wert
    events: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Events' }], // Die "events"-Liste ist ein Verweis auf eine Liste von "Events"-Objekten
    verificationHash: { type: String } // Der Verifizierungs-Hash ist ein String
}, {timestamps: true});

const User = mongoose.model('User', userSchema);

// Findet einen Benutzer anhand des Benutzernamens
export async function findUserByUsername(username) {
    return await User.findOne({username: username});
}

// Findet einen Benutzer anhand der E-Mail-Adresse
export async function findUserByMail(email) {
    return await User.findOne({email: email});
}

// Verifiziert einen Benutzer anhand des E-Mail-Hashs
export async function verifyUser(emailHash) {

    const role = await RoleModel.findByName(RoleModel.rolesEnum.user); // Findet die "user"-Rolle

    let user = await User.findOne({verificationHash: emailHash}); // Findet den Benutzer mit dem angegebenen E-Mail-Hash

    if (!user) throw new Error('Token invalid', {cause: 409}) // Wenn der Benutzer nicht gefunden wurde, wirft die Funktion einen Fehler mit dem Statuscode 409 (Conflict)

    user.verificationHash = undefined; // Setzt den Verifizierungs-Hash des Benutzers auf "undefined"
    user.role = role._id; // Setzt die Rolle des Benutzers auf die "user"-Rolle

    return await user.save(); // Speichert den Benutzer in der Datenbank und gibt das aktualisierte Benutzer-Objekt zurück
}

// Fügt einen neuen Benutzer in die Datenbank ein
export async function insertNewUser(userBody) {
    try {
        const role = await RoleModel.findByName(RoleModel.rolesEnum.unverified); // Findet die "unverified"-Rolle

        userBody.role = role._id; // Setzt die Rolle des neuen Benutzers auf die "unverified"-Rolle

        const newUser = new User(userBody); // Erstellt ein neues "User"-Objekt mit den angegebenen Benutzerdaten

        return await newUser.save(); // Speichert den neuen Benutzer in der Datenbank und gibt das neue Benutzer-Objekt zurück

    } catch (error) {
        if ( (error.hasOwnProperty('code')) && (error.code === 11000) ) { // Wenn ein eindeutiger Indexverstoß aufgetreten ist, wirft die Funktion einen Fehler mit dem Statuscode 409 (Conflict)
            throw new Error('Username or Email already used', {cause: 409})
        } else throw new Error('unknown problem - todo', {cause: 400})
    }
}

export async function getAll() {
    return await User.find();
}