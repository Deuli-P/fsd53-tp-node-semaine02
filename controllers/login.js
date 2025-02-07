import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import UserModel from "../Models/User.js";
import { regexEmail } from "../utils/utlis.js";

export const getLogin = (req, res) => {
    res.render("login");
};

export const postLogin = async (req, res) => {
    try{

        const {email, password} = req.body;


        // ========= SCURITY ============
        // Check si les inpus sont vides
        if(email === "" || password === "") {
            return res.status(400).render('login',{message :"Tous les champs doivent être remplis"});
        }
        // Check si le mot de passe à les bonnes longueurs
        if(password.length < 8 || password.length > 255) {
            return res.status(400).render('login',{message :"Le mot de passe doit faire minimum 8 caractères et maximum 255 caractères"});
        }

        // Check du format de l'email
        if(!regexEmail.test(email)) {
            return res.status(400).render('login',{message :"L'email n'est pas valide"});
        }

        const userExist = await UserModel.findOne({email: email});

        // Check si l'utilisateur existe par l'email
        if(!userExist) {
            return res.status(400).render('login',{message :"L'email ou le mot de passe est incorrect"});
        }

        // Comparaison du mot de passe envoyé avec celui de la DB
        const match = await bcrypt.compare(password, userExist.password);

        // Si pas le bon mot de passe on le renvoi sur la page login
        if(!match){
            return res.status(400).render('login',{message:"L'email ou le mot de passe est incorrect"});
        }

        // On lui créer un token a partir de son id
        const newToken = jwt.sign({id: userExist._id}, process.env.JWT_SECRET, {expiresIn: "1h"});

        // Token stocké dans les cookies
        req.session.token = newToken;
        res.redirect("/dashboard");

    }
    catch (error) {
        console.log("Erreur catch login :",error);
        return res.status(500).render('login',{message :"Erreur lors de la connexion"});
    }
};