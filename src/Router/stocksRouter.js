import { Router } from "express";
import { validate } from "../Middlewares/validater.js";
import { buyStockSchema } from "../schemas/stockSchemas.js";
import { buyStocks } from "../Controller/stocksController.js";



const stocksRoute = Router();

stocksRoute.post("/buy", validate(buyStockSchema), buyStocks);

export default stocksRoute;
