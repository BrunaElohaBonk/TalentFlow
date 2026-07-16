import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { Request } from "express";


interface TokenPayload {

    EDV: number;

    tipoUser:
        | "APRENDIZ"
        | "INSTRUTOR";

    name: string;

}


export interface AuthRequest extends Request {

    user?: TokenPayload;

}



export function authMiddleware(
    req: AuthRequest,
    res: Response,
    next: NextFunction
) {


    const authHeader =
        req.headers.authorization;



    if (!authHeader) {

        return res.status(401).json({

            message:
                "Token não informado"

        });

    }



    const [, token] =
        authHeader.split(" ");




    if (!token) {

        return res.status(401).json({

            message:
                "Token inválido"

        });

    }





    try {


        const secret =
            process.env.SECRET;



        if (!secret) {

            return res.status(500).json({

                message:
                    "SECRET não configurado"

            });

        }





        const decoded =
            jwt.verify(
                token,
                secret
            ) as TokenPayload;





        req.user = decoded;




        next();



    } catch(error) {


        return res.status(401).json({

            message:
                "Token expirado ou inválido"

        });


    }


}