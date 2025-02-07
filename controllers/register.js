import bcrypt from 'bcrypt';
import UserModel from '../Models/User.js';
import { regexEmail } from "../utils/utlis.js";
const saltRound = 10;

export const postRegister = async (req, res) => {
    try {

        const { firstName, lastName, email , password, password_confirm } = req.body;

        console.log(req.body);
        // ========== SECURITY ==========

        // check si les champs sont vides
        if (firstName  === ''|| lastName  === ''|| email  === ''|| password === '' || password_confirm === '') {
            return res.status(400).render("home", {message : "Tous les champs doivent être remplis"});
        };

        // check longueur des champs
        if(firstName.length >= 255 || lastName.length >= 255 || email.length >= 255) {
            return res.status(400).render("home", {message : "Les champs ne doivent pas dépasser 255 caractères"});
        };
        // check si les mots de passes sont identitiques
        if(password !== password_confirm) {
            return res.status(400).render("home", {message : "Les mots de passe ne correspondent pas"});
        };
        // check longueur du mot de passe
        if(password.length < 8 || password.length > 255 ) {
            return res.status(400).render("home", {message : "Le mot de passe doit faire minimum 8 caractères et maximum 255 caractères"});

        };
        // check si l'email est valide
        if(!regexEmail.test(email)) {
            return res.status(400).render('home', {message : "L'email n'est pas valide"});

        };

        // check si l'email existe déjà
        const userExist = await UserModel.findOne({email : email});

        console.log('userExist :', userExist);
        if (userExist) {
            return res.status(400).render("/", {message: "L'email existe déjà"});
        };

        // hashage des mot de passes
        const passwordHash = await bcrypt.hash(password, saltRound);

        // création du nouvel utilisateur
        const newUser = new UserModel({
            firstname: firstName,
            lastname: lastName,
            email,
            password : passwordHash
        });

        await newUser.save()

        res.status(201).redirect("/api/login");

    }
    catch (error) {
        console.log('Erreur catch : ',error);
        return res.status(500).render("home", { message: "Une erreur est survenue, veuillez réessayer." });
    }

};

