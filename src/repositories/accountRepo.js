
let balance = 0;


export async function getFunds() {
    return balance;
}

export async function addFunds(amount) {
    balance += amount
    return balance;
}

