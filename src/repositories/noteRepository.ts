import client from "../database/index.js";
import { Note, User } from "@prisma/client";

export type noteInsertData = Omit<Note, "id" | "createdAt" | "userId">;

export async function insert(noteData: noteInsertData, userId: User["id"]) {
    await client.note.create({
        data: {...noteData, userId: userId}
        });  
}

export async function getNotes(userId: User["id"]) {
    return await client.note.findMany({
        where: {
            userId
        }
    });
}

export async function getNoteById(id: Note["id"], userId: User["id"]) {
    return await client.note.findFirst({
        where: {
            id,
            userId
        }
    });
}

export async function deleteNote(id: Note["id"], userId: User["id"]) {
    return await client.note.deleteMany({
        where: {
            id,
            userId
        }
    });
}

export async function getTitleByUserId(userId: User["id"], title: Note["title"]) {
    const note = await client.note.findFirst({
        where: {
            userId,
            title
        }
    });
    if (note) return note.title;
    return null; 
}