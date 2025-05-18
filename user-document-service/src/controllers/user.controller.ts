import { Request, Response } from "express";
import * as service from "../services/user.service";

export const getAllUsers = async (_: Request, res: Response) => {
    try {
        const users = await service.getAllUsers();
        res.status(200).json(users);
    } catch (err: any) {
        res.status(401).json(err);
    }
};

export const updateUserRole = async (req: Request, res: Response) => {
    try {
        const { role } = req.body;
        const userId = Number(req.params.id);

        const response = await service.updateUserRole(userId, role);
        res.status(200).json(response);
    } catch (err: any) {
        if (err.message === "User not found") {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(400).json(err);
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const userId = Number(req.params.id);
        const response = await service.deleteUser(userId);
        res.status(200).json(response);
    } catch (err: any) {
        if (err.message === "User not found") {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(400).json(err);
    }
};

export const getUserById = async (req: Request, res: Response) => {
    try {
        const userId = Number(req.params.id);
        const response = await service.getUserById(userId);
        res.status(200).json(response);
    } catch (err: any) {
        if (err.message === "User not found") {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(400).json(err);
    }
};