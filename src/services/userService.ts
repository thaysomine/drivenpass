import bcrypt from 'bcrypt';

import * as userRepository from "../repositories/userRepository.js";

export async function signup(data: userRepository.UserInsertData) {
    const { email, password } = data;
    const checkEmail = await userRepository.getEmail(email);
    if (checkEmail) throw new Error("Email already exists");

    const hash = await bcrypt.hash(password, 10);
    console.log(hash);
    const userData = {
        email,
        password: hash
    }
    await userRepository.insert(userData);
}