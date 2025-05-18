import { DataTypes, Model, Sequelize } from "sequelize";

export default (sequelize: Sequelize) => {
    class User extends Model {
        public id!: number;
        public email!: string;
        public password!: string;
        public role!: "admin" | "editor" | "viewer";
    }

    User.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role: {
            type: DataTypes.ENUM("admin", "editor", "viewer"),
            defaultValue: "viewer"
        }
    }, {
        sequelize,
        modelName: "User",
        tableName: "users",
        timestamps: true
    });

    return User;
};
