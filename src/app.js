
import express from "express";
import rateLimit from "express-rate-limit"
import router_funds from "./Router/fundsRouter.js";
import stocksRoute from "./Router/stocksRouter.js";
import { errorHandler } from "./Middlewares/errorHandler.js";

const app = express();
const API_limit = rateLimit({
  windowMs: 60 * 1000, 
  limit: 5,         
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    error: "Too many requests. You ok? Please try again later.",
  },
})

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/stocks",API_limit)
app.use("/api/funds", router_funds)
app.use("/api/stocks", stocksRoute)
app.use(errorHandler)



export {app}
