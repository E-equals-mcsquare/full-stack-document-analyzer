export interface IEmbeddingChunksRepository {
    findAll(): Promise<any[]>;
    create(data: { chunk: string; documentId: number; embedding: number[] }): Promise<any>;
    findById(id: number): Promise<any | null>;
    deleteByDocumentId(documentId: number): Promise<void>;
    deleteById(id: number): Promise<void>;
    findByDocumentId(documentId: number): Promise<any[]>;
}