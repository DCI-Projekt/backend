import { Router } from "express";
import { validationResult } from 'express-validator';
import { loginUser, refreshNewVerification, registerNewUser, verifyEmail } from "../controller/user.controller.js";
import { getAllEvents, getEventsOfMonth, attendToEvent } from "../controller/event.controller.js";
import { userValidationMiddleware } from '../service/validation/userValidationSchema.js';
import verifyToken from "../service/jwt/jwt.verifyToken.js";


// Benutzerdefinierte Middleware, um Validierungsfehler zu behandeln
function myRouteHandler(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() }); // Wenn Validierungsfehler auftreten, senden Sie eine 400-Antwort mit einer Fehlermeldung
    }
    next(); // Wenn keine Validierungsfehler auftreten, rufen Sie die nächste Middleware in der Kette auf
}


// neue Router Instanz
const authRouter = Router();

//!-----USERS-----

// Routen Definition fuer /register
authRouter.route('/register')
    .post([userValidationMiddleware, myRouteHandler], registerNewUser);

// Routen Definition fuer /login
authRouter.route('/login')
    .post(loginUser);

// Routen Definition fuer (Email-Verifikation)
authRouter.route('/verify')
    .get(verifyEmail)
    .put(refreshNewVerification);

//todo - modify own profil?

//!-----EVENTS-----
// Get all Events
authRouter.route('/events')
    .get(getAllEvents)

// Get the events of the month
authRouter.route('/events/:month')
    .get(getEventsOfMonth)

authRouter.route('/events/attend/:id')
    .patch(verifyToken, attendToEvent)

export default authRouter;