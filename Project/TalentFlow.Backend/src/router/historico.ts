import { Router } from "express";
import { HistoricoController } from "../Controllers/historicoController.ts";

const router = Router();

router.get(
    "/verHistorico",
    HistoricoController.listar
);

export default router;