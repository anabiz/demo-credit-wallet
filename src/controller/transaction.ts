import { Request, Response } from "express";
import { getTransactions } from '../services/transaction';
import { getPagination } from "../utils/helpers";

/**==================== get user tansactions ========================**/
const getTransactionHistory = async (req: Request, res: Response) => {
    const userId = req.user.id;
    const reqData = req.query;
    let where: any = {};
    if(reqData.status)
        where.status = reqData.status;

    if(reqData.tranType)
        where.tranType = reqData.tranType;   

    const perPage = Number(reqData.perPage) || 10;
    let page = Number(reqData.currentPage) || 1;
    if (page < 1) page = 1;
    const offset = (page - 1) * perPage;

    try {
        const [total, rows] = await getTransactions(userId, offset, perPage, where);

        let paginationResult = getPagination(total, perPage, offset, rows, page);

        res.status(200).json({
            message: "Transactions successfully retrieved",
            data: {
              ...paginationResult
            }
        });
      
    } catch (err) {
      res.status(500).json({
        message:"Usable to get transaction history",
        Error: "Internal server Error",
      });
    }
  };

  export {
    getTransactionHistory
  }