import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { prisma } from "../lib/prisma.ts";
import { AdicionarUserDto, EsqueceuSenhaDto, LoginDto, RedefinirSenhaDto } from "../DTO/authDTO.ts";
import { Prisma } from "../generated/prisma/client.ts";

dotenv.config();

class AuthController {
    static async register(req: Request, res: Response): Promise<void> {
        const data: AdicionarUserDto = req.body;

        function converterDataBR(dataString: string): Date {
            const [dia, mes, ano] = dataString.split("/");
            return new Date(`${ano}-${mes}-${dia}`);
        }

        try {
            const passwordCrypt = await bcrypt.hash(data.password, 10);
            await prisma.user.create({
                data: {
                    EDV: data.EDV,
                    name: data.nome,
                    tipoUser: data.tipouser,
                    data_nascimento: converterDataBR(data.dataNascimento),
                    user_bosch: data.userBosch,
                    contato: data.contato,
                    email_bosch: data.emailBosch,
                    password_login: passwordCrypt,
                }
            });

            res.status(201).json({ message: "Usuário cadastrado com sucesso" });
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
                res.status(409).json({ message: "EDV ou e-mail já cadastrado" });
                return;
            }

            console.error(error);
            res.status(500).json({ message: "Erro interno ao cadastrar usuário" });
        }
    }

    static async login(req: Request, res: Response): Promise<void> {
        const data: LoginDto = req.body
        function formatarDataBR(data: Date): string {
            const dia = String(data.getDate()).padStart(2, "0");
            const mes = String(data.getMonth() + 1).padStart(2, "0");
            const ano = data.getFullYear();
            return `${dia}/${mes}/${ano}`;
        }

        const user = await prisma.user.findUnique({ where: { EDV: data.EDV } })
        if (!user) {
            res.status(404).send({ response: "Not Found!" });
            return;
        }
        const primeiroAcesso = formatarDataBR(user.data_nascimento)
        if (data.password === primeiroAcesso){
             res.status(200).json({
                primeiroAcesso: true,
                redirectTo: "/trocar-senha"});
              return;

        }
        const isPasswordValid = await bcrypt.compare(data.password, user.password_login);
        if (!isPasswordValid) {
            res.status(400).send({ response: "Email e/ou senha incorreta" });
            return;
        }

        const secret = process.env.SECRET

        if (!secret) {
            res.status(500).send({ response: "Erro de configuração do servidor" });
            return;
        }

        const token = jwt.sign(
            { EDV: user.EDV },
            secret,
            { expiresIn: "2 days" }
        );

        res.status(200).send({ token: token });
    }
    static async RedefinirSenha(req: Request, res: Response): Promise<void> {
        const data: RedefinirSenhaDto = req.body;
    
        if (!data.token || !data.password || !data.confirmPassword) {
            res.status(400).send({ response: "Campos obrigatórios ausentes" });
            return;
        }

        if (data.password !== data.confirmPassword) {
            res.status(400).send({ response: "Senhas não coincidem" });
            return;
        }
        const secret = process.env.SECRET;
        if (!secret) {
            res.status(500).send({ response: "Erro de configuração do servidor" });
            return;
        }

        try {
            const decoded = jwt.verify(data.token, secret) as unknown as { EDV: number };
            const user = await prisma.user.findUnique({ where: { EDV: decoded.EDV } });
            
            
            if (!user) {
                res.status(404).send({ response: "Not Found!" });
                return;
            }
            
            const passwordCrypt = await bcrypt.hash(data.password, 10);
            await prisma.user.update({
                where: { EDV: decoded.EDV },
                data: { password_login: passwordCrypt }
            });

            res.status(200).send({ response: "Senha redefinida com sucesso" });

        } catch (error) {
            res.status(400).send({ response: "Token inválido ou expirado" });
        }

    }
    static async EsqueceuSenha(req: Request, res: Response): Promise<void> {
        const data: EsqueceuSenhaDto = req.body;
        //implementar depois
        try{
            res.status(200).send({ response: "Senha redefinida com sucesso" });

        }
        catch(erro){
            res.status(400).send({ response: "Inválido token " });

        }
    }
    static async Logout(req:Request, res:Response): Promise<void>{
        res.status(200).send({ response: "Logout realizado com sucesso" });
    }
}

export default AuthController;