import client from "../database/index.js";
import { Wifi, User } from "@prisma/client";

export type wifiInsertData = Omit<Wifi, "id" | "createdAt" | "userId">;

export async function insert(wifiData: wifiInsertData, userId: User["id"]) {
    await client.wifi.create({
        data: {...wifiData, userId: userId}
        });  
}

export async function getWifiById(id: Wifi["id"], userId: User["id"]) {
    return await client.wifi.findFirst({
        where: {
            id,
            userId
        }
    });
}

export async function getWifis(userId: User["id"]) {
    return await client.wifi.findMany({
        where: {
            userId
        }
    });
}

export async function deleteWifi(id: Wifi["id"], userId: User["id"]) {
    return await client.wifi.deleteMany({
        where: {
            id,
            userId
        }
    });
}