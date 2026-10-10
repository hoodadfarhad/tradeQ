import { Router } from "express";
import {depositMoney, getMoney} from "../Controller/fundsController.js";
import { depositSchema } from "../schemas/fundSchemas.js";
import { validate } from "../Middlewares/validater.js";

const router_funds = Router();



router_funds.post("/",validate(depositSchema), depositMoney);
router_funds.get("/", getMoney);



export default router_funds;