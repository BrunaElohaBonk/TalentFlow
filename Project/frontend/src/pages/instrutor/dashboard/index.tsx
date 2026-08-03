import Header from "../../../components/header";
import Sidebar from "../../../components/sidebar";
import Filtro from "../../../components/filter";
import filter from '../../../assets/img/filter.png'
import "./dashboard.css";
import { useEffect, useState } from "react";
import { GraficoSetor, GraficoEstagio, GraficoSuperior, GraficoCompetencias, GraficoIdiomas } from "./graficos";
import api from "../../../services/api";

interface ITurma {
    id: number;
    nomeTurma: string;
    name_Curso: string;
    EDV_Instrutor: number;
    nomeInstrutor: string;
    Ativo: boolean;
}

interface IAprendiz {
    EDV: number;
    name: string;
    email_bosch: string;
    user_bosch: string;
    contato: string;
    data_nascimento: string;
    fotoPerfil: string | null;
    tipoUser: "APRENDIZ";
    Ativo: boolean;
    idTurma: number;

    data: {
        situacao_profissional: {
            nome_Setor: string;
            nome_Lider: string;
            cumprido_Estagio: boolean;
            bio_profissional: string;
        }[];

        formacao_academica: {
            id: number;
            name_Curso: string;
            nome_Institucao: string;
            status_Academico: "CONCLUIDO" | "CURSANDO";
            periodo_Atual: number;
            total_Periodo: number;
            nivel_formacao: string;
        }[];

        cursos_complementares: {
            id: number;
            name_Curso: string;
            status_Cursos: "CONCLUIDO" | "CURSANDO";
            data_Conclusao: string;
            carga_horaria: number;
        }[];

        idiomas: {
            id: number;
            nome_Idioma: string;
            nivel_Idioma: string;
        }[];
        soft_skills: {
        id: number;
        nome_SoftSkills: string;
        }[];

        competencia: {
            id: number;
            nome_Competencia: string;
            nivel_Competencia: string;
        }[];
    };
}

