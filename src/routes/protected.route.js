import { Router } from "express";
import { getAllUsers, updateUser } from "../controller/user.controller.js";
import verifyToken from "../service/jwt.verifyToken.js"
import authorizeAdmin from "../service/authorizeAdmin.js";
import { deleteEventById } from "../model/event.model.js";

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

protectedRouter.route('/test').get((req,res) => {
    res.send({
        success: true,
        data: req.tokenPayload
    });
})




//mit martin checken
protectedRouter.route('user/id:').patch(updateUser);


protectedRouter.route('events/id:').patch(updateEvent);


protectedRouter.route('user/:id').delete()



protectedRouter.route('event/:id').delete(deleteEventById)

export default protectedRouter;