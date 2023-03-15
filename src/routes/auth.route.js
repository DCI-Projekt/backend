import { Router } from "express";
import { registerNewUser, login, editOwnProfile, verifyEmail, refreshNewVerification } from "../controller/user.controller.js";
import verifyToken from "../service/jwt.verifyToken.js";


// neue Router Instanz
const authRouter = Router();

// Routen Definition fuer /register
authRouter.route('/register')
    .post(registerNewUser);

// Routen Definition fuer /login
authRouter.route('/login')
    .post(login);

// Routen Definition fuer (Email-Verifikation)
authRouter.route('/verify')
    .post(verifyEmail)
    .put(refreshNewVerification);


export default authRouter;