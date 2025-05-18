import { UserRepository } from "../repositories/UserRepository";
import { hashPassword, comparePassword } from "../utils/hash";
import { generateToken } from "../utils/jwt";

const repo = new UserRepository();

export const register = async (email: string, password: string) => {
    const exists = await repo.findByEmail(email);
    if (exists) throw new Error("User already exists");

    const hashed = await hashPassword(password);
    const user = await repo.create(email, hashed, "viewer");

    const token = generateToken({ id: user.id, role: user.role });
    return { user, token };
};

export const login = async (email: string, password: string) => {
    const user = await repo.findByEmail(email);
    if (!user) throw new Error("Invalid credentials");

    const valid = await comparePassword(password, user.password);
    if (!valid) throw new Error("Invalid credentials");

    const token = generateToken({ id: user.id, role: user.role });
    return { user, token };
};
