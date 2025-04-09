import { NextFunction, Request, Response } from "express";
import { getUserById } from "../../db/user/getUser";
import { NotFoundError } from "../../types/CustomError";

const getUserCardInfoController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(req.user);
        // @ts-ignore
        const user = await getUserById(req.user.userId);

        if (!user) {
            throw new NotFoundError("User not found");
        }

        const {
            firstName,
            lastName,
            primaryEmail,
            primaryPhone
        } = user;

        res.status(200).json({
            firstName,
            lastName,
            primaryEmail,
            primaryPhone
        });
    } catch (error) {
        next(error);
    }
};

export default getUserCardInfoController;
