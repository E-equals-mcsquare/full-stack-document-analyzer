import { User } from "../models";
import { IUserRepository } from "../interfaces/IUserRepository";

export class UserRepository implements IUserRepository {
    async findAll() {
        return await User.findAll({ attributes: ["id", "email", "role"] });
    }

    async findById(id: number) {
        return await User.findByPk(id);
    }

    async findByEmail(email: string) {
        return await User.findOne({ where: { email } });
    }

    async create(email: string, password: string, role: "admin" | "editor" | "viewer") {
        return await User.create({ email, password: password, role: role });
    }

    async updateRole(id: number, role: "admin" | "editor" | "viewer") {
        const user = await User.findByPk(id);
        if (!user) return null;

        user.role = role;
        await user.save();
        return user;
    }

    async deleteById(id: number) {
        const result = await User.destroy({ where: { id } });
        return result > 0;
    }
}
