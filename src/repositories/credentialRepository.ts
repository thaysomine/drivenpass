import client from "../database/index.js";
import { Credential, User } from "@prisma/client";

export type credentialInsertData = Omit<Credential, "id" | "createdAt" | "userId">;

export async function insert(credentialData: credentialInsertData, userId: User["id"]) {
    await client.credential.create({
        data: {...credentialData, userId: userId}
        });  
}

export async function getTitleByUserId(userId: User["id"], title: Credential["title"]) {
    const credential = await client.credential.findFirst({
        where: {
            userId,
            title
        }
    });
    if (credential) return credential.title;
    return null;
} 

export async function getCredentialById(id: Credential["id"], userId: User["id"]) {
    return await client.credential.findFirst({
        where: {
            id,
            userId
        }
    });
}

export async function getCredentials(userId: User["id"]) {
    return await client.credential.findMany({
        where: {
            userId
        }
    });
}

export async function deleteCredential(id: Credential["id"], userId: User["id"]) {
    return await client.credential.deleteMany({
        where: {
            id,
            userId
        }
    });
}