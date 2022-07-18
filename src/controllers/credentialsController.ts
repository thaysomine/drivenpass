import { Request, Response } from 'express';

import * as credentialRepository from '../repositories/credentialRepository.js';
import * as credentialsService from '../services/credentialsService.js';

export async function createCredential(req: Request, res: Response) {
    const data: credentialRepository.credentialInsertData = req.body;
    const userId = res.locals.userData.id;
    await credentialsService.createCredential(data, userId);
    res.sendStatus(201);
}

export async function getCredentials(req: Request, res: Response) {
    const userId = res.locals.userData.id;
    const credentials = await credentialsService.getCredentials(userId);
    res.json(credentials);
}

export async function getCredentialById(req: Request, res: Response) {
    const id = req.params.id;
    const userId = res.locals.userData.id;
    const credential = await credentialsService.getCredentialById(parseInt(id), userId);
    res.json(credential);
}

export async function deleteCredential(req: Request, res: Response) {
    const id = req.params.id;
    const userId = res.locals.userData.id;
    await credentialsService.deleteCredential(parseInt(id), userId);
    res.sendStatus(204);
}