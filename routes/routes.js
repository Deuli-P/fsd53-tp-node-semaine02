import express from "express";
const router = express.Router();
import { getDashboard } from "../controllers/dashboard.js";
import {getHome, getLogout} from "../controllers/home.js";
import {getLogin, postLogin} from "../controllers/login.js";
import {postRegister} from "../controllers/register.js";
import { authMiddleware } from "../middlewares.js";

router.post('/api/register', postRegister);
router.get("/api/logout", getLogout);
router.get("/api/login", getLogin);
router.post('/api/login',  postLogin);
router.get('/dashboard', authMiddleware, getDashboard);


router.get("/", getHome);



export default router;
