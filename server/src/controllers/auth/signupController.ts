import { Request, Response, NextFunction } from "express";
import { ValidationError } from "../../types/CustomError";
import { StatusCode } from "../../types";
import createUser from "../../db/user/createUser";
import bcrypt from "bcryptjs";
import { paymentService } from "../../services/PaymentService";
import createCompany from "../../db/company/createCompany";
import updateStripeCustomerSubscription from "../../db/stripe/updateStripeCustomerSubscription";
import createEmployee from "../../db/employee/createEmployee";
import { z } from "zod";
import updateCompanyId from "../../db/user/updateCompanyId";

const signupController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validatedData = signupSchema.parse(req.body);

        const hashedPassword = await bcrypt.hash(validatedData.password, 10);

        // create a new user
        const userId = await createUser({
            ...validatedData,
            hashedPassword,
            primaryPhone: validatedData.primaryPhone!
        });

        // create a new company
        const companyId = await createCompany({
            userId: userId,
            companyName: validatedData.companyName,
            companyType: validatedData.companyType,
            industryId: validatedData.industryId,
        });

        // update the user's company id
        await updateCompanyId(userId, companyId);

        // create a new employee
        await createEmployee({
            companyId: companyId,
            positionTitle: validatedData.positionTitle,
            userId: userId,
        });

        // create a new stripe customerId
        const customerPayload = {
            email: validatedData.primaryEmail,
            name: `${validatedData.firstName} ${validatedData.lastName}`,
            phone: validatedData.primaryPhone || "",
        };
        const stripeCustomer = await paymentService.createCustomer(customerPayload);

        // update the stripe customerId
        await updateStripeCustomerSubscription({
            userId: userId.toString(),
            companyId: companyId.toString(),
            customerId: stripeCustomer.id,
            subscriptionId: "",
            signUpOn: new Date().toISOString(),
        });

        // extract the user data to send to the client for payment processing
        const user = {
            userId: userId.toString(),
            primaryEmail: validatedData.primaryEmail,
            primaryPhone: validatedData.primaryPhone,
            firstName: validatedData.firstName,
            lastName: validatedData.lastName,
            companyId: companyId.toString(),
            stripeCustomerId: stripeCustomer.id
        };

        res.status(StatusCode.CREATED).json(user);
    } catch (error) {
        if (error instanceof ValidationError && error.location === "Unknown") {
            next(new ValidationError(error.message, "SIGNUP_CONTROLLER"));
        }
        // Catch and handle Zod validation errors
        if (error instanceof z.ZodError) {
            next(new ValidationError("Validation failed: " + error.errors.map(e => e.message).join(", "), "SIGNUP_CONTROLLER"));
        }
        next(error);
    }
};

export default signupController;


// Zod schema definition for validation
const signupSchema = z.object({
    primaryEmail: z.string().email("Invalid primary email"),
    primaryPhone: z.string(),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    firstName: z.string().min(1, "First name must be between 1 and 50 characters").max(50),
    lastName: z.string().min(1, "Last name must be between 1 and 50 characters").max(50),
    companyName: z.string().min(1, "Company name must be between 1 and 100 characters").max(100),
    companyType: z.string().min(1, "Company type must be between 1 and 100 characters").max(100),
    industryId: z.string().min(1, "Industry ID must be between 1 and 100 characters").max(100),
    positionTitle: z.string().min(1, "Position title must be between 1 and 100 characters").max(100),
});