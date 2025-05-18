import express from "express";
import dotenv from "dotenv";
import { json } from "body-parser";
import authRoutes from "./routes/auth.routes";
import documentRoutes from "./routes/document.routes";
import userRoutes from "./routes/user.routes";
import ragRoutes from "./routes/rag.routes";
import cors from "cors";

dotenv.config();

const app = express();
app.use(json());
app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
}))

app.use("/auth", authRoutes);
app.use("/documents", documentRoutes);
app.use("/users", userRoutes);
app.use("/qa", ragRoutes);

app.get("/", (_, res) => {
    res.send("User Service backend running...");
});

const PORT = process.env.PORT || 8001;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

export default app;