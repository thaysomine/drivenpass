import { Router } from "express";

import { createNote, getNotes, getNoteById, deleteNote } from "../controllers/notesController.js";
import { validateNote } from "../middlewares/joiValidation.js";
import { tokenValidation } from "../middlewares/tokenValidation.js";

const notesRouter = Router();
notesRouter.use(tokenValidation);

notesRouter.post("/create/note", validateNote, createNote);
notesRouter.get("/note", getNotes);
notesRouter.get("/note/:id", getNoteById);
notesRouter.delete("/note/:id", deleteNote);

export default notesRouter;