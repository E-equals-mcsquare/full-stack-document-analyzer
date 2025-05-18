import * as service from '../services/rag.service';
import { Request, Response } from 'express';

export const getRAGResponse = async (req: Request, res: Response) => {
    try {
        const { q } = req.query;
        if (!q) {
            return res.status(400).json({ error: "Query parameter 'q' is required" });
        }

        const response = await service.getRAGResponse(q as string);
        res.status(200).json(response);
    } catch (err: any) {
        res.status(500).json(err);
    }
}