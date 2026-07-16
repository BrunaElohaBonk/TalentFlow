import { useState } from "react";
import Header from "../../../components/header"
import Sidebar from "../../../components/sidebar"
import './verAprendiz.css'
import user from '../../../assets/img/icon_user.png'
import lupa from '../../../assets/img/pesquisar.png'
import { aprendizes } from "./aprendizes";
import { useNavigate } from "react-router-dom";

function VerAprendiz(){
    const [busca, setBusca] = useState("");
    const navigate = useNavigate()
    const filtro = aprendizes
        .filter((item) => {
            const termo = busca.toLowerCase().trim();
            if (termo === "") return true;
            return (
                item.perfil.nome.toLowerCase().includes(termo) ||
                item.perfil.email.toLowerCase().includes(termo) ||
                item.perfil.user.toLowerCase().includes(termo) ||
                item.perfil.turma.toLowerCase().includes(termo) ||
                item.perfil.edv.toString().includes(termo) ||
                item.perfil.contato.toString().includes(termo) ||
                item.perfil.nascimento.toLocaleDateString("pt-BR").includes(termo) ||
                item.situacaoProfissional.nomeSetor.toLowerCase().includes(termo) ||
                item.situacaoProfissional.nomeLider.toLowerCase().includes(termo) ||
                item.situacaoProfissional.descricaoEstagio.toLowerCase().includes(termo) ||
                (item.situacaoProfissional.cumprindoEstagio ? "sim" : "não").includes(termo) ||
                item.formacaoAcademica.some((curso) =>
                    curso.nomeCurso.toLowerCase().includes(termo) ||
                    curso.instituicao.toLowerCase().includes(termo) ||
                    curso.nivelFormacao.toLowerCase().includes(termo) ||
                    curso.descricaoCurso.toLowerCase().includes(termo) ||
                    curso.periodoAtual.toString().includes(termo) ||
                    curso.totalPeriodos.toString().includes(termo) ||
                    (curso.status ? "cursando" : "concluído").includes(termo)
                ) ||
                item.cursosComplementares.some((curso) =>
                    curso.nomeCurso.toLowerCase().includes(termo) ||
                    curso.descricaoCurso.toLowerCase().includes(termo) ||
                    curso.cargaHoraria.toString().includes(termo) ||
                    curso.dataConclusao.toLocaleDateString("pt-BR").includes(termo) ||
                    (curso.status ? "concluído" : "cursando").includes(termo)
                ) ||
                item.idiomas.some((idioma) =>
                    idioma.idioma.toLowerCase().includes(termo) ||
                    idioma.nivel.toLowerCase().includes(termo)
                ) ||
                item.softskills.some((softskill) =>
                    softskill.nome.toLowerCase().includes(termo)
                ) ||
                item.competencias.some((competencia) =>
                    competencia.nome.toLowerCase().includes(termo) ||
                    competencia.nivel.toLowerCase().includes(termo)
                )
            );
        })
        .sort((a, b) =>
            a.perfil.nome.localeCompare(b.perfil.nome, "pt-BR"));
        
    // const fetchInstrutor = async () => {
    //     try {
    //         const response = await axios.get("link backend");
    //         console.log("API RESPONSE:", response.data);
    //         setInstrutor(response.data.response);
    //     } 
    //     catch (error) {
    //         console.error("Erro:", error);
    //         setInstrutor(null);
    //     }
    // };
    
    return(
        <div>
            <Header></Header>
            <div className="aprendiz-container">
                <Sidebar/>
                <div className="aprendiz-body">
                    <div className="aprendiz-pesquisa">
                        <input type="text" className="aprendiz-input" placeholder="Pesquisar..." value={busca} onChange={(e) => setBusca(e.target.value)}/>
                        <button type="button" className="aprendiz-button-pesquisar"><img src={lupa} alt="lupa" className="img-lupa"/></button>
                    </div>
                    <div className="aprendiz-card-area">
                        {filtro.length > 0 ? (
                            filtro.map((aprendizes) => (
                                <div className="aprendiz-modal" key={aprendizes.perfil.edv}>
                                    <div className="aprendiz-header">
                                        <img src={user} alt="user" className="aprendiz-img"/>
                                        <span className="aprendiz-titulo">{aprendizes.perfil.nome}</span>
                                    </div>
                                    <div className="aprendiz-conteudo">
                                        <span className="aprendiz-span">{aprendizes.perfil.turma}</span>
                                        <button onClick={() => navigate('/PerfilAprendiz')} className="aprendiz-button">Ver Dados do Aprendiz</button>
                                    </div>
                                </div>
                            ))
                        ) : (<p className="aprendiz-titulo">Nenhum aprendiz encontrado.</p>)}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default VerAprendiz