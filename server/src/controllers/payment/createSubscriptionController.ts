import { NextFunction, Request, Response } from "express";
import { StatusCode } from "../../types";
import { paymentService } from "../../services/PaymentService";
import updateStripeCustomerSubscription from "../../db/stripe/updateStripeCustomerSubscription";
import { ValidationError } from "../../types/CustomError";
import z from "zod";

const createSubscription = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { paymentMethodId, customerId, companyId, email, name, phone, userId } =
      subscriptionSchema.parse(req.body);

    const subscription = await paymentService.createSubscription({
      paymentMethodId,
      customerId,
      companyId,
      email,
      name,
      phone,
    });

    // update the user with the subscription id in db
    await updateStripeCustomerSubscription({
      companyId,
      customerId,
      subscriptionId: subscription.id,
      userId,
      signUpOn: new Date().toISOString(),
    });

    res.status(StatusCode.CREATED).json({
      message: "Subscription created successfully",
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      next(new ValidationError(`❌ ${error.errors[0].message}`, "createSubscription"));
    }
    next(error);
  }
};

export default createSubscription;

const subscriptionSchema = z.object({
  paymentMethodId: z.string({
    required_error: "Payment method ID is required",
  }),
  customerId: z.string({ required_error: "Customer ID is required" }),
  companyId: z.string({ required_error: "Company ID is required" }),
  email: z.string({ required_error: "Email is required" }).email("Invalid email format"),
  name: z.string({ required_error: "Name is required" }),
  phone: z.string({ required_error: "Phone is required" }),
  userId: z.string({ required_error: "User ID is required" }),
});
