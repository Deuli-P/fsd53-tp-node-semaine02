import bcrypt from 'bcrypt';
import UserModel from '../Models/User.js';
const saltRound = 10;

export const postRegister = async (req, res) => {
    try {

        const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

        const { firstName, lastName, email , password, password_confirm } = req.body;

        console.log(req.body);
        // ========== SECURITY ==========

        let message 
        if (firstName  === ''|| lastName  === ''|| email  === ''|| password === '' || password_confirm === '') {
            // message = "Tous les champs doivent être remplis";
            return res.status(400).render("home", {message : "Tous les champs doivent être remplis"});

        };

        if(firstName.length >= 255 || lastName.length >= 255 || email.length >= 255) {
            // message = "Les champs ne doivent pas dépasser 255 caractères";
            return res.status(400).render("home", {message : "Les champs ne doivent pas dépasser 255 caractères"});

        };
        if(password !== password_confirm) {
            // message = "Les mots de passe ne correspondent pas";
            return res.status(400).render("home", {message : "Les mots de passe ne correspondent pas"});
        };
        if(password.length < 8 || password.length > 255 ) {
            // message = "Le mot de passe doit faire minimum 8 caractères et maximum 255 caractères";
            return res.status(400).render("home", {message : "Le mot de passe doit faire minimum 8 caractères et maximum 255 caractères"});

        };
        if(!regexEmail.test(email)) {
            // message = "L'email n'est pas valide";
            return res.status(400).render('home', {message : "L'email n'est pas valide"});

        };

        // check si l'email existe déjà
        const userExist = await UserModel.findOne({email : email});

        console.log('userExist :', userExist);
        if (userExist) {
            // message = "L'email existe déjà";
            return res.status(400).render("/", {message: "L'email existe déjà"});
        };

        const passwordHash = await bcrypt.hash(password, saltRound);

        const newUser = new UserModel({
            firstname: firstName,
            lastname: lastName,
            email,
            password : passwordHash
        });

        console.log("newUser créé")
        await newUser.save()

        res.status(201).redirect("/api/login");

    }
    catch (error) {
        console.log('Erreur catch : ',error);
        return res.status(500).render("home", { message: "Une erreur est survenue, veuillez réessayer." });
    }

};

