import {  Request, Response } from 'express';

import * as noteRepository from '../repositories/noteRepository.js';
import * as notesService from '../services/notesService.js';

export async function createNote(req: Request, res: Response) {
    const data: noteRepository.noteInsertData = req.body;
    const userId = 1;
    await notesService.createNote(data, userId);
    console.log(data);
    res.sendStatus(201);
}

export async function getNotes(req: Request, res: Response) {
    const userId = 1;
    const notes = await notesService.getNotes(userId);
    res.json(notes);
}

export async function getNoteById(req: Request, res: Response) {
    const id = req.params.id;
    const userId = 1;
    const note = await notesService.getNoteById(parseInt(id), userId);
    res.json(note);
}

export async function deleteNote(req: Request, res: Response) {
    const id = req.params.id;
    const userId = 1;
    await notesService.deleteNote(parseInt(id), userId);
    res.sendStatus(204);
}