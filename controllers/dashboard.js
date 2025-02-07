import UserModel from "../Models/User.js";
import jwt from "jsonwebtoken";

export const getDashboard = async (req, res) => {

    const token = req.session.token;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // On va chercher les infos de l'utilisateurs avec son id 
    const user = await UserModel.findOne({_id: decoded.id});
    res.render("dashboard", {user: user});
}; 