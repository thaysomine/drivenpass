import Cryptr from "cryptr";

import * as wifiRepository from "../repositories/wifiRepository.js";

export async function createWifi(data: wifiRepository.wifiInsertData, userId: number) {
    const { title, password } = data;
    const checkTitle = await wifiRepository.getTitleByUserId(userId, title);
    if (checkTitle) throw new Error("Title already exists");

    const cryptr = new Cryptr("myTotallySecretKey");
    const hash = cryptr.encrypt(password);
    const wifiData = {
        ...data,
        password: hash
    }
    await wifiRepository.insert(wifiData, userId);
}

export async function getWifis(userId: number) {
    const wifiData = await wifiRepository.getWifis(userId);
    const cryptr = new Cryptr("myTotallySecretKey");
    return wifiData.map(({ title, password, name }) => {
        return {
            title,
            name,
            password: cryptr.decrypt(password)
        }
    });
}

export async function getWifiById(id: number, userId: number) {
    const wifiData = await wifiRepository.getWifiById(id, userId);
    if (!wifiData) throw new Error("Wifi not found");
    const cryptr = new Cryptr("myTotallySecretKey");
    const passwordDecrypted = cryptr.decrypt(wifiData.password);
    return {
        title: wifiData.title,
        name: wifiData.name,
        password: passwordDecrypted
    }
}

export async function deleteWifi(id: number, userId: number) {
    const wifiData = await wifiRepository.getWifiById(id, userId);
    if (!wifiData) throw new Error("Wifi not found");
    await wifiRepository.deleteWifi(id, userId);
}