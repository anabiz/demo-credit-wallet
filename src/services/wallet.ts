import db from "../database/db";
import { Transaction } from "../interface/transaction.dto";
import { WalletAndUser } from "../interface/wallet.dto";
import { v4 as uuidv4 } from "uuid";


export const getWalletByUserId = async(userId: string): Promise<WalletAndUser>=>{
    return  await db.table('wallet')
      .innerJoin('user','user.id', 'wallet.userId')
      .where('userId', userId)
      .first()
      .select('userId', 'email', 'firstName', 'lastName','walletID','balance');  
}

export const getWalletByWalletId = async(walletId: string): Promise<WalletAndUser>=>{
    return  await db.table('wallet')
      .innerJoin('user','user.id', 'wallet.userId')
      .where('walletID', walletId)
      .first()
      .select('wallet.id as id','userId', 'email', 'firstName', 'lastName','walletID', 'balance');  
}

export const updateUsersWallet = async(
    debtorBalance: number, 
    debitorWalletId: string,
    creditorBalance: number,
    creditorWalletId: string,
    transactionParameter: Transaction
): Promise<any>=>{
    return await db.transaction(async trx => {
        //debit debtor wallet
        await trx('wallet')
          .where({walletID: debitorWalletId})
          .update({balance: debtorBalance});
        //credit creditor wallet
        await trx('wallet')
           .where({walletID: creditorWalletId})
           .update({balance: creditorBalance});
        //create transaction record
        await trx('transaction').insert({
            ...transactionParameter,
            id: uuidv4(),
            tranType: "debit"
        });  
        await trx('transaction').insert({
            ...transactionParameter,
            id: uuidv4(),
            tranType: "credit"
        });  
    })
}

export const updateWallet = async(
    balance: number, 
    walletId: string,
    transactionParameter: Transaction,
    tranType: string = "credit"
): Promise<any>=>{
    return await db.transaction(async trx => {
        await trx('wallet')
          .where({walletID: walletId})
          .update({balance: balance});
        //create transaction record
        await trx('transaction').insert({
            ...transactionParameter,
            id: uuidv4(),
            tranType
        });
    })
}