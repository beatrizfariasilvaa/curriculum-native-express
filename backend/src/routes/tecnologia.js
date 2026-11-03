import { Router } from "express";
import { tecnologiaController } from "../controllers/index.js";

const router = Router();

router.get("/", tecnologiaController.getTecnologias);
router.post("/", tecnologiaController.createTecnologia);
router.get("/:tecnologiaId", tecnologiaController.getTecnologia);
router.put("/:tecnologiaId", tecnologiaController.updateTecnologia);
router.delete("/:tecnologiaId", tecnologiaController.deleteTecnologia);

export default router;