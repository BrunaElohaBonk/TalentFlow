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

        const perfil = await Promise.all(
            historicoPerfil.map(async (item) => {
                console.log("EDVAlteradoPor:", item.EDVAlteradoPor);
                const usuario = item.EDVAlteradoPor
                    ? await prisma.user.findUnique({
                        where: {
                            EDV: item.EDVAlteradoPor
                        },
                        select: {
                            name: true
                        }
                    })
                    : null;

                // pega nome pelo relacionamento
                let nome = item.profile?.aprendiz?.user?.name;


                // se não existir, pega do JSON Dados
                if (!nome) {
                    const dados = item.Dados as any;

                    nome = dados?.user?.name;
                }   
                console.log("Usuário encontrado:", usuario);

                return {
                    id: item.Id,
                    tipo: "PERFIL",
                    nome: nome ?? "Usuário não encontrado",
                    texto: item.Acao,
                    dataHora: item.DataAlteracao.toISOString(),
                    alteradoPor: usuario?.name ?? "Sistema"
                };
            })
        );

        const turma = await Promise.all(
            historicoTurma.map(async (item) => {
                
                const usuario = item.EDVAlteradoPor
                    ? await prisma.user.findUnique({
                        
                        where: {
                            EDV: item.EDVAlteradoPor
                        },
                        select: {
                            name: true
                        }
                    })
                    : null;
                    
                
                return {
                    id: item.Id,
                    tipo: "TURMA",
                    nome: item.turmas?.nomeTurma ?? "Turma sem identificação",
                    texto: item.acao,
                    dataHora: item.dataAlteracao.toISOString(),
                    alteradoPor: usuario?.name ?? "Sistema"
                };
            })
        );

        return [...perfil, ...turma].sort(
            (a, b) =>
                new Date(b.dataHora).getTime() -
                new Date(a.dataHora).getTime()
        );
    }
}
