import express from "express";
import * as docController from "../controllers/document.controller";
import { verifyToken } from "../middleware/auth.middleware";
import { requireRole } from "../middleware/role.middleware";
import { upload } from "../middleware/multer.middleware";

const router = express.Router();

router.get("/", verifyToken, docController.listDocuments);
// router.post("/", verifyToken, requireRole("admin", "editor"), docController.createDocument);

router.post(
    "/upload",
    verifyToken,
    requireRole("admin", "editor"),
    upload.single("file"),
    docController.uploadAndTrigger
);

router.delete("/:id", verifyToken, requireRole("admin"), docController.deleteDocument);
router.post("/:id/trigger-ingestion", verifyToken, requireRole("admin", "editor"), docController.triggerIngestion);

export default router;
