import express, { json, urlencoded } from "express";
import { PORT, CLIENT_URL } from "./config";
import { errorHandler } from "./middlewares/ErrorHandler";
import cors from "cors";
import authMiddleware from "./middlewares/AuthMiddleware";
import configurePassport from "./config/configurePassport";
import connectDb from "./config/connectDb";

const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cors({
    origin: CLIENT_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
}));

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.get("/test", authMiddleware, (req, res) => {
    res.send("Hello World");
});

app.use(errorHandler);

app.listen(PORT, () => {
    configurePassport();
    connectDb();
    console.log(`Server is running on port ${PORT}`);
});