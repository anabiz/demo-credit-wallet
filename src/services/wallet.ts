import db from "../database/db";
import { WalletAndUser } from "../interface/wallet.dto";

export const getWalletByUserId = async(userId: string): Promise<WalletAndUser>=>{
    return  await db.table('wallet').innerJoin('user','user.id', 'wallet.userId')
      .where('userId', userId).first().select('userId', 'email', 'firstName', 'lastName','walletID','balance');  
}

export const getWalletByWalletId = async(walletId: string): Promise<WalletAndUser>=>{
    return  await db.table('wallet').innerJoin('user','user.id', 'wallet.userId')
      .where('walletID', walletId).first().select('wallet.id as id','userId', 'email', 'firstName', 'lastName','walletID', 'balance');  
}

export const updateUsersWallet = async(
    debtorBalance: number, 
    debitorWalletId: string,
    creditorBalance: number,
    creditorWalletId: string,
): Promise<any>=>{
    return await db.transaction(async trx => {
        //debit debtor wallet
        await trx('wallet')
          .where({walletID: debitorWalletId})
          .update({balance: debtorBalance});
        //credit creditor wallet
        return await trx('wallet')
           .where({walletID: creditorWalletId})
           .update({balance: creditorBalance});
    })
}

export const updateWallet = async(
    balance: number, 
    walletId: string
): Promise<any>=>{
    return await db('wallet')
      .where({walletID: walletId})
      .update({balance: balance});
}