import jwt from "jsonwebtoken";
import { SECRET_KEY } from "./config.js";

export const middleware = (req, res, next) => {
    try {

        const authHeader = req.headers['authorization'];// console.log(authHeader);
        // Format: "Bearer TOKEN"
        const token = authHeader && authHeader.split(' ')[1];
        if (!token) {
            return res.status(400).send("Token Not Found....");
        }

        let decode = jwt.verify(token, SECRET_KEY);
        req.user = decode.user;
        next();
    } catch (error) {
        return res.status(400).send(error.message+"in Middleware");
    }

}


