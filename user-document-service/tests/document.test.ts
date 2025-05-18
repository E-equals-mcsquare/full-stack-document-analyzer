import { listDocuments, createDocument } from "../src/controllers/document.controller";
import * as documentService from "../src/services/document.service";
import { Request, Response } from "express";
import { afterEach, describe, expect, it, jest } from "@jest/globals";

describe("Document Controller", () => {
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

    it("should list documents", async () => {
        const res = mockRes();
        const mockDocs = [{ id: 1, filename: "doc.pdf" }] as any;

        jest.spyOn(documentService, "listDocuments").mockResolvedValue(mockDocs);

        await listDocuments({} as Request, res);
        expect(documentService.listDocuments).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockDocs);
    });

    it("should create a document", async () => {
        const req = {
            body: { filename: "file.pdf", userId: 1 }
        } as Request;
        const res = mockRes();

        const createdDoc = { id: 1, filename: "file.pdf" } as any;
        jest.spyOn(documentService, "createDocument").mockResolvedValue(createdDoc);

        await createDocument(req, res);
        expect(documentService.createDocument).toHaveBeenCalledWith("file.pdf", 1);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(createdDoc);
    });
});
