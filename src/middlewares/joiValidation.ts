import joi from 'joi';

import { Request, Response, NextFunction } from 'express';
import * as userRepository from '../repositories/userRepository.js';
import * as credentialRepository from '../repositories/credentialRepository.js';
import * as noteRepository from '../repositories/noteRepository.js';

export async function validateUser(req: Request, res: Response, next: NextFunction) {
    const data: userRepository.UserInsertData = req.body;
    const schema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().min(10).required()
    });
    const { error } = schema.validate(data);
    if (error) throw new Error(error.message);
    next();
}

export async function validateCredential(req: Request, res: Response, next: NextFunction) {
    const data: credentialRepository.credentialInsertData = req.body;
    const schema = joi.object({
        title: joi.string().required(),
        url: joi.string().required(),
        username: joi.string().required(),
        password: joi.string().required()
    });
    const { error } = schema.validate(data);
    if (error) throw new Error(error.message);
    next();
}

export async function validateNote(req: Request, res: Response, next: NextFunction) {
    const data: noteRepository.noteInsertData = req.body;
    const schema = joi.object({
        title: joi.string().max(50).required(),
        content: joi.string().max(1000).required()
    });
    const { error } = schema.validate(data);
    if (error) throw new Error(error.message);
    next();
}