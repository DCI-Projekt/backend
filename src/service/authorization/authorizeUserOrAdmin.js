import { rolesEnum } from "../../model/role.model.js";

// Middleware-Funktion zum Authorisieren der admins
function authorizeUserOrAdmin(req, res, next) {
    const jwtPayload = req.tokenPayload;
    console.log("🚀 ~ file: authorizeAdmin.js:6 ~ authorizeAdmin ~ jwtPayload:", jwtPayload)

    if (jwtPayload.role === rolesEnum.admin || jwtPayload.role === rolesEnum.user) {
        console.log("🚀 ~ file: authorizeUserAndAdmin.js:9 ~ Is Admin or User ")
        next();
    } else {
        res.status(401).send({
            success: false,
            message: `Role ${jwtPayload.role} is not authorized for the endpoint`
        });
        return;
    }

}

export default authorizeUserOrAdmin;