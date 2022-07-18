import { Request, Response } from 'express';

import * as userRepository from '../repositories/userRepository.js';
import * as userService from '../services/userService.js';

export async function signup(req: Request, res: Response) {
    const data : userRepository.UserInsertData = req.body;
    await userService.signup(data);
    res.sendStatus(201);
}