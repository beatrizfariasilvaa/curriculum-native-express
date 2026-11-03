import { Router } from "express";
import { academicaController } from "../controllers/index.js";

const router = Router();

router.get("/", academicaController.getAcademicas);
router.post("/", academicaController.createAcademica);
router.get("/:academicaId", academicaController.getAcademica);
router.put("/:academicaId", academicaController.updateAcademica);
router.delete("/:academicaId", academicaController.deleteAcademica);

export default router;