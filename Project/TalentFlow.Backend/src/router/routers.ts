import { Express } from "express";
import express from "express";
import { notFoundMiddleware } from "../Middlewares/notFoundMiddleware.ts";

import aprendiz from "./aprendiz.ts";
import instrutor from "./instrutor.ts";
import turma from "./turma.ts";
import auth from "./auth.ts";

export default function routes(app: Express) {
  app.use(express.json());

  app.use("/api/auth", auth);

  app.use("/api/aprendiz", aprendiz);

  app.use("/api/instrutor", instrutor);

  app.use("/api/turma", turma);

  app.use(notFoundMiddleware);
}
