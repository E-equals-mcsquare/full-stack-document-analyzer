import { EmbeddingChunks } from '../models';
import { IEmbeddingChunksRepository } from '../interfaces/IEmbeddingChunksRepository';

export class EmbeddingChunksRepository implements IEmbeddingChunksRepository {
    async findAll() {
        return await EmbeddingChunks.findAll();
    }

    async create(data: { chunk: string; documentId: number; embedding: number[] }) {
        return await EmbeddingChunks.create(data);
    }

    async findById(id: number) {
        return await EmbeddingChunks.findByPk(id);
    }

    async deleteById(id: number) {
        await EmbeddingChunks.destroy({ where: { id } });
    }

    async deleteByDocumentId(documentId: number) {
        await EmbeddingChunks.destroy({ where: { documentId } });
    }

    async findByDocumentId(documentId: number) {
        return await EmbeddingChunks.findAll({ where: { documentId } });
    }
}