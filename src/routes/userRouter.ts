import { Router } from "express";

import { signup, login } from "../controllers/userController.js";
import { validateUser } from "../middlewares/joiValidation.js";

const userRouter = Router();

userRouter.post("/signup", validateUser, signup);
userRouter.post("/login", validateUser, login);

export default userRouter;