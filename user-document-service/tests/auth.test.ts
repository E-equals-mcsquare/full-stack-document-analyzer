import request from 'supertest';
import app from '../src/index';
import { User } from '../src/models';

jest.mock('../src/models', () => ({
    User: {
        findOne: jest.fn()
    }
}));

describe("Auth API - Register", () => {
    it("should register a new user", async () => {
        const res = await request(app)
            .post("/auth/register")
            .send({ email: "test@example.com", password: "123456" });

        expect(res.statusCode).toBe(201);
        expect(res.body.user.email).toBe("test@example.com");
        expect(res.body.token).toBeDefined();
    });
});

describe("Auth API - Login", () => {
    it("should return token and user for valid credentials", async () => {
        (User.findOne as jest.Mock).mockResolvedValue({
            id: 1,
            email: "admin@example.com",
            password: "$2a$10$hashedpassword", // assuming hash matches
            role: "admin",
        });

        const res = await request(app).post("/auth/login").send({
            email: "admin@example.com",
            password: "dummy"
        });

        expect(res.statusCode).toBe(200);
        expect(res.body.token).toBeDefined();
        expect(res.body.user.email).toBe("admin@example.com");
    });

    it("should return 401 for invalid user", async () => {
        (User.findOne as jest.Mock).mockResolvedValue(null);

        const res = await request(app).post("/auth/login").send({
            email: "unknown@example.com",
            password: "wrongpass"
        });

        expect(res.statusCode).toBe(401);
    });
});