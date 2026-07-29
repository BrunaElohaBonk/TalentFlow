import { prisma } from "../lib/prisma.ts";

export class HistoricoService {
    static async listarHistorico() {
        const historicoPerfil = await prisma.perfilhistorico.findMany({
            include: {
                profile: {
                    include: {
                        aprendiz: {
                            include: {
                                user: true
                            }
                        }
                    }
                }
            },
            orderBy: {
                DataAlteracao: "desc"
            }
        });

        const historicoTurma = await prisma.turmahistorico.findMany({
            include: {
                turmas: true
            },
            orderBy: {
                dataAlteracao: "desc"
            }
        });

        const perfil = historicoPerfil.map(item => ({
            id: item.Id,
            tipo: "PERFIL",
            nome: item.profile?.aprendiz?.user?.name ?? "Aprendiz",
            texto: item.Acao,
            dataHora: item.DataAlteracao.toISOString(),
            alteradoPor: item.EDVAlteradoPor
        }));

        const turma = historicoTurma.map(item => ({
            id: item.Id,
            tipo: "TURMA",
            nome: item.turmas?.nomeTurma ?? "Turma sem identificação",
            texto: item.acao,
            dataHora: item.dataAlteracao.toISOString(),
            alteradoPor: item.EDVAlteradoPor
        }));

        return [
            ...perfil,
            ...turma
        ].sort(
            (a, b) =>
                new Date(b.dataHora).getTime() -
                new Date(a.dataHora).getTime()
        );
    }
}