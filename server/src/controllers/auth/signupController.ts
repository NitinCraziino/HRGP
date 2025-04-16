import { Request, Response, NextFunction } from "express";
import { ValidationError } from "../../types/CustomError";
import { StatusCode } from "../../types";
import createUser from "../../db/user/createUser";
import bcrypt from "bcryptjs";
import { paymentService } from "../../services/PaymentService";
import createCompany from "../../db/company/createCompany";
import createEmployee from "../../db/employee/createEmployee";
import updateStripeCustomerSubscription from "../../db/stripe/updateStripeCustomerSubscription";
import updateCompanyId from "../../db/user/updateCompanyId";
import findCountry from "../../db/address/findCountry";
import findState from "../../db/address/findState";
import findCity from "../../db/address/findCity";
import createAddress from "../../db/address/createAddress";
import createCountry from "../../db/address/createCountry";
import createState from "../../db/address/createState";
import createCity from "../../db/address/createCity";
import { z } from "zod";

const signupController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validatedData = signupSchema.parse(req.body);

    const hashedPassword = await bcrypt.hash(validatedData.password, 10);

    // create a new user
    const userId = await createUser({
      ...validatedData,
      hashedPassword,
      primaryPhone: validatedData.primaryPhone!,
    });

    // create a new company
    const companyId = await createCompany({
      userId: userId,
      companyName: validatedData.companyName,
      companyType: validatedData.companyType,
      industryId: validatedData.industryId,
    });

    // update the user with the company id
    await updateCompanyId(userId, companyId);

    // process the address
    await processAddress({
      userId: userId,
      companyId: companyId,
      branchAddress: validatedData.address,
      addressType: "Primary",
      country: validatedData.country,
      state: validatedData.state,
      city: validatedData.city,
      postalCode: validatedData.postalCode,
    });

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
      stripeCustomerId: stripeCustomer.id,
    };

    res.status(StatusCode.CREATED).json(user);
  } catch (error) {
    if (error instanceof ValidationError && error.location === "Unknown") {
      next(new ValidationError(error.message, "SIGNUP_CONTROLLER"));
    }
    // Catch and handle Zod validation errors
    if (error instanceof z.ZodError) {
      next(
        new ValidationError(
          "Validation failed: " + error.errors.map((e) => e.message).join(", "),
          "SIGNUP_CONTROLLER",
        ),
      );
    }
    next(error);
  }
};

export default signupController;

type Address = {
  userId: number;
  companyId: number;
  branchAddress: string;
  addressType: string;
  country: string;
  state: string;
  city: string;
  postalCode: string;
};

const processAddress = async (data: Address) => {
  let countryId = (await findCountry(data.country))?.countryId;
  if (!countryId) {
    countryId = await createCountry(data.userId, data.country);
  }
  let stateId = (await findState(data.state, countryId))?.stateId;
  if (!stateId) {
    stateId = await createState(data.userId, data.state, countryId);
  }
  let cityId = (await findCity(data.city, stateId))?.cityId;
  if (!cityId) {
    cityId = await createCity(data.userId, data.city, stateId);
  }

  await createAddress({
    userId: data.userId.toString(),
    companyId: data.companyId.toString(),
    branchAddress: data.branchAddress,
    addressType: data.addressType,
    pincode: data.postalCode,
    countryId,
    stateId,
    cityId,
  });
};

// ! for testing the processAddress function
// (async () => {
//     await processAddress({
//         userId: 1,
//         companyId: 1,
//         branchAddress: "a23a2342aa, Kerala 673614, India",
//         addressType: "Primary",
//         country: "aa234we2aa",
//         state: "aa234we2aa",
//         city: "aa234we2aa",
//         postalCode: "6736131334"
//     });
// })();

// Zod schema definition for validation
const signupSchema = z.object({
  primaryEmail: z
    .string({ required_error: "Primary email is required" })
    .email("Invalid primary email"),
  primaryPhone: z.string({ required_error: "Primary phone is required" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(8, "Password must be at least 8 characters long"),
  firstName: z
    .string({ required_error: "First name is required" })
    .min(1, "First name must be between 1 and 50 characters")
    .max(50),
  lastName: z
    .string({ required_error: "Last name is required" })
    .min(1, "Last name must be between 1 and 50 characters")
    .max(50),
  companyName: z
    .string({ required_error: "Company name is required" })
    .min(1, "Company name must be between 1 and 100 characters")
    .max(100),
  companyType: z
    .string({ required_error: "Company type is required" })
    .min(1, "Company type must be between 1 and 100 characters")
    .max(100),
  industryId: z
    .string({ required_error: "Industry ID is required" })
    .min(1, "Industry ID must be between 1 and 100 characters")
    .max(100),
  positionTitle: z
    .string({ required_error: "Position title is required" })
    .min(1, "Position title must be between 1 and 100 characters")
    .max(100),
  postalCode: z
    .string({ required_error: "Postal code is required" })
    .min(1, "Postal code must be between 1 and 100 characters")
    .max(100),
  country: z
    .string({ required_error: "Country is required" })
    .min(1, "Country must be between 1 and 100 characters")
    .max(100),
  state: z
    .string({ required_error: "State is required" })
    .min(1, "State must be between 1 and 100 characters")
    .max(100),
  city: z
    .string({ required_error: "City is required" })
    .min(1, "City must be between 1 and 100 characters")
    .max(100),
  address: z
    .string({ required_error: "Address is required" })
    .min(1, "Address must be between 1 and 100 characters")
    .max(100),
});
