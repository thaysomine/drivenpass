import bcrypt from 'bcrypt';

import * as userRepository from "../repositories/userRepository.js";
import { generateToken } from '../utils/jwtUtil.js';

export async function signup(data: userRepository.UserInsertData) {
    const { email, password } = data;
    const checkEmail = await userRepository.getEmail(email);
    if (checkEmail) throw new Error("Email already exists");

    const hash = await bcrypt.hash(password, 10);
    const userData = {
        email,
        password: hash
    }
    await userRepository.insert(userData);
}

export async function login(data: userRepository.UserInsertData) {
    const { email, password } = data;
    const user = await userRepository.getEmail(email);
    if (!user) throw new Error("Email not found");
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw new Error("Invalid password");
    return {token: await generateToken({id: user.id, email: user.email})};
}