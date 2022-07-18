import joi from 'joi';

import { Request, Response, NextFunction } from 'express';
import * as userRepository from '../repositories/userRepository.js';

export async function joiValidation(req: Request, res: Response, next: NextFunction) {
    const data: userRepository.UserInsertData = req.body;
    const schema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().min(10).required()
    });
    const { error } = schema.validate(data);
    if (error) throw new Error(error.message);
    next();
}