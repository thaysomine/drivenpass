import { Request, Response } from "express";

import * as cardRepository from "../repositories/cardRepository.js";
import * as cardService from "../services/cardsService.js";

export async function createCard(req: Request, res: Response) {
    const data: cardRepository.cardInsertData = req.body;
    const userId = res.locals.userData.id;
    await cardService.createCard(data, userId);
    res.sendStatus(201);
}

export async function getCards(req: Request, res: Response) {
    const userId = res.locals.userData.id;
    const cards = await cardService.getCards(userId);
    res.json(cards);
}

export async function getCardById(req: Request, res: Response) {
    const id = req.params.id;
    const userId = res.locals.userData.id;
    const card = await cardService.getCardById(parseInt(id), userId);
    res.json(card);
}

export async function deleteCard(req: Request, res: Response) {
    const id = req.params.id;
    const userId = res.locals.userData.id;
    await cardService.deleteCard(parseInt(id), userId);
    res.sendStatus(204);
}