export interface IIngestionRepository {
    create(data: { documentId: number; status: "in_progress" | "completed" | "failed" }): Promise<any>;
    updateStatus(documentId: number, status: "in_progress" | "completed" | "failed"): Promise<void>;
}
