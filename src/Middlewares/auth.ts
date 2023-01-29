import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JwtExpPayload } from "../interface/user.dto";

declare global {
    namespace Express {
      interface Request {
        user: {
            id: string, 
            email: string
        };
      }
    }
}

const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
  let token: string = "";

  if (req.headers.authorization) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).send({
      status: 401,
      message: "Not authorized, you have no access token",
    });
  }

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      const { id, email } = jwt.verify(
        token,
        process.env.JWT_SECRET || ""
      ) as JwtExpPayload;

      req.user = {id,email};

      next();
    } catch (error) {
      return res.status(401).send({ error, message: "not a valid user" });

    }
  }
};


export { 
    isAuthenticated 
};
