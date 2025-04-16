import { NextFunction, Request, Response } from "express";
import { paymentService } from "../../services/PaymentService";
import { StatusCode } from "../../types";
import { z } from "zod";

const deleteMethodController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { methodId } = schema.parse(req.params);

    await paymentService.deletePaymentMethod(methodId);

    res.status(StatusCode.OK).json({
      message: "Payment method deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

const schema = z.object({
  methodId: z.string({
    required_error: "Method ID is required",
  }),
});

export default deleteMethodController;
