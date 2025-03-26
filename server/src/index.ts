import express, { json, urlencoded } from "express";
import { PORT, CLIENT_URL, EXPRESS_SESSION_SECRET } from "./config";
import { errorHandler } from "./middlewares/ErrorHandler";
import cors from "cors";
import configurePassport from "./config/configurePassport";
import passport from "passport";
import session from "express-session";
import cookieParser from "cookie-parser";
import router from "./routes";

const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cors({
    origin: CLIENT_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
}));
app.use(cookieParser());
app.use(session({
    secret: EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 15, // 15 days
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
    }
}));
app.use(passport.initialize());
app.use(passport.session());

app.use("/api", router);
app.use(errorHandler);

app.listen(PORT, () => {
    configurePassport();
    console.log(`Server is running on port ${PORT}`);
});