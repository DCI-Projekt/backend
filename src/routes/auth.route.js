import { Router } from "express";
import { validationResult } from 'express-validator';
import { loginUser, refreshNewVerification, registerNewUser, verifyEmail } from "../controller/user.controller.js";
import { userValidationMiddleware } from '../service/validation/userValidationSchema.js';

function myRouteHandler(req, res, next) {  
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
}


// neue Router Instanz
const authRouter = Router();

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


export default authRouter;