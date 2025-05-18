import fs from "fs";
import FormData from "form-data";
import axios from "axios";
import { IngestionRepository } from "../repositories/IngestionRepository";
import { DocumentRepository } from "../repositories/DocumentRepository";
import { EmbeddingChunksRepository } from "../repositories/EmbeddingChunksRepository";

const repo = new DocumentRepository();
const ingestionRepo = new IngestionRepository();
const embeddingChunksRepo = new EmbeddingChunksRepository();

export const listDocuments = async () => {
    try {
        const docs = await repo.findAll();
        return docs;
    } catch (error) {
        console.error("Error listing documents:", error);
        throw new Error("Error listing documents");
    }
}

export const createDocument = async (filename: string, userId: number) => {
    try {
        const doc = await repo.create({ filename, userId });
        return doc;
    } catch (error) {
        console.error("Error creating document:", error);
        throw new Error("Error creating document");
    }
}
export const deleteDocument = async (id: number) => {
    try {
        await ingestionRepo.deleteByDocumentId(id);
        await embeddingChunksRepo.deleteByDocumentId(id);
        await repo.deleteById(id);
        return { message: "Document deleted" };
    } catch (error) {
        console.error("Error deleting document:", error);
        throw new Error("Error deleting document");
    }
}
export const getDocumentById = async (id: number) => {
    try {
        const doc = await repo.findById(id);
        if (!doc) throw new Error("Document not found");
        return doc;
    } catch (error) {
        console.error("Error getting document by ID:", error);
        throw new Error("Error getting document by ID");
    }
}
export const triggerIngestion = async (id: number) => {
    try {
        const doc = await repo.findById(id);
        if (!doc) throw new Error("Document not found");

        await ingestionRepo.create({ documentId: doc.id, status: "in_progress" });

        await axios.post(process.env.PYTHON_API_URL + "/ingest", {
            filename: doc.filename,
            userId: doc.userId
        });

        await ingestionRepo.updateStatus(doc.id, "completed");

        return doc;
    } catch (error) {
        console.error("Error triggering ingestion:", error);
        await ingestionRepo.updateStatus(id, "failed");
        throw new Error("Error triggering ingestion");
    }
}
export const uploadAndTrigger = async (file: Express.Multer.File, userId: number) => {
    try {
        if (!file) throw new Error("File not provided");

        const doc = await repo.create({
            filename: file.originalname,
            userId
        });

        // Send file to Python API
        const form = new FormData();
        form.append("file", fs.createReadStream(file.path));
        form.append("documentId", doc.id);

        await axios.post(`${process.env.PYTHON_API_URL}/ingest/`, form, {
            headers: form.getHeaders(),
        });

        await ingestionRepo.create({ documentId: doc.id, status: "completed" });
        return { message: "Uploaded and triggered ingestion", document: doc };
    } catch (error) {
        console.error("Error uploading and triggering ingestion:", error);
        throw new Error("Error uploading and triggering ingestion");
    } finally {
        if (fs.existsSync(file.path)) fs.unlinkSync(file.path); // Clean up the file
    }
}