declare namespace Express {

    export interface Request {

        user?: {

            EDV: number;

            tipoUser:
                | "APRENDIZ"
                | "INSTRUTOR";

            name: string;

        };

    }

}