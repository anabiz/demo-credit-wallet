import db from "../database/db";

export const getTransactions = async(
    userId: string,
    offset: number,
    perPage: number,
    where: any, 
): Promise<any>=>{
    return Promise.all([
        db.count('* as count')
          .from("transaction")
          .where({'receiverId': userId, ...where})
          .orWhere({'senderId': userId, ...where})
          .first(),
        db.select("*")
          .from("transaction")
          .where({'receiverId': userId, ...where})
          .orWhere({'senderId': userId, ...where})
          .offset(offset)
          .limit(perPage)
    ])
}