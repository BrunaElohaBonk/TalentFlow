import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { prisma } from "../lib/prisma.ts";
import { AdicionarUserDto, LoginDto} from "../DTO/authDTO.ts";

dotenv.config();

class AuthController {

    static async register(req: Request, res: Response): Promise<void> {
        const data:AdicionarUserDto = req.body;
        
        try {
            const passwordCrypt = await bcrypt.hash(data.password, 10);
           await prisma.user.create({
                data: {
                    EDV: data.EDV,
                    name: data.nome,
                    tipoUser:data.tipouser,
                    data_nascimento:data.dataNascimento,
                    user_bosch:data.userBosch,
                    contato:data.contato,
                    email_bosch: data.emailBosch,
                    password_login: passwordCrypt,
            }
            });

            res.status(201).json({ message: "Usuário cadastrado com sucesso" });
        } catch (error) {
            res.status(400).json({ message: "Something failed" });
        }
    }

    static async login(req: Request, res: Response): Promise<void> {
        const data:LoginDto = req.body

    const user = await prisma.user.findUnique({where:{EDV :data.EDV}})
    if(user){

        const decryptPassword = CryptoJS.AES.decrypt(user.password_login, process.env.SECRET as string)
        
        const passwordDecrypted = decryptPassword.toString(CryptoJS.enc.Utf8)
        
        if(password != passwordDecrypted){
            return res.status(400).send({ response: "Email e/ou senha incorreta"})
        }

        const secret = process.env.SECRET

        const token = jwt.sign(
            {
                id: user.id
            },
            secret as string,
            {
                expiresIn: "2 days"
            }
        )

        return res.status(200).send({ token: token })


    }
    else{
        return res.status(404).send({ response: "Not Found!"})
    }
}
    }
}

export default AuthController;