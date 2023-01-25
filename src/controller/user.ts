import { Request, Response } from "express";


/**=========================== Get all users============================== **/

const getUsers = async (req: Request, res: Response) => {
    return res.status(200).json({
      message: "Hello world",
    });
};

export {
 getUsers
};
