import { DataTypes, Model, Sequelize } from "sequelize";

export default (sequelize: Sequelize) => {
    class EmbeddingChunks extends Model {
        public id!: number;
        public document_id!: number;
        public chunk_index!: number;
        public content!: string;
        public embedding!: number[];
    }

    EmbeddingChunks.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        document_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        chunk_index: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        embedding: {
            type: DataTypes.JSONB,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: "EmbeddingChunks",
        tableName: "embedding_chunks",
        timestamps: false
    });

    return EmbeddingChunks;
};
