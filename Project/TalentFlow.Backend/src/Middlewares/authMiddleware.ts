import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { Request } from "express";
import { z } from "zod";

const tokenSchema = z.object({
  EDV: z.number(),

  tipoUser: z.enum(["APRENDIZ", "INSTRUTOR"]),

  name: z.string(),
});

type TokenPayload = z.infer<typeof tokenSchema>;

export interface AuthRequest extends Request {
  user?: TokenPayload;
}

export function authMiddleware(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      message: "Token não informado",
    });
  }

  const [, token] = authHeader.split(" ");

  if (!token) {
    return res.status(401).json({
      message: "Token inválido",
    });
  }

  try {
    const secret = process.env.SECRET;

    if (!secret) {
      return res.status(500).json({
        message: "SECRET não configurado",
      });
    }

    const decoded = jwt.verify(token, secret);

    const usuario = tokenSchema.safeParse(decoded);

    if (!usuario.success) {
      return res.status(401).json({
        message: "Token com dados inválidos",
      });
    }
    req.user = usuario.data;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Token expirado ou inválido",
    });
  }
}
