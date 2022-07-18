import { Router } from "express";

import { createWifi, getWifis, getWifiById, deleteWifi } from "../controllers/wifiController.js";
import { validateWifi } from "../middlewares/joiValidation.js";
import { tokenValidation } from "../middlewares/tokenValidation.js";

const wifiRouter = Router();
wifiRouter.use(tokenValidation);

wifiRouter.post("/create/wifi", validateWifi, createWifi);
wifiRouter.get("/wifi", getWifis);
wifiRouter.get("/wifi/:id", getWifiById);
wifiRouter.delete("/wifi/:id", deleteWifi);

export default wifiRouter;