import express, { json, urlencoded } from "express";
import { PORT } from "./config";
import { errorHandler } from "./middleware/ErrorHandler";
import cors from "cors";
import authMiddleware from "./middleware/AuthMiddleware";

const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.get("/test", authMiddleware, (req, res) => {
    res.send("Hello World");
});

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});