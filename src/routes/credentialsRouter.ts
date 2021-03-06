import { Router } from "express";

import { createCredential, getCredentials, getCredentialById, deleteCredential } from "../controllers/credentialsController.js";
import { validateCredential } from "../middlewares/joiValidation.js";
import {tokenValidation} from "../middlewares/tokenValidation.js";

const credentialsRouter = Router();
credentialsRouter.use(tokenValidation);

credentialsRouter.post("/create/credential", validateCredential, createCredential);
credentialsRouter.get("/credential", getCredentials);
credentialsRouter.get("/credential/:id", getCredentialById);
credentialsRouter.delete("/credential/:id", deleteCredential);

export default credentialsRouter;