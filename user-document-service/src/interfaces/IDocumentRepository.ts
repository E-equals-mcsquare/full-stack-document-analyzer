export interface IDocumentRepository {
    findAll(): Promise<any[]>;
    create(data: { filename: string; userId: number }): Promise<any>;
    findById(id: number): Promise<any | null>;
    deleteById(id: number): Promise<void>;
}
