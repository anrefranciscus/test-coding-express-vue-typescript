import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export interface User {
    id?:number;
    name: string;
    email: string;
    password: string;
}

export const createUser = async (user: User) => {
    return await prisma.user.create({data: user})
}

export const findByUsername = async (email: string) => {
    return await prisma.user.findUnique({where: {email}})
}