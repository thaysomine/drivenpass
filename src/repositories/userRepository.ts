import client from "../database/index.js";
import { User } from "@prisma/client";

export type UserInsertData = Omit<User, "id" | "createdAt">;

export async function insert(userData: UserInsertData) {
    const { email, password } = userData;
    console.log(userData);

    await client.user.create({
        data: {
            email,
            password
        }
    });
}

export async function getEmail(email: string) {
    return await client.user.findFirst({
        where: {
            email
        }
    });
}
