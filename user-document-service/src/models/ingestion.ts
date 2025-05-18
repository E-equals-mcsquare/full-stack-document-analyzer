import { DataTypes, Model, Sequelize } from "sequelize";

export default (sequelize: Sequelize) => {
    class Ingestion extends Model {
        public id!: number;
        public documentId!: number;
        public status!: string;
    }

    Ingestion.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        documentId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        status: {
            type: DataTypes.STRING,
            defaultValue: "pending"  // or: in_progress, completed, failed
        }
    }, {
        sequelize,
        modelName: "Ingestion",
        tableName: "ingestions",
        timestamps: true
    });

    return Ingestion;
};
