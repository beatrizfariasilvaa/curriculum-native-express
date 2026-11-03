import { Router } from "express";
import { projetoController } from "../controllers/index.js";

const router = Router();

router.get("/", projetoController.getProjetos);
router.post("/", projetoController.createProjeto);
router.get("/:projetoId", projetoController.getProjeto);
router.put("/:projetoId", projetoController.updateProjeto);
router.delete("/:projetoId", projetoController.deleteProjeto);
router.post("/:projetoId/tecnologias/:tecnologiaId", projetoController.addTecnologia);
router.delete("/:projetoId/tecnologias/:tecnologiaId", projetoController.removeTecnologia);

export default router;