import dotenv from "dotenv";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import session from "express-session";
import route from "./routes/routes.js";
import MongoStore from 'connect-mongo';
import connectDB from "./config/databases.js";
// ==========
// App initialization
// ==========

dotenv.config();
const { APP_HOSTNAME, APP_PORT, NODE_ENV } = process.env;
const __dirname = path.dirname(fileURLToPath(import.meta.url));
connectDB();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  name : 'simple',
  secret : 'simple',
  resave :true,
  saveUninitialized: true,
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
  cookie : { maxAge : 180 * 60 * 1000 } 
}));

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.locals.pretty = (NODE_ENV !== 'production'); // Indente correctement le HTML envoyé au client (utile en dev, mais inutile en production)
app.use(express.static(path.join(__dirname, "public")));

// ==========
// App middlewares
// ==========


// ==========
// App routers
// ==========
app.use("/", route);

// ==========
// App start
// ==========

app.listen(APP_PORT, () => {
  console.log(`App listening at http://${APP_HOSTNAME}:${APP_PORT}`);
});
