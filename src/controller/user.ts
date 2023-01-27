import { Request, Response } from "express";
import db from "../database/db";
import { option, registerSchema } from "../utils/validations";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from "uuid";

/**=========================== Register users ============================== **/
const register = async (req: Request, res: Response) => {
  try{

    const validateResult = registerSchema.validate(req.body, option);
    if (validateResult.error) {
      return res.status(400).json({
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

    const userExist = await db.from('user').where('email', email).first();

    if(userExist){
      return res.status(400).json({
        message: "User already exist",
      });
    }

    //Encrypt user password
    const encryptedPassword = await bcrypt.hash(password, 10);
    const userId = uuidv4();

    await db('user').insert({
      id: userId,
      email, 
      password: encryptedPassword, 
      firstName, 
      lastName, 
      phoneNumber
    });

    //create wallet account

    //fetching user because mysql does not support returning
    const registeredUser = await db.from('user').where('id', userId).first()
      .select('id', 'email', 'firstName', 'lastName');

    const token = jwt.sign(
      { id: registeredUser.id, email },
      process.env.JWT_SECRET!,
      { expiresIn: "2h",}
    );

    return res.status(200).json({
      message: "User successfully created",
      data: {
        user: registeredUser,
        token
      }
    });

  }catch(err){
    res.status(500).json({
      Message: "Unable to create user",
    });
  }
};

/**=========================== Credit user wallet ============================== **/
const creditWallet = async (req: Request, res: Response) => {
  try{

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

export {
 register,
 creditWallet
};
