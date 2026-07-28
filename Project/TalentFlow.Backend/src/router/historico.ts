import { Router } from "express";
import { HistoricoController } from "../Controllers/historicoController.ts";

const router = Router();

router.get(
    "/historico",
    HistoricoController.listar
);


export default router;