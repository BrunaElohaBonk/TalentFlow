import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";


export function validationMiddleware(
    schema: ZodSchema
) {

    return (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {


        const resultado =
            schema.safeParse(req.body);



        if(!resultado.success){


            return res.status(400).json({

                message:
                    "Erro de validação dos dados",

                errors:
                    resultado.error.issues.map(
                        erro => ({
                            campo: erro.path.join("."),
                            mensagem: erro.message
                        })
                    )

            });

        }



        req.body = resultado.data;


        next();

    };

}