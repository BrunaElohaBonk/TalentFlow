import { Response, NextFunction } from "express";
import { AuthRequest } from "./authMiddleware.ts";



export function ownerMiddleware(

    req: AuthRequest,

    res: Response,

    next: NextFunction

) {



    if(!req.user){


        return res.status(401).json({

            message:
                "Usuário não autenticado"

        });


    }





    const EDV =
        Number(req.params.EDV);





    if(
        req.user.EDV !== EDV
    ){


        return res.status(403).json({

            message:
                "Você só pode alterar seus próprios dados"

        });


    }




    next();


}