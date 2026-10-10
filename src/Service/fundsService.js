import { AppError } from "../errors/AppError.js";
import { addFunds, getFunds } from "../repositories/accountRepo.js";



export async function depositAccount(amount) {
    const data = await addFunds(amount);
    if (data > 200) {
        throw new AppError("You damn rich! get out", 444)
    }
    return data;
}

export async function getAccount() {
    const data = await getFunds();
    return data;
}