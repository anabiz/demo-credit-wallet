import { Request, Response } from "express";
import { loginSchema, option } from "../utils/validations";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
import { getUserByEmail } from "../services/user";


/**==================== Login User ========================**/
const login = async (req: Request, res: Response) => {
  try {
    const validateResult = loginSchema.validate(req.body, option);
    if (validateResult.error) {
      return res.status(400).json({
        Error: validateResult.error.details[0].message,
      });
    }
    const {email, password} = validateResult.value;

    //check if the user exist
    const user = await getUserByEmail(email);

    if (!user) {
      return res.status(400).json({
        Message: "Wrong email or password",
        Error: ""
      });
    }

    if(!user.isVerified){
      return res.status(400).json({
        Message: "you have not been verified",
      });
    }

    if (user && await bcrypt.compare(password, user.password)) {
      const token = jwt.sign(
        { id: user.id, email },
        process.env.JWT_SECRET!,
        { expiresIn: process.env.JWT_EXPIRATION,}
      );

      return res.status(200).json({
        message: "Login successful",
        data: {
          token
        }
      });
    }

    return res.status(400).json({
      Message: "Wrong email or password",
      Error: ""
    });
    
  } catch (err) {
    res.status(500).json({
      message:"Usable to login",
      Error: "Internal server Error",
    });
  }
};

export {
 login
};
