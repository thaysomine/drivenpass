import { Router } from "express";

import { createCard, getCards, getCardById, deleteCard } from "../controllers/cardsController.js";

const cardsRouter = Router();

cardsRouter.post("/create/card", createCard);
cardsRouter.get("/card", getCards);
cardsRouter.get("/card/:id", getCardById);
cardsRouter.delete("/card/:id", deleteCard);

export default cardsRouter;