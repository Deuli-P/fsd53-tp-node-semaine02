import UserModel from "../Models/User.js";
import jwt from "jsonwebtoken";

export const getDashboard = async (req, res) => {

    const token = req.session.token;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await UserModel.findOne({_id: decoded.id});
    res.render("dashboard", {user: user});
}; 