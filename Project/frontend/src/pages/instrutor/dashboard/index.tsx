import Header from "../../../components/header";
import Sidebar from "../../../components/sidebar";
import Filtro from "../../../components/filter";
import filter from '../../../assets/img/filter.png'
import "./dashboard.css";
import { useState } from "react";
import { aprendizes } from "../verAprendiz/aprendizes";
import { GraficoSetor, GraficoEstagio, GraficoSuperior, GraficoCompetencias, GraficoIdiomas } from "./graficos";

function Dashboard() {
    const [busca] = useState("");
    const [filtro, setFiltro] = useState(false)
    const Idade = (dataNascimento: Date) => {
        const hoje = new Date();
        let idade = hoje.getFullYear() - dataNascimento.getFullYear();
        const mes = hoje.getMonth() - dataNascimento.getMonth();
        if (mes < 0 || (mes === 0 && hoje.getDate() < dataNascimento.getDate())) {
            idade--;
        }
        return idade;
    };
    const [filtros, setFiltros] = useState({
        turmas: [] as string[],
        idadeMin: "",
        idadeMax: "",
        setores: [] as string[],
        idiomas: [] as string[],
        estagio: null as boolean | null,
        formacoes: [] as string[]
    });
    const normalizar = (texto: string) =>
    texto
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();
    const pesquisar = aprendizes
        .filter((item) => {
        if (filtros.setores.length > 0) {
            const setorAprendiz = item.situacaoProfissional.nomeSetor;
            const possuiSetor = filtros.setores.includes(setorAprendiz);
            if (!possuiSetor) {
                return false;
            }
        }
        if (filtros.turmas.length > 0) {
            if (!filtros.turmas.includes(item.perfil.turma)) {
                return false;
            }
        }
        if (filtros.idadeMin !== "" || filtros.idadeMax !== "") {
            const idade = Idade(item.perfil.nascimento);
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
            const idiomasAprendiz = item.idiomas.map(
                i => i.idioma
            );
            const possuiIdioma = filtros.idiomas.some(idioma => idiomasAprendiz.includes(idioma));
            if (!possuiIdioma) {
                return false;
            }
        }
        if (filtros.formacoes.length > 0) {
            const formacoesAprendiz = item.formacaoAcademica.map(f => f.nomeCurso);
            const possuiFormacao = filtros.formacoes.some(formacao => formacoesAprendiz.includes(formacao));
            if (!possuiFormacao) {
                return false;
            }
        }
        if (filtros.estagio !== null) {
            const estaEmEstagio = item.situacaoProfissional.cumprindoEstagio; 
            if (estaEmEstagio !== filtros.estagio) {
                return false;
            }
        }
        return true;
    })
    .filter((item) => {
        const termo = normalizar(busca.trim());
        if (termo === "") return true;
        return (
            normalizar(item.perfil.nome).includes(termo) ||
            normalizar(item.perfil.email).includes(termo) ||
            normalizar(item.perfil.user).includes(termo) ||
            normalizar(item.perfil.turma).includes(termo) ||
            item.perfil.edv.toString().includes(termo) ||
            item.perfil.contato.toString().includes(termo) ||
            item.perfil.nascimento.toLocaleDateString("pt-BR").includes(termo)
        );
    })
    .sort((a, b) =>
        a.perfil.nome.localeCompare(b.perfil.nome, "pt-BR")
    );

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
                        {pesquisar.length === 0 ? (
                            <div className="dashboard-aviso">Nenhum resultado encontrado</div>
                        ) : (
                            <>
                                <div className="dashboard-card">
                                    <h3 className="grafico-titulo">Distribuição por Setor</h3>
                                    <GraficoSetor aprendizes={pesquisar}/>
                                </div>

                                <div className="dashboard-card">
                                    <h3 className="grafico-titulo">Percentual em Estágio</h3>
                                    <GraficoEstagio aprendizes={pesquisar}/>
                                </div>

                                <div className="dashboard-card">
                                    <h3 className="grafico-titulo">Aprendizes Cursando Ensino Superior</h3>
                                    <GraficoSuperior aprendizes={pesquisar}/>
                                </div>

                                <div className="dashboard-card">
                                    <h3 className="grafico-titulo">Competências</h3>
                                    <GraficoCompetencias aprendizes={pesquisar}/>
                                </div>

                                <div className="dashboard-card">
                                    <h3 className="grafico-titulo">Idiomas</h3>
                                    <GraficoIdiomas aprendizes={pesquisar}/>
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