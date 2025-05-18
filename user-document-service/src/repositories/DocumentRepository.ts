import { Document } from "../models";
import { IDocumentRepository } from "../interfaces/IDocumentRepository";

export class DocumentRepository implements IDocumentRepository {
    async findAll() {
        return await Document.findAll();
    }

    async create(data: { filename: string; userId: number }) {
        return await Document.create(data);
    }

    async findById(id: number) {
        return await Document.findByPk(id);
    }

    async deleteById(id: number) {
        await Document.destroy({ where: { id } });
    }
}
