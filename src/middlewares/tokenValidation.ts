import { Request, Response, NextFunction } from "express";

import { validateToken } from "../utils/jwtUtil.js";

export async function  tokenValidation(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) return res.sendStatus(401);

    const userData = await validateToken(token);
    if (!userData) return res.sendStatus(401);
    res.locals.userData = userData;
    next();
}