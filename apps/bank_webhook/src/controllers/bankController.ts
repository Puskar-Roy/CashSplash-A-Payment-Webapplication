import asyncHandler from "../utils/catchAsync";
import { Request, Response } from "express";
import { PaymentInformationDTO } from "../interfaces";
// import db from "@repo/database/client";
import {
  AuthType,
  BalanceModel,
  MerchantModel,
  OnRampStatus,
  UserModel,
  OnRampTransactionModel,
} from "../models/models";

// export const paymentController = asyncHandler(async (req: Request, res: Response) => {
//   const paymentInformation: PaymentInformationDTO = {
//     token: req.body.token,
//     userId: req.body.user_identifier,
//     amount: req.body.amount,
//   };
//   try {
//     await db.$transaction([
//       db.balance.updateMany({
//         where: {
//           userId: paymentInformation.userId,
//         },
//         data: {
//           amount: {
//             increment: Number(paymentInformation.amount),
//           },
//         },
//       }),
//       db.onRampTransaction.updateMany({
//         where: {
//           token: paymentInformation.token,
//         },
//         data: {
//           status: "Success",
//         },
//       }),
//     ]);
//     res.status(200).json({
//       message: "Captured",
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(411).json({
//       message: "Error while processing webhook",
//     });
//   }
// });

export const paymentController = asyncHandler(
  async (req: Request, res: Response) => {
    const paymentInformation: PaymentInformationDTO = {
      token: req.body.token,
      userId: req.body.user_identifier,
      amount: req.body.amount,
    };

    try {
      const session = await UserModel.startSession();
      session.startTransaction();

      try {
        await BalanceModel.updateOne(
          { userId: paymentInformation.userId },
          { $inc: { amount: paymentInformation.amount } },
          { session }
        );

        await OnRampTransactionModel.updateOne(
          { token: paymentInformation.token },
          { status: "Success" },
          { session }
        );

        await session.commitTransaction();
        session.endSession();

        res.status(200).json({
          message: "Captured",
        });
      } catch (error) {
        await session.abortTransaction();
        session.endSession();
        console.error(error);
        res.status(411).json({
          message: "Error while processing webhook",
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  }
);
