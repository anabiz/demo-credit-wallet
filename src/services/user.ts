import db from "../database/db";
import { User } from "../interface/user.dto";
import { Wallet } from "../interface/wallet.dto";


export const getUserByEmail = async(email: string): Promise<any>=>{
    return await db.from('user').where('email', email).first()
}

export const getUserById = async(id: string): Promise<User>=>{
    return await db.from('user').where('id', id).first()
}

export const createUserAndWallet = async(user: User, wallet: Wallet): Promise<any>=>{
    return await db.transaction(async trx => {
        //create user
        await trx('user').insert(user);
        //create wallet account for user
        await trx('wallet').insert(wallet);
      })
}