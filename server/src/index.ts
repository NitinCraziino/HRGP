import express from "express";
import { PORT } from "./config";
import { errorHandler } from "./middlewares/ErrorHandler";
import router from "./routes";
import middlewares from "./middlewares";
import configurePassport from "./config/configurePassport";

const app = express();
// All common middlewares are defined in the middlewares file
app.use(middlewares);

// All routes are defined in the routes file
app.use("/api", router);

// Error handler middleware
app.use(errorHandler);

app.listen(PORT, () => {
    configurePassport();
    console.log(`Server is running on port ${PORT}`);
});