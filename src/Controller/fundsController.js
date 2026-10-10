import { AppError } from "../errors/AppError.js";
import { depositAccount, getAccount } from "../Service/fundsService.js";


export async function getMoney(req,res,next) {
    try{
    
    const balance = await getAccount();

    res.status(201).json({
      message: `Balance is: ${balance}`,
      balance: balance
    });

    }catch(error){
        next(error);
    }
}

export async function depositMoney(req,res,next) {
    try{
        const { amount, currency } = req.body;

    const balance = await depositAccount(amount);

    res.status(201).json({
      message: `Amounts of ${amount} ${currency} added successfully. New balance is: ${balance}`,
      balance: balance
    });



    }catch(error){
        next(error);
    }
}
