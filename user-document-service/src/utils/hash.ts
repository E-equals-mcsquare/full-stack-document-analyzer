import bcrypt from "bcryptjs";

export const hashPassword = async (plain: string) => {
    return await bcrypt.hash(plain, 10);
};

export const comparePassword = async (plain: string, hash: string) => {
    return await bcrypt.compare(plain, hash);
};
