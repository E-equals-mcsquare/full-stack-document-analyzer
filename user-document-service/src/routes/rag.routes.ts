import express from "express";

const router = express.Router();

import { getRAGResponse } from "../controllers/rag.controller";
import { verifyToken } from "../middleware/auth.middleware";

router.get("/", verifyToken, getRAGResponse);

export default router;