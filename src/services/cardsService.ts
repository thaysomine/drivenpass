import Cryptr from "cryptr";

import * as cardRepository from "../repositories/cardRepository.js";

export async function createCard(data: cardRepository.cardInsertData, userId: number) {
    const { title, cvv, password } = data;
    const checkTitle = await cardRepository.getTitleByUserId(userId, title);
    if (checkTitle) throw new Error("Title already exists");

    const cryptr = new Cryptr("myTotallySecretKey");
    const hash = cryptr.encrypt(password);
    const cvvHash = cryptr.encrypt(cvv);
    const cardData = {
        ...data,
        password: hash,
        cvv: cvvHash
    }
    await cardRepository.insert(cardData, userId);
}

export async function getCards(userId: number) {
    const cardData = await cardRepository.getCards(userId);
    const cryptr = new Cryptr("myTotallySecretKey");
    return cardData.map(({ title, number, cvv, password, expirationDate, isVirtual, type }) => {
        return {
            title,
            number,
            cvv: cryptr.decrypt(cvv),
            password: cryptr.decrypt(password),
            expirationDate,
            isVirtual,
            type
        }
    });
}

export async function getCardById(id: number, userId: number) {
    const cardData = await cardRepository.getCardById(id, userId);
    if (!cardData) throw new Error("Card not found");
    const cryptr = new Cryptr("myTotallySecretKey");
    const passwordDecrypted = cryptr.decrypt(cardData.password);
    const cvvDecrypted = cryptr.decrypt(cardData.cvv);
    return {
        title: cardData.title,
        number: cardData.number,
        cvv: cvvDecrypted,
        password: passwordDecrypted,
        expirationDate: cardData.expirationDate,
        isVirtual: cardData.isVirtual,
        type: cardData.type
    }
}

export async function deleteCard(id: number, userId: number) {
    const cardData = await cardRepository.getCardById(id, userId);
    if (!cardData) throw new Error("Card not found");
    await cardRepository.deleteCard(id, userId);
}