import { Request, Response } from "express";
import * as service from "../services/document.service"

export const listDocuments = async (_: Request, res: Response) => {
    try {
        const result = await service.listDocuments();
        res.status(200).json(result);
    } catch (err: any) {
        res.status(401).json(err);
    }
};

export const createDocument = async (req: Request, res: Response) => {
    try {
        const { filename, userId } = req.body;
        const response = await service.createDocument(filename, userId);
        res.status(201).json(response);
    } catch (err: any) {
        res.status(400).json(err);
    }
};

export const uploadAndTrigger = async (req: Request, res: Response) => {
    try {
        const file = req.file;
        const userId = Number(req.user?.id);

        if (!file) {
            return res.status(400).json({ error: "File is required" });
        }
        const response = await service.uploadAndTrigger(file, userId);
        res.status(200).json(response);
    } catch (err: any) {
        res.status(400).json(err);
    }
};

export const deleteDocument = async (req: Request, res: Response) => {
    try {
        const documentId = Number(req.params.id);
        const response = await service.deleteDocument(documentId);
        res.status(200).json(response);
    } catch (err: any) {
        res.status(400).json(err);
    }
};

export const triggerIngestion = async (req: Request, res: Response) => {
    try {
        const userId = Number(req.user?.id);
        const documentId = Number(req.params.id);

        if (!userId) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const doc = await service.getDocumentById(documentId);
        if (!doc) {
            return res.status(404).json({ error: "Document not found" });
        }

        if (doc.userId !== userId) {
            return res.status(403).json({ error: "Forbidden" });
        }

        const response = await service.triggerIngestion(doc.id);
        res.status(200).json({ message: "Ingestion triggered" });
    } catch (err: any) {
        res.status(400).json(err);
    }

};
