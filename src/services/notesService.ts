import * as noteRepository from '../repositories/noteRepository.js';

export async function createNote(data: noteRepository.noteInsertData, userId: number) {
    const { title, content } = data;
    const checkTitle = await noteRepository.getTitleByUserId(userId, title);
    if (checkTitle) throw new Error("Title already exists");
    await noteRepository.insert(data, userId);
}

export async function getNotes(userId: number) {
    const noteData = await noteRepository.getNotes(userId);
    return noteData.map(({ id, title, content }) => {
        return {
            id,
            title,
            content
        }
    });
}

export async function getNoteById(id: number, userId: number) {
    const noteData = await noteRepository.getNoteById(id, userId);
    if (!noteData) throw new Error("Note not found");
    return {
        id: noteData.id,
        title: noteData.title,
        content: noteData.content
    }
}

export async function deleteNote(id: number, userId: number) {
    const noteData = await noteRepository.getNoteById(id, userId);
    if (!noteData) throw new Error("Note not found");
    await noteRepository.deleteNote(id, userId);
}