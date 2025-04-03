import express from "express";
import { PORT } from "./config";
import { errorHandler } from "./middlewares/errorHandler";
import router from "./routes";
import middlewares from "./middlewares";
import configurePassport from "./config/configurePassport";

const app = express();
// All common middlewares are defined in the middlewares file
app.use(middlewares);

app.use("/api", router);

app.use(errorHandler);

app.listen(PORT, () => {
    configurePassport();
    console.log(`Server is running on port ${PORT}`);
});