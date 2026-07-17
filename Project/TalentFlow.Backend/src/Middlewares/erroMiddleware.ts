import { Request, Response, NextFunction } from "express";

import AppError from "../Errors/AppError.ts";

import {
    UserJaExisteError,
    UserNotFoundError,
    InvalidCredentialsError,
    InvalidTokenError,
    PasswordMismatchError,
    ServerConfigError
} from "../Services/AuthService.ts";

import {
    TurmaNotFoundError
} from "../Services/TurmaService.ts";



export function errorMiddleware(
    error: unknown,
    req: Request,
    res: Response,
    next: NextFunction
) {


    console.error(error);



    // Erros personalizados da aplicação

    if(error instanceof AppError){

        return res.status(error.statusCode).json({

            success:false,

            message:error.message

        });

    }




    if(error instanceof UserJaExisteError){

        return res.status(409).json({

            success:false,

            message:error.message

        });

    }


    if(error instanceof UserNotFoundError){

        return res.status(404).json({

            success:false,

            message:error.message

        });

    }




    if(error instanceof InvalidCredentialsError){

        return res.status(401).json({

            success:false,

            message:error.message

        });

    }




    if(error instanceof InvalidTokenError){

        return res.status(401).json({

            success:false,

            message:error.message

        });

    }




    if(error instanceof PasswordMismatchError){

        return res.status(400).json({

            success:false,

            message:error.message

        });

    }




    if(error instanceof ServerConfigError){

        return res.status(500).json({

            success:false,

            message:error.message

        });

    }




    if(error instanceof TurmaNotFoundError){

        return res.status(404).json({

            success:false,

            message:error.message

        });

    }





    // Erros do Prisma

    if(
        typeof error === "object" &&
        error !== null &&
        "code" in error
    ){

        const prismaError = error as {
            code:string
        };



        if(prismaError.code === "P2002"){

            return res.status(409).json({

                success:false,

                message:
                    "Registro já cadastrado"

            });

        }



        if(prismaError.code === "P2025"){

            return res.status(404).json({

                success:false,

                message:
                    "Registro não encontrado"

            });

        }

    }





    // Erro desconhecido

    return res.status(500).json({

        success:false,

        message:
            error instanceof Error
                ? error.message
                : "Erro interno do servidor"

    });


}