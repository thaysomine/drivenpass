import { Router } from "express";

import { signup } from "../controllers/userController.js";
import { joiValidation } from "../middlewares/joiValidation.js";

const userRouter = Router();

userRouter.post("/signup", joiValidation, signup);

export default userRouter;