import { Router } from "express";
import { getAllUsers, updateUser, deleteUserById } from "../controller/user.controller.js";
import { getAllEvents, updateEvent, deleteEventById } from "../controller/event.controller.js";
import authorizeAdmin from "../service/authorizeAdmin.js";
import verifyToken from "../service/jwt/jwt.verifyToken.js";

function myRouteHandler(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    next();
}


// Erstelle neue Router Instanz
const protectedRouter = Router();

// Setze Tokenverifizierungs-Middleware fuer alle Endpoints des Routers
protectedRouter.use(verifyToken, authorizeAdmin);

// Routen Definition fuer root
protectedRouter.route('/user')
    .get(getAllUsers)

// Routen Definition fuer root
protectedRouter.route('/user/:id')
    .patch(updateUser)
    .delete(deleteUserById)

protectedRouter.route('/test').get((req, res) => {
    res.send({
        success: true,
        data: req.tokenPayload
    });
})




//mit martin checken


protectedRouter.route('events/id:').patch(updateEvent)
    .delete(deleteEventById)


protectedRouter.route('event/:id')

export default protectedRouter;