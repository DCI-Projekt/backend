import { Router } from "express";


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