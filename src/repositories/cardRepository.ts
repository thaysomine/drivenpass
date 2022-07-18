import client from "../database";
import { Card, User } from "@prisma/client";

export type cardInsertData = Omit<Card, "id" | "createdAt" | "userId">;

export async function insert(cardData: cardInsertData, userId: User["id"]) {
    await client.card.create({
        data: {...cardData, userId: userId}
        });  
}

export async function getTitleByUserId(userId: User["id"], title: Card["title"]) {
    console.log(userId, title);
    const card = await client.card.findFirst({
        where: {
            userId,
            title
        }
    });
    if (card) return card.title;
    return null;
}

export async function getCardById(id: Card["id"], userId: User["id"]) {
    return await client.card.findFirst({
        where: {
            id,
            userId
        }
    });
}

export async function getCards(userId: User["id"]) {
    return await client.card.findMany({
        where: {
            userId
        }
    });
}

export async function deleteCard(id: Card["id"], userId: User["id"]) {
    return await client.card.deleteMany({
        where: {
            id,
            userId
        }
    });
}