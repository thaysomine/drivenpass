import Cryptr from 'cryptr';

import * as credentialRepository from "../repositories/credentialRepository.js";

export async function createCredential(data: credentialRepository.credentialInsertData, userId: number) {
    const { password, title } = data;
    const checkTitle = await credentialRepository.getTitleByUserId(userId, title);
    console.log(checkTitle);
    if (checkTitle) throw new Error("Title already exists");

    const cryptr = new Cryptr("myTotallySecretKey");
    const hash = cryptr.encrypt(password);
    const credentialData = {
        ...data,
        password: hash,
        userId
    }
    await credentialRepository.insert(credentialData, userId);
}

export async function getCredentials(userId: number) {
    const credentialData = await credentialRepository.getCredentials(userId);
    const cryptr = new Cryptr("myTotallySecretKey");
    return credentialData.map(({ title, url, username, password }) => {
        return {
            title,
            url,
            username,
            password: cryptr.decrypt(password)
        }
    });
}

export async function getCredentialById(id: number, userId: number) {
    const credentialData = await credentialRepository.getCredentialById(id, userId);
    if (!credentialData) throw new Error("Credential not found");
    const cryptr = new Cryptr("myTotallySecretKey");
    const passwordDecrypted = cryptr.decrypt(credentialData.password);
    return {
        title: credentialData.title,
        url: credentialData.url,
        username: credentialData.username,
        password: passwordDecrypted
    }
}
