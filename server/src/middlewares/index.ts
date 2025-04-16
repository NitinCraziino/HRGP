import { json, Router, urlencoded } from "express";
import { CLIENT_URL, EXPRESS_SESSION_SECRET, NODE_ENV } from "../config";
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";

const router = Router();

router.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  }),
);

router.use(json());
router.use(urlencoded({ extended: true }));

router.use(cookieParser());
router.use(
  session({
    secret: EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 6, //6 hours
      httpOnly: true,
      secure: NODE_ENV === "production",
    },
  }),
);

router.use(passport.initialize());
router.use(passport.session());

export default router;
