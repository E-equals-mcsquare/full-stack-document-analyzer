import { getAllUsers, updateUserRole, deleteUser } from "../src/controllers/user.controller";
import * as userService from "../src/services/user.service";
import { Request, Response } from "express";
import { afterEach, describe, expect, it, jest } from "@jest/globals";

describe("User Controller", () => {
    const mockRes = () => {
        const res = {
            json: jest.fn().mockReturnThis(),
            status: jest.fn().mockReturnThis(),
        } as Partial<Response> as Response;
        return res;
    };

    afterEach(() => {
        jest.resetAllMocks();
    });

    it("should get all users", async () => {
        const res = mockRes();
        const mockUsers = [
            { id: 1, email: "admin@example.com", role: "admin" }
        ] as any;

        jest.spyOn(userService, "getAllUsers").mockResolvedValue(mockUsers);

        await getAllUsers({} as Request, res);
        expect(userService.getAllUsers).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockUsers);
    });

    it("should update user role", async () => {
        const req = {
            params: { id: "1" },
            body: { role: "editor" }
        } as unknown as Request;
        const res = mockRes();

        const mockUser = { id: 1, email: "user@example.com", password: "password123", role: "editor" } as any;
        jest.spyOn(userService, "updateUserRole").mockResolvedValue({
            message: "Role updated",
            user: mockUser,
        });

        await updateUserRole(req, res);
        expect(userService.updateUserRole).toHaveBeenCalledWith(1, "editor");
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            message: "Role updated",
            user: mockUser,
        });
    });

    it("should delete a user", async () => {
        const req = { params: { id: "1" } } as unknown as Request;
        const res = mockRes();

        jest.spyOn(userService, "deleteUser").mockResolvedValue({ message: "User deleted" });

        await deleteUser(req, res);
        expect(userService.deleteUser).toHaveBeenCalledWith(1);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: "User deleted" });
    });
});
