import Header from "../../../components/header";
import Sidebar from "../../../components/sidebar";
import Filtro from "../../../components/filter";
import filter from '../../../assets/img/filter.png'
import "./dashboard.css";
import { useEffect, useState } from "react";
import { GraficoSetor, GraficoEstagio, GraficoSuperior, GraficoCompetencias, GraficoIdiomas } from "./graficos";
import api from "../../../services/api";

function Dashboard() {
    const [filtro, setFiltro] = useState(false);
    const [dadosDashboard, setDadosDashboard] = useState<any>(null);
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
            <Filtro visible={filtro} setVisible={setFiltro} filtros={filtros} setFiltros={setFiltros}/>   
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