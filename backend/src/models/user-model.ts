import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export interface CreateUserRequest {
    name: string;
    email: string;
    password: string;
}

export const createUser = async (user: CreateUserRequest) => {
    return await prisma.user.create({data: user})
}

export const findByUsername = async (email: string) => {
    return await prisma.user.findUnique({where: {email}})
}