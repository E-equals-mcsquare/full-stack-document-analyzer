export interface IUserRepository {
    findAll(): Promise<any[]>;
    findById(id: number): Promise<any | null>;
    findByEmail(email: string): Promise<any | null>;
    create(email: string, password: string, role: string): Promise<any>;
    updateRole(id: number, role: string): Promise<any>;
    deleteById(id: number): Promise<boolean>;
}
