import { Router } from "express";

import { createWifi, getWifis, getWifiById, deleteWifi } from "../controllers/wifiController.js";
//import { validateWifi } from "../middlewares/joiValidation.js";

const wifiRouter = Router();

wifiRouter.post("/create/wifi", createWifi);
wifiRouter.get("/wifi", getWifis);
wifiRouter.get("/wifi/:id", getWifiById);
wifiRouter.delete("/wifi/:id", deleteWifi);

export default wifiRouter;