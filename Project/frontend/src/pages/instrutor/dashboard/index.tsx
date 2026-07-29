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
}

interface IAprendiz {
    EDV: number;
    name: string;
    email_bosch: string;
    user_bosch: string;
    contato: string;
    data_nascimento: Date;
    fotoPerfil: string | null;
    tipoUser: "APRENDIZ";

    data: {
        id: number;
        EDV_Aprendiz: number;

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
    };
}

function Dashboard() {
    const [filtro, setFiltro] = useState(false);
    const [dadosDashboard, setDadosDashboard] = useState<any>(null);
    const [aprendiz, setAprendiz] = useState<IAprendiz[]>([]);
    const [turma, setTurma] = useState<ITurma[]>([]);
    const [filtros, setFiltros] = useState({
        turmas: [] as string[],
        idadeMin: "",
        idadeMax: "",
        setores: [] as string[],
        idiomas: [] as string[],
        estagio: null as boolean | null,
        formacoes: [] as string[]
    });
    const fetchDashboard = async () => {
    try {
        const response = await api.get("/aprendiz/dashboard");
        setDadosDashboard(response.data);
    } catch (error) {
        console.error("Erro ao buscar dashboard:", error);
    }
    };
    useEffect(() => {
        fetchDashboard();
    }, []);
    if (!dadosDashboard) {
        return <div>Carregando dashboard...</div>;
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
                    <div className="dashboard-graficos">
                        {(
                            <>
                                <div className="dashboard-card">
                                    <h3 className="grafico-titulo">Distribuição por Setor</h3>
                                    <GraficoSetor dados={dadosDashboard.setores}/>
                                </div>

                                <div className="dashboard-card">
                                    <h3 className="grafico-titulo">Percentual em Estágio</h3>
                                    <GraficoEstagio dados={dadosDashboard.estagio}/>
                                </div>

                                <div className="dashboard-card">
                                    <h3 className="grafico-titulo">Aprendizes Cursando Ensino Superior</h3>
                                    <GraficoSuperior dados={dadosDashboard.formacao}/>
                                </div>

                                <div className="dashboard-card">
                                    <h3 className="grafico-titulo">Competências</h3>
                                    <GraficoCompetencias dados={dadosDashboard.competencias}/>
                                </div>

                                <div className="dashboard-card">
                                    <h3 className="grafico-titulo">Idiomas</h3>
                                    <GraficoIdiomas dados={dadosDashboard.idiomas}/>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;