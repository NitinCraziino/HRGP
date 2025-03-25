import { NextFunction, Request, Response } from "express";
import { StatusCode } from "../../../types";
import { jwtService } from "../../../services/JwtService";
import IUser, { demoUserGoogle } from "../../../types/IUser";

const googleAuthController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // the user is the user object from the passport authenticate
        // the user will contain the id, email, name, and isExistingUser property
        // @ts-ignore
        const user = req.user as IUser;

        const userData = await getUserData(user);

        const token = jwtService.createToken({
            email: userData.primaryEmail,
            userId: userData.userId,
            name: userData.lastName,
            companyId: userData.companyId
        });

        res.status(StatusCode.OK).json({ token });
    } catch (error) {
        next(error);
    }
};

export default googleAuthController;



const getUserData = async (user: IUser) => {
    const userData = await new Promise<IUser>((resolve) => {
        setTimeout(() => {
            // companyId is the id of the company that the user belongs to.
            // this is a mock for now and the id can be null also.
            resolve({ ...demoUserGoogle, companyId: "1234567890" });
        }, 1000);
    });
    return userData;
};