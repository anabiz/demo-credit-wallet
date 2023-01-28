import { Request, Response } from "express";
import { 
  option, 
  registerSchema, 
  transferSchema,
  fundorWithdrawalSchema
} from "../utils/validations";
import jwt from 'jsonwebtoken';
import db from "../database/db";
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from "uuid";
import { generateWalletId, validateWalletId } from '../utils/helpers';
import { 
  getUserByEmail,
  createUserAndWallet 
} from '../services/user';
import { Wallet } from "../interface/wallet.dto";
import { User } from "../interface/user.dto";
import { 
  updateUsersWallet, 
  getWalletByUserId, 
  getWalletByWalletId, 
  updateWallet 
} from "../services/wallet";
import { Transaction } from "../interface/transaction";


/**=========================== Register users ============================== **/
const register = async (req: Request, res: Response) => {
  try{

    const validateResult = registerSchema.validate(req.body, option);
    if (validateResult.error) {
      return res.status(400).json({
        Message: "",
        Error: validateResult.error.details[0].message,
      });
    }

    const {
      email, 
      password, 
      firstName, 
      lastName, 
      phoneNumber
    } = validateResult.value;

    const userExist = await getUserByEmail(email);

    if (userExist) {
      return res.status(400).json({
        message: "User already exist",
        Error: ""
      });
    }
    
    //Encrypt user password
    const encryptedPassword = await bcrypt.hash(password, 10);

    const userId = uuidv4();
    const walletId = uuidv4()
    const walletID = await getWalletId();

    //create user and wallet as transaction
    const user: User = {
      id: userId,
      email, 
      password: encryptedPassword, 
      firstName, 
      lastName, 
      phoneNumber
    }
    let wallet : Wallet = {
      id: walletId,
      userId,
      walletID,
    }
    await createUserAndWallet(user, wallet)

    //fetching user because mysql does not support returning
    const registeredUser = await getWalletByUserId(userId);

    const token = jwt.sign(
      { id: registeredUser.userId, email },
      process.env.JWT_SECRET!,
      { expiresIn: "2h",}
    );

    return res.status(201).json({
      message: "User successfully created",
      data: {
        user: registeredUser,
        token
      }
    });

  }catch(err){
    console.log(err)
    res.status(500).json({
      Message: "Unable to create user",
    });
  }
};

/**=========================== Credit other users wallet ============================== **/
const fundTransfer = async (req: Request, res: Response) => {

  const validateResult = transferSchema.validate(req.body, option);
  if (validateResult.error) {
    return res.status(400).json({
      Message: "Invalid input",
      Error: validateResult.error.details[0].message,
    });
  }
  try{
    const creditorWalletId = validateResult.value.walletId;
    const amount =  Number(validateResult.value.amount);
    const description = validateResult.value.description
    const {id} = req.user;

    if(isNaN(amount)){
      return res.status(400).json({
        message: "Invalid amount",
        Error: ""
      });
    }
    
    const debitor = await getWalletByUserId(id);
    if(!debitor){
      return res.status(400).json({
        message: "User not found",
        Error: ""
      });
    }

    if(Number(amount) > debitor.balance){
      return res.status(400).json({
        message: "Insufficient fund",
        Error: ""
      });
    }

    const creditor = await getWalletByWalletId(creditorWalletId);
    if(!creditor){
      return res.status(400).json({
        message: "No user found with this wallet ID",
        Error: ""
      });
    }

    const creditorBalance = Number(creditor.balance) + Number(amount);
    const debitorBalance = Number(debitor.balance) - Number(amount);
    
    const transactionParameter: Transaction ={
      status: "approved",
      reference: uuidv4(),
      amount,
      senderId: id,
      receiverId: creditor.userId,
      description
    }
    await updateUsersWallet(
      debitorBalance,
      debitor.walletID,
      creditorBalance,
      creditor.walletID,
      transactionParameter
    )

    return res.status(200).json({
      message: "Fund transfer successful",
      data: {}
    });

  }catch(err){
    res.status(500).json({
      Message: "Unable to transfer fund",
    });
  }
};

/**=========================== Fund withdraw ============================== **/
const fundMyWallet = async (req: Request, res: Response) => {

  const validateResult = fundorWithdrawalSchema.validate(req.body, option);
  if (validateResult.error) {
    return res.status(400).json({
      Message: "Invalid input",
      Error: validateResult.error.details[0].message,
    });
  }
  const amount =  Number(req.body.amount);
  const description = validateResult.value.description;
  const {id} = req.user;

  if(isNaN(amount)){
    return res.status(400).json({
      message: "Invalid amount",
      Error: ""
    });
  }

  try{ 
    const wallet = await getWalletByUserId(id);
    if(!wallet){
      return res.status(400).json({
        message: "User not found",
        Error: ""
      });
    }

    const balance = Number(wallet.balance) + Number(amount);

    const transactionParameter: Transaction ={
      status: "approved",
      reference: uuidv4(),
      amount,
      senderId: id,
      receiverId: id,
      description
    }
    await updateWallet(
      balance, 
      wallet.walletID,
      transactionParameter,
      "debit"
    );

    return res.status(200).json({
      message: "Wallet successfully credited",
      data: {}
    });

  }catch(err){
    res.status(500).json({
      Message: "Unable to create user",
    });
  }
};

/**=========================== Credit my wallet ============================== **/
const withdrawFund = async (req: Request, res: Response) => {
  const validateResult = fundorWithdrawalSchema.validate(req.body, option);
  if (validateResult.error) {
    return res.status(400).json({
      Message: "Invalid input",
      Error: validateResult.error.details[0].message,
    });
  }
  try{
    const amount =  Number(req.body.amount);
    const {id} = req.user;

    if(isNaN(amount)){
      return res.status(400).json({
        message: "Invalid amount",
        Error: ""
      });
    }
    
    const wallet = await getWalletByUserId(id);
    if(!wallet){
      return res.status(400).json({
        message: "User not found",
        Error: ""
      });
    }

    if(Number(amount) > wallet.balance){
      return res.status(400).json({
        message: "Insufficient fund",
        Error: ""
      });
    }

    const balance = Number(wallet.balance) - Number(amount);
    const transactionParameter: Transaction ={
      status: "approved",
      reference: uuidv4(),
      amount,
      senderId: id,
      receiverId: id,
      description: validateResult.value.description
    }
    await updateWallet(
      balance, 
      wallet.walletID,
      transactionParameter,
      "credit"
    );

    return res.status(200).json({
      message: "withdrawal successful",
      data: {}
    });

  }catch(err){
    res.status(500).json({
      Message: "Unable to withdraw",
    });
  }
};

//================= Reusuables ==============================
const getWalletId = async() : Promise<string> =>{
  let id = generateWalletId();
  let walletIdExist = await db.from('wallet').where('walletID', id).first();
  while(walletIdExist){
    id = generateWalletId();
    walletIdExist = await db.from('wallet').where('walletID', id).first();
  }
  return id;
}

export {
 register,
 fundTransfer,
 fundMyWallet,
 withdrawFund
};
