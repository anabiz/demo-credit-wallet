import { Request, Response } from "express";


/**=========================== login user ============================== **/

const login = async (req: Request, res: Response) => {
    return res.status(200).json({
      message: "Hello world",
    });
};

export {
 login
};
