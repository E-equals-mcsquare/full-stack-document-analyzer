import { sequelize } from "./models";

(async () => {
    try {
        await sequelize.sync({ alter: true });
        console.log("Tables created.");
        process.exit(0);
    } catch (err) {
        console.error("Sync error:", err);
        process.exit(1);
    }
})();