function Dashboard() {
    const [filtro, setFiltro] = useState(false);
    const [dadosDashboard, setDadosDashboard] = useState<any>(null);
    const [aprendiz, setAprendiz] = useState<IAprendiz[]>([]);
    const [turma, setTurma] = useState<ITurma[]>([]);
    const [filtros, setFiltros] = useState({
        turmas: [] as number[],
        idadeMin: "",
        idadeMax: "",
        setores: [] as string[],
        idiomas: [] as string[],
        estagio: null as boolean | null,
        formacoes: [] as string[]
    });
    useEffect(() => {
    console.log("Filtros atualizados:", filtros);
}, [filtros]);
    const Idade = (dataNascimento: string) => {
        const nascimento = new Date(dataNascimento);
        const hoje = new Date();
        let idade = hoje.getFullYear() - nascimento.getFullYear();
        const mes = hoje.getMonth() - nascimento.getMonth();
        if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())
        ) {
            idade--;
        }
        return idade;
    };
    const aprendizesFiltrados = aprendiz
        .filter((item) => {
        if (filtros.turmas.length > 0) {
            const turmaDoAprendiz = item.idTurma;
            if (!filtros.turmas.includes(turmaDoAprendiz)) {
                return false;
            }
        }
        if (filtros.setores.length > 0) {
            const setorAprendiz = item.data.situacao_profissional[0]?.nome_Setor;
            const possuiSetor = filtros.setores.includes(setorAprendiz);
            if (!possuiSetor) {
                return false;
            }
        }
        if (filtros.idadeMin !== "" || filtros.idadeMax !== "") {
            const idade = Idade(item.data_nascimento);
            const idadeMin = filtros.idadeMin !== "" ? Number(filtros.idadeMin) : null;
            const idadeMax = filtros.idadeMax !== "" ? Number(filtros.idadeMax) : null;
            if (idadeMin !== null && idadeMax === null) {
                if (idade !== idadeMin) {
                    return false;
                }
            }
            if (idadeMin === null && idadeMax !== null) {
                if (idade > idadeMax) {
                    return false;
                }
            }
            if (idadeMin !== null && idadeMax !== null) {
                if (idadeMin === idadeMax) {
                    if (idade !== idadeMin) {
                        return false;
                    }
                } 
                else {
                    if (idade < idadeMin || idade > idadeMax) {
                        return false;
                    }
                }
            }
        }
        if (filtros.idiomas.length > 0) {
            const idiomasAprendiz = item.data.idiomas.map(
                i => i.nome_Idioma
            );
            const possuiIdioma = filtros.idiomas.some(idioma => idiomasAprendiz.includes(idioma));
            if (!possuiIdioma) {
                return false;
            }
        }
        if (filtros.formacoes.length > 0) {
            const formacoesAprendiz = item.data.formacao_academica.map(f => f.name_Curso);
            const possuiFormacao = filtros.formacoes.some(formacao => formacoesAprendiz.includes(formacao));
            if (!possuiFormacao) {
                return false;
            }
        }
        if (filtros.estagio !== null) {
            const estaEmEstagio = item.data.situacao_profissional[0]?.cumprido_Estagio; 
            if (estaEmEstagio !== filtros.estagio) {
                return false;
            }
        }
        return true;
    })
    const fetchDashboard = async () => {
        try {
            const response = await api.get("/aprendiz/dashboard");
            console.log('Dashboard ',response.data);
            setDadosDashboard(response.data);
        } 
        catch (error) {
            console.error("Erro ao buscar dashboard:", error);
        }
    };
    const fetchTurmas = async () => {
        try {
            const response = await api.get("/turma/visualizarTurmas");
            console.log("TURMAS:", response.data);
            setTurma(response.data.filter((turma: ITurma) => turma.Ativo));
        } catch(error) {
            console.error("Erro ao buscar turmas:", error);
        }
    };
    
    const quantidadeEstagio = aprendizesFiltrados.filter(
        a => a.data.situacao_profissional[0]?.cumprido_Estagio
    ).length;

    const quantidadeSuperior = aprendizesFiltrados.filter(a =>
        a.data.formacao_academica.some(f =>
            f.nivel_formacao === "GRADUACAO"
        )
    ).length;

    const dashboardFiltrado = {
        setores: Object.values(
            aprendizesFiltrados.reduce((acc: any, item) => {
                const setor = item.data.situacao_profissional[0]?.nome_Setor?.trim();
                if (!setor || setor === "NAO_INFORMADO" || setor === "NÃO_INFORMADO" || setor === "Não informado") {
                    return acc;
                }
                if (!acc[setor]) {
                    acc[setor] = {
                        setor,
                        quantidade: 0
                    };
                }
                acc[setor].quantidade++;
                return acc;
            }, {})
        ),
        
        estagio: {
            quantidade: quantidadeEstagio,
            naoEstagiando: aprendizesFiltrados.length - quantidadeEstagio
        },
        
        competencias: Object.values(
            aprendizesFiltrados.reduce((acc: any, item) => {
                item.data.competencia?.forEach(comp => {
                    const competencia = comp.nome_Competencia?.trim();
                    if (!competencia || competencia === "NAO_INFORMADO" || competencia === "NÃO_INFORMADO" || competencia === "Não informado") {
                        return;
                    }
                    if (!acc[competencia]) {
                        acc[competencia] = {
                            competencia,
                            quantidade: 0
                        };
                    }
                    acc[competencia].quantidade++;
                });
                return acc;
            }, {})
        ),
        idiomas: Object.values(
            aprendizesFiltrados.reduce((acc: any, item) => {
                item.data.idiomas?.forEach(idioma => {
                    const nomeIdioma = idioma.nome_Idioma?.trim();
                    if (!nomeIdioma || nomeIdioma === "NAO_INFORMADO" || nomeIdioma === "NÃO_INFORMADO" || nomeIdioma === "Não informado") {
                        return;
                    }
                    if (!acc[nomeIdioma]) {
                        acc[nomeIdioma] = {
                            idioma: nomeIdioma,
                            quantidade: 0
                        };
                    }
                    acc[nomeIdioma].quantidade++;
                });
                return acc;
            }, {})
        ),
        formacao: {
            cursoSuperior: quantidadeSuperior, 
            naocursoSuperior: aprendizesFiltrados.length - quantidadeSuperior
        }
    };

    console.log("Setores filtrados:", dashboardFiltrado.setores);
    const fetchAprendizes = async () => {
        try {
            const response = await api.get("/auth/buscaruser/APRENDIZ");
            const usuarios = response.data.filter((usuario: IAprendiz) => usuario.tipoUser === "APRENDIZ" && usuario.Ativo === true );
            const aprendizesComPerfil = await Promise.all(
                usuarios.map(async (usuario: IAprendiz) => {
                    const perfilResponse = await api.get(`/aprendiz/perfil/${usuario.EDV}`);
                    const turmaResponse = await api.get(`/aprendiz/aprendiz/${usuario.EDV}`);
                    return {
                        ...usuario,
                        idTurma: turmaResponse.data.data.Id_Turma,
                        data: perfilResponse.data.data
                    };
                })
            );
            setAprendiz(aprendizesComPerfil);
        } 
        catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchDashboard();
        fetchTurmas();
        fetchAprendizes();
    }, []);

    if (!dadosDashboard) {
        return (
            <div className="dashboard">
                <Header />
                <Filtro visible={filtro} setVisible={setFiltro} filtros={filtros} setFiltros={setFiltros} aprendizes={aprendiz} turmas={turma}/>
                <div>Carregando dashboard...</div>
            </div>
        );
    }
    return (
        <div className="dashboard">
            <Header />
            <Filtro visible={filtro} setVisible={setFiltro} filtros={filtros} setFiltros={setFiltros} aprendizes={aprendiz} turmas={turma}/>   
            <div className="dashboard-content">
                <Sidebar />
                
                <div className="dashboard-body">
                    <div className="dashboard-pesquisa">
                        <button type="button" className="dashboard-button-filtro"><img src={filter} alt="filtro" className="img-filter" onClick={() => setFiltro(true)}/></button>
                    </div>
                        {aprendizesFiltrados.length === 0 ? (
                            <p className="dashboard-aviso">Nenhum aprendiz encontrado</p>
                        ):(
                            <div className="dashboard-graficos">
                            {(
                                <>
                                    <div className="dashboard-card">
                                        <h3 className="grafico-titulo">Distribuição por Setor</h3>
                                        <GraficoSetor dados={dashboardFiltrado.setores}/>
                                    </div>

                                    <div className="dashboard-card">
                                        <h3 className="grafico-titulo">Percentual em Estágio</h3>
                                        <GraficoEstagio dados={dashboardFiltrado.estagio}/>
                                    </div>

                                    <div className="dashboard-card">
                                        <h3 className="grafico-titulo">Aprendizes Cursando Ensino Superior</h3>
                                        <GraficoSuperior dados={dashboardFiltrado.formacao}/>
                                    </div>

                                    <div className="dashboard-card">
                                        <h3 className="grafico-titulo">Competências</h3>
                                        <GraficoCompetencias dados={dashboardFiltrado.competencias}/>
                                    </div>

                                    <div className="dashboard-card">
                                        <h3 className="grafico-titulo">Idiomas</h3>
                                        <GraficoIdiomas dados={dashboardFiltrado.idiomas}/>
                                    </div>
                                </>
                        )}
                    </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;