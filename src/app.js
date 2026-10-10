
import express from "express";
import router_funds from "./Router/fundsRouter.js";
import stocksRoute from "./Router/stocksRouter.js";
import { errorHandler } from "./Middlewares/errorHandler.js";

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/funds", router_funds)
app.use("/api/stocks", stocksRoute)
app.use(errorHandler)



export {app}
