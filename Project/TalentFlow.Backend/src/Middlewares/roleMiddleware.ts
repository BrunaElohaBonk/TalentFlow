import { Response, NextFunction } from "express";
import { AuthRequest } from "./authMiddleware.ts";

type Role = "APRENDIZ" | "INSTRUTOR";
export function roleMiddleware(...roles: Role[]) {
  return (
    req: AuthRequest,

    res: Response,

    next: NextFunction
  ) => {
    if (!req.user) {
      return res.status(401).json({
        message: "Usuário não autenticado",
      });
    }

    if (!roles.includes(req.user.tipoUser)) {
      return res.status(403).json({
        message: "Usuário sem permissão",
      });
    }
    console.log("Role recebida:", req.user);
    console.log("Roles permitidas:", roles);
    next();
  };
}
