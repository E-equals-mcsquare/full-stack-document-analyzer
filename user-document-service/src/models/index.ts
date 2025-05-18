import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const sequelize = new Sequelize({
    dialect: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    logging: false,
});

import initUser from "./user";
import initDocument from "./document";
import initIngestion from "./ingestion";
import initEmbeddingChunks from "./embeddedchunks";

const User = initUser(sequelize);
const Document = initDocument(sequelize);
const Ingestion = initIngestion(sequelize);
const EmbeddingChunks = initEmbeddingChunks(sequelize);

// Associations
User.hasMany(Document, { foreignKey: "userId" });
Document.belongsTo(User, { foreignKey: "userId" });

Document.hasOne(Ingestion, { foreignKey: "documentId" });
Ingestion.belongsTo(Document, { foreignKey: "documentId" });

Document.hasMany(EmbeddingChunks, { foreignKey: "documentId" });
EmbeddingChunks.belongsTo(Document, { foreignKey: "documentId" });

export { sequelize, User, Document, Ingestion, EmbeddingChunks };
