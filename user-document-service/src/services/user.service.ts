import { UserRepository } from "../repositories/UserRepository";

const repo = new UserRepository();

export const getAllUsers = async () => {
    const users = await repo.findAll();
    return users;
}
export const updateUserRole = async (id: number, role: "admin" | "editor" | "viewer") => {
    const user = await repo.updateRole(id, role);
    if (!user) throw new Error("User not found");

    return { message: "Role updated", user };
}
export const deleteUser = async (id: number) => {
    const deleted = await repo.deleteById(id);
    if (!deleted) throw new Error("User not found");
    return { message: "User deleted" };
}
export const getUserById = async (id: number) => {
    const user = await repo.findById(id);
    if (!user) throw new Error("User not found");
    return user;
}