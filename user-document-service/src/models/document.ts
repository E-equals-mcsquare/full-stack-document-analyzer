import { DataTypes, Model, Sequelize } from "sequelize";

export default (sequelize: Sequelize) => {
    class Document extends Model {
        public id!: number;
        public filename!: string;
        public userId!: number;
    }

    Document.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        filename: {
            type: DataTypes.STRING,
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: "Document",
        tableName: "documents",
        timestamps: true
    });

    return Document;
};
