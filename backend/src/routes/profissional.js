import { Router } from "express";
import { profissionalController } from "../controllers/index.js";

const router = Router();

router.get("/", profissionalController.getProfissionais);
router.post("/", profissionalController.createProfissional);
router.get("/:profissionalId", profissionalController.getProfissional);
router.put("/:profissionalId", profissionalController.updateProfissional);
router.delete("/:profissionalId", profissionalController.deleteProfissional);

export default router;