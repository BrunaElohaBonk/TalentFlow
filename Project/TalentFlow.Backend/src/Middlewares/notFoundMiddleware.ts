import { Request, Response } from "express";


export function notFoundMiddleware(
    req: Request,
    res: Response
) {

    return res.status(404).json({

        message:
            "Rota não encontrada"

    });

}