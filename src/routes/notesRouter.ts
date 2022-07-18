import { Router } from "express";

import { createNote, getNotes, getNoteById, deleteNote } from "../controllers/notesController.js";

const notesRouter = Router();

notesRouter.post("/create/note", createNote);
notesRouter.get("/note", getNotes);
notesRouter.get("/note/:id", getNoteById);
notesRouter.delete("/note/:id", deleteNote);

export default notesRouter;