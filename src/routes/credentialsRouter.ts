import { Router } from "express";

import { createCredential, getCredentials, getCredentialById } from "../controllers/credentialsController.js";
import { validateCredential } from "../middlewares/joiValidation.js";

const credentialsRouter = Router();

credentialsRouter.post("/create/credential", validateCredential, createCredential);
credentialsRouter.get("/credential", getCredentials);
credentialsRouter.get("/credential/:id", getCredentialById);

export default credentialsRouter;