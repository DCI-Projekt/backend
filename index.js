import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectToDb } from './src/service/db.service.js';

import { seedRoles } from './src/model/role.model.js';


// Lade Umgebungsvariablen (engl. enviroment variables) aus der .env Datei
dotenv.config();

// Initialisiere express
const app = express();

// Middleware fuer das body-Parsing
app.use(express.json());

// Middleware fuer CROSS-ORIGIN-REQUEST
app.use(cors({
    origin: 'http://localhost:5173',
    // credentials: true
}));

// --------------------- ROUTES -------------------------
app.use('/', ()=>{
    console.log("läääuft!");
})

// Einmalig Verbindung ueber default Connection aufbauen
// Uebergebe Seeding-Funktion zum Einfuegen von Userrollen
await connectToDb(seedRoles);

// ----------------------------------------------------------
// Starte Server auf in der Config hinterlegtem Port
app.listen(process.env.API_PORT, () => {
    console.log(`Server is listening on http://localhost:${process.env.API_PORT}`);
});