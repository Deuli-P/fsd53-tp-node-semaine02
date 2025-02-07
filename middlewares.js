import jwt from "jsonwebtoken";
import UserModel from './Models/User.js';

export const authMiddleware = (req, res, next) => {

    
    const sessionToken = req.session.token;

    // si pas de sessinToken alors on redirige vers la page de login
    if (!sessionToken) {
        res.redirect("/api/login");
    }
    const token = jwt.verify(sessionToken, process.env.JWT_SECRET);

    const user = UserModel.findOne({ _id: token.id });
    
    // verifie avec le token de jwt si c'est bon ou pas et check si le token session est bon ou pas
    if (!user) {
        res.session.destroy();
        return res.redirect("/api/login");
    }

    next();
};