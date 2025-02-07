import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import UserModel from "../Models/User.js";


export const getLogin = (req, res) => {
    res.render("login");
};

export const postLogin = async (req, res) => {
    try{

        const {email, password} = req.body;
        
        const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;


        console.log('login : ', email, password);
        if(email === "" || password === "") {
            return res.status(400).render('login',{message :"Tous les champs doivent être remplis"});
        }
        if(password.length < 8 || password.length > 255) {
            return res.status(400).render('login',{message :"Le mot de passe doit faire minimum 8 caractères et maximum 255 caractères"});
        }
        if(!regexEmail.test(email)) {
            return res.status(400).render('login',{message :"L'email n'est pas valide"});
        }

        const userExist = await UserModel.findOne({email: email});

        if(!userExist) {
            return res.status(400).render('login',{message :"L'email ou le mot de passe est incorrect"});
        }

        const match = await bcrypt.compare(password, userExist.password);

        if(!match){
            return res.status(400).render('login',{message:"L'email ou le mot de passe est incorrect"});
        }

        const newToken = jwt.sign({id: userExist._id}, process.env.JWT_SECRET, {expiresIn: "1h"});

        req.session.token = newToken;
        res.redirect("/dashboard");

    }
    catch (error) {
        console.log("Erreur catch login :",error);
        return res.status(500).render('login',{message :"Erreur lors de la connexion"});
    }
};