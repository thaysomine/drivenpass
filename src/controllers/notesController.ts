import {  Request, Response } from 'express';

import * as noteRepository from '../repositories/noteRepository.js';
import * as notesService from '../services/notesService.js';

export async function createNote(req: Request, res: Response) {
    const data: noteRepository.noteInsertData = req.body;
    const userId = res.locals.userData.id;
    await notesService.createNote(data, userId);
    res.sendStatus(201);
}

export async function getNotes(req: Request, res: Response) {
    const userId = res.locals.userData.id;
    const notes = await notesService.getNotes(userId);
    res.json(notes);
}

export async function getNoteById(req: Request, res: Response) {
    const id = req.params.id;
    const userId = res.locals.userData.id;
    const note = await notesService.getNoteById(parseInt(id), userId);
    res.json(note);
}

export async function deleteNote(req: Request, res: Response) {
    const id = req.params.id;
    const userId = res.locals.userData.id;
    await notesService.deleteNote(parseInt(id), userId);
    res.sendStatus(204);
}