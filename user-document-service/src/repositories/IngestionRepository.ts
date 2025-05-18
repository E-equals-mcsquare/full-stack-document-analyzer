import { Ingestion } from "../models";
import { IIngestionRepository } from "../interfaces/IIngestionRepository";

export class IngestionRepository implements IIngestionRepository {
    async create(data: { documentId: number; status: string }) {
        return await Ingestion.create(data);
    }

    async updateStatus(documentId: number, status: string) {
        await Ingestion.update({ status }, { where: { documentId } });
    }

    async deleteByDocumentId(documentId: number) {
        await Ingestion.destroy({ where: { documentId } });
    }
    async findByDocumentId(documentId: number) {
        return await Ingestion.findOne({ where: { documentId } });
    }
    async findById(id: number) {
        return await Ingestion.findOne({ where: { id } });
    }
    async findAll() {
        return await Ingestion.findAll();
    }
    async findByStatus(status: string) {
        return await Ingestion.findAll({ where: { status } });
    }
}
